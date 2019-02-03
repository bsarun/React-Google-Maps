import React from 'react';
import LocaleMenu from '../../Components/LocaleMenu';
import SegmentedControl from '../../Components/Inputs/SegmentedControl';
import { IntlProvider } from 'react-intl';
import i18n from '../../i18n.en.json';
import renderer from 'react-test-renderer';
import {shallow, mount, render} from 'enzyme';
import App from '../../Containers/App.jsx';


describe('Todo component renders the todo correctly', () => {
	it('Renders correctly', () => {
		var output = renderer.create(<IntlProvider locale="en" messages={i18n}><LocaleMenu name="test"/></IntlProvider>);
		let tree = output.toJSON();
		expect(tree).toMatchSnapshot();	
	}); 
	it('calls "handleLanguageChange()" on button click - using prototype', () => {
		const mockedEvent = { target: {} ,preventDefault:()=>{}}; 
		const wrapper = mount(<IntlProvider locale="en" messages={i18n}><LocaleMenu name="test"/></IntlProvider>);
		wrapper.find('#locale-options-0').simulate('click', mockedEvent );
		
	});
	it('calls "handleLocaleMenuClick()" on button click - using prototype', () => {
		const mockedEvent = { target: {} ,preventDefault:()=>{}}; 
		const wrapper = mount(<IntlProvider locale="en" messages={i18n}><LocaleMenu name="test"/></IntlProvider>);
		wrapper.find('.locale-menu > button').simulate('click', mockedEvent );
	
	});
});
