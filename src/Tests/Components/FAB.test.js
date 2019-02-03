import React from 'react';
import FAB from '../../Components/FAB';
import { IntlProvider } from 'react-intl';
import i18n from '../../i18n.en.json';
import renderer from 'react-test-renderer';
import {shallow, mount, render} from 'enzyme';
import ConfigStore from '../../Stores/ConfigStore'
describe('(Component) FAB', () => {
	it('testing FAB ', () => {
		var output = renderer.create(<IntlProvider locale="en" messages={i18n} ><FAB localeMenuIsOpen={true} fabIsOpen={true} showSaveAndExit={true} showLogOutUser={true} className="test"/></IntlProvider>);
		let tree = output.toJSON();
		expect(tree).toMatchSnapshot();	
	});
	it('calls "functions()" on button click - using prototype', () => {
		const mockedEvent = { target: {} ,preventDefault:()=>{}}; 
		global.open = jest.fn().mockReturnValue(global);	  
		const wrapper = mount(<IntlProvider locale="en" messages={i18n} ><FAB localeMenuIsOpen={true} fabIsOpen={true} showSaveAndExit={true} showLogOutUser={true} isOpen ={true}/></IntlProvider>);
		wrapper.find('#need-help-btn').simulate('click', mockedEvent );
		wrapper.find('#fab-open-btn').simulate('click', mockedEvent );
		wrapper.find('.live-chat').simulate('click', mockedEvent );
		wrapper.find('.local-help').simulate('click', mockedEvent );
		wrapper.find('.FAB').simulate('mouseEnter', mockedEvent );
		wrapper.find('.FAB').simulate('mouseLeave', mockedEvent );
		//expect(wrapper.find('HTMLButtonElement')).toHaveLength(1);
	});

});