import React from 'react';
import Header from '../../Components/Header';
import { IntlProvider } from 'react-intl';
import i18n from '../../i18n.en.json';
import renderer from 'react-test-renderer';
import {shallow, mount, render} from 'enzyme';
import LayoutActions from '../../Actions/LayoutActions';

describe('(Component) Header', () => {
	it('testing Header ', () => {
		var output = renderer.create(<IntlProvider locale="en" messages={i18n} ><Formsy.Form><Header localeMenuIsOpen={true} fabIsOpen={true} showSaveAndExit={true} showLogOutUser={true} className="test"/></Formsy.Form></IntlProvider>);
		let tree = output.toJSON();
		expect(tree).toMatchSnapshot();	
	});
	it('calls "handleSaveClick()" on button click - using prototype', () => {
		const mockedEvent = { target: {} ,preventDefault:()=>{}}; 
		const wrapper = mount(<IntlProvider locale="en" messages={i18n} ><Formsy.Form><Header localeMenuIsOpen={true} fabIsOpen={true} showSaveAndExit={true} showLogOutUser={false} className="test"/></Formsy.Form></IntlProvider>);
		wrapper.find('#save-exit-btn').simulate('click', mockedEvent );
		//expect(wrapper.find('HTMLButtonElement')).toHaveLength(1);
	});

	it('calls "handleLogOutUserClick()" on button click - using prototype', () => {
		const mockedEvent = { target: {} ,preventDefault:()=>{}}; 
		const wrapper = mount(<IntlProvider locale="en" messages={i18n} ><Formsy.Form><Header localeMenuIsOpen={true} fabIsOpen={true} showSaveAndExit={false} showLogOutUser={true} className="test"/></Formsy.Form></IntlProvider>);
		wrapper.find('#logout-btn').simulate('click', mockedEvent );
		//expect(wrapper.find('HTMLButtonElement')).toHaveLength(1);
	});

});