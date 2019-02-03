import React from 'react';
import ConditionalField from '../../Components/ConditionalField';
import { IntlProvider } from 'react-intl';
import i18n from '../../i18n.en.json';
import renderer from 'react-test-renderer';
import App from '../../Containers/App.jsx';
import {mount, shallow} from 'enzyme';
import sinon from 'sinon';
import PropTypes from 'prop-types';
import PortalAuthActions from '../../Actions/PortalAuthActions';
jest.mock('../../Actions/PortalAuthActions');
import AppDispatcher from '../../Dispatchers/AppDispatcher';
jest.mock('../../Actions/EndpointActionUtils');

let props, output, tree;

describe('OptIn', () => {
	beforeEach(() => {
	props = {
		location: { pathname: 'Opt-in', query: {pendingAppId: 999999}},
		intl: {
			messageIfExists : jest.fn()
		},
		condition:11,
		personId:123,
		hiddenFields:[{
			fieldname:11
		}],
		dynamicQuestions :{
			persons:[{
				personId:123,
				hiddenFields:[0]
			}]
		},
		dynamicQuestionId:0
	} 
	Object.defineProperty(window, "matchMedia", {
		value: jest.fn(() => { return { matches: true } })
	});
	
let person = {
	personId:123
};
const dynamicQuestionsForPerson = {
	persons:{
			find:jest.fn(() => { return { matches: true } })
	},
	outputglobalresname:['CP1'],
	outputglobalresvalue:['1']
};
	
	output = renderer.create(<IntlProvider locale="en" messages={i18n} >
                                      <App {...props}>
                                        <Formsy.Form>
                                          <ConditionalField dynamicQuestionsForPerson={dynamicQuestionsForPerson}
																					person={person}
																					dynamicQuestions={props.dynamicQuestions}/>
                                        </Formsy.Form>
                                      </App>
                                    </IntlProvider>);
	tree = output.toJSON();
});	

	it('Testing conditional field', () => {
		expect(tree).toMatchSnapshot();
	});
	it('Testing findOnePerson function', () => {
		const dynamicQuestionsForPerson = {
			persons:{
					find:jest.fn(() => { return { matches: true } })
			},
			outputglobalresname:['CP1'],
			outputglobalresvalue:['1']
	}
	let person = {
		personId:123,
		hiddenFields:[{
			fieldname:11
		}]
	};
	let fieldname = 11;
		let wrapper = mount(<IntlProvider locale="en" messages={i18n} >
																		<App {...props}>
																			<Formsy.Form>
																				<ConditionalField dynamicQuestionsForPerson={dynamicQuestionsForPerson}
																				condition={props.condition}
																				personId={props.personId}
																				dynamicQuestions={props.dynamicQuestions}
																				person={props.personId}
																				dynamicQuestionId={props.dynamicQuestionId}
																				hiddenFields={props.hiddenFields[fieldname]}/>
																			</Formsy.Form>
																		</App>
																	</IntlProvider>);
						
							});
});


