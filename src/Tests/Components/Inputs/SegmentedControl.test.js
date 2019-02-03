import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount, render} from 'enzyme';
//import sinon from 'sinon';
import { Form } from 'formsy-react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import App from '../../../Containers/App.jsx';
import i18n from '../../../i18n.en.json';
import SegmentedControl from '../../../Components/Inputs/SegmentedControl';
//import Modal, { ModalHeader } from '../../../Components/Modal'
//import TextInput from '../../../Components/Inputs/TextInput.jsx';
import PortalAuthActions from '../../../Actions/PortalAuthActions';
jest.mock('../../../Actions/PortalAuthActions');  

describe('<SocialSecurityInput />', () => {
it.skip('Renders a SegmentedControl ', () => {
	 const component = renderer.create(
    <IntlProvider locale="en" messages={i18n} ><Formsy.Form><SegmentedControl name="test"/></Formsy.Form></IntlProvider>
  );

   let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});
//handleClick
 it('calling handleClick ', () => {
          let props = {
             location: { pathname: 'account-home', query: {pendingAppId: 999999}},
             intl: {
                 messageIfExists : jest.fn()
             },
             hasOverflowName: true,
             locale: "es",
             useOptionId: true,

             multiSelect:true,             
             value:'string',
             options:{a:'he',b:'dd', key:1}
             //onChange:mockImplementation(function (){return true;})
        }
        Object.defineProperty(window, "matchMedia", {
            value: jest.fn(() => { return { matches: true } })
        });
        
        const el={getAttribute :jest.fn()}
        const mockedEvent = { target: {} ,preventDefault:()=>{}}; 
        const wrapper = mount(<IntlProvider locale="en" messages={i18n} >
        <App {...props}><Formsy.Form>
          <SegmentedControl {...props}
          name='data-value' 
          multiSelect='true' 
          options={props.options}
          id='abc111' handleClick={el}/></Formsy.Form></App></IntlProvider>);
        //const wrapper = shallow(<SocialSecurityInput />);   
        wrapper.find('#abc111-0').simulate('click', { el },mockedEvent );

        expect(wrapper.find('#abc111-0')).toHaveLength(1);
});  


it('calling handleClick1 ', () => {

    const el={getAttribute :jest.fn()}
        const mockedEvent = { target: {} ,preventDefault:()=>{}}; 
        const wrapper1 = mount(
    <IntlProvider locale="en" messages={i18n} ><App {...props}>
    <Formsy.Form><SegmentedControl 
    name='data-value' 
    options="spa"   
    id='abc111' handleClick={el}/>
    </Formsy.Form></App></IntlProvider>);
        //const wrapper = shallow(<SocialSecurityInput />);   
        wrapper1.find('#abc111-0').simulate('click', { el },mockedEvent );

        expect(wrapper1.find('#abc111-0')).toHaveLength(1);
});  


});