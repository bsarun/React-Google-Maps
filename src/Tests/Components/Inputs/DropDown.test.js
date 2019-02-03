import React from 'react';
import ReactDOM from 'react-dom';
import {wrapper,shallow, mount, render} from 'enzyme';
import sinon from 'sinon';
import { Form } from 'formsy-react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import i18n from '../../../i18n.en.json';
import App from '../../../Containers/App.jsx';
import DropDown from '../../../Components/Inputs/DropDown';
import PropTypes from 'prop-types';
let props,dispatch,householdMembersObj,applicationDetails, wrapperNode;

describe('OptIn', () => {
	
	props = {
		location: { pathname: 'Opt-in', query: {pendingAppId: 999999}},
		intl: {
			messageIfExists : jest.fn()
		},
		formData:{
			subsidizedApplication:'xyz',
			pendingAppId:111
		}
	} 
	Object.defineProperty(window, "matchMedia", {
		value: jest.fn(() => { return { matches: true } })
	});

	householdMembersObj = [
		{                
			person: {
				firstName:"test",
				personId:"",
				avatar : [],
				lastName:"test"
			}
		}
	]	
	
	applicationDetails = {
		zipCode:12345
	}
	
	let wrapper = mount(<IntlProvider locale="en" messages={i18n} >
			<App {...props}>
				<Formsy.Form>
					<DropDown name = 'test'  formData={props.formData} householdMembers={householdMembersObj} applicationDetails={applicationDetails}/>
						</Formsy.Form>
				</App>
		</IntlProvider>,
		{
			context: {
			router: {
				listen: ()=>{},
				createHref: ()=>{},
				isActive: ()=>{},
				push: ()=>{}
			}
			},
			childContextTypes: {
			router: PropTypes.object.isRequired,
			}
		});
		wrapperNode = wrapper.find('DropDown').getNode();	
		dispatch = (actionType, payload) => {
			AppDispatcher.dispatch({
					action: {
							type:    actionType,
							payload: payload
					}
			});
		};

	it('Testing OptIn', () => {	
		const output = renderer.create(<IntlProvider locale="en" messages={i18n} ><App {...props}><Formsy.Form><DropDown name = 'test'  householdMembers={householdMembersObj} applicationDetails={applicationDetails}/></Formsy.Form></App></IntlProvider>);
		let tree = output.toJSON();
		expect(tree).toMatchSnapshot();
		//output.unmount();
	});
	it('Testing onFormChange', () => {
        wrapperNode.handleInputBlur();
       // wrapperNode.handleSelectChange();
		//wrapperNode.onFormInValid();
		//wrapperNode.handleSubmitForm();
    });
    it('Testing onFormChange', () => {
        //wrapperNode.handleInputBlur();
        wrapperNode.handleSelectChange(21);
		//wrapperNode.onFormInValid();
		//wrapperNode.handleSubmitForm();
    });
    it('Testing onFormChange', () => {
        //wrapperNode.handleInputBlur();
        wrapperNode.handleInputChange();
		//wrapperNode.onFormInValid();
		//wrapperNode.handleSubmitForm();
    });
    
});
