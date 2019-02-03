import React from 'react';
import ToolTip from '../../../Components/ToolTip.jsx';
import { IntlProvider } from 'react-intl';
import i18n from '../../../i18n.en.json';
import renderer from 'react-test-renderer';
import {shallow, mount, render} from 'enzyme';
import LayoutActions from '../../../Actions/LayoutActions';
import App from '../../../Containers/App.jsx';
import ReactDOM from 'react-dom';
let props,portalAuthActions,output;
jest.mock('../../../Actions/PortalAuthActions');  
//jest.mock('../../../node_modules/react-dropzone/dist/index.js');
describe('(Component) ToolTip', () => {
	props = {
        location: { pathname: 'ToolTip', query: { pendingAppId: 999999 } },
        intl: {
		  messageIfExists : jest.fn(),
		  formatMessage: jest.fn()
        },
        params: {
          mode: "edit"
        },
        accessCodeModalIsOpen:true,
        accountDetails:{
          dob:"undefined",
          ssn:"undefined",
          password:"undefined",
          reEnterPassword:"undefined"
		},
		onUpload:jest.fn(),
		onDelete:jest.fn(),
		className:"",
		listType:true,
		showOnHover:true,
		showTip:true,
		id:'test',
		handleDocumentClick:jest.fn()
      };

      Object.defineProperty(window, "matchMedia", {
        value: jest.fn(() => { return { matches: true } })
	  });
	  output = renderer.create(<IntlProvider locale="en" messages={i18n} >
				  <ToolTip {...props}/>
				  </IntlProvider>);
	it('testing ToolTip ', () => {
		let tree = output.toJSON();
		expect(tree).toMatchSnapshot();	
	});
	it('calls "function()" - using prototype', () => {
		const mockedEvent = { target: {parentElement:{attributes:[]}} ,preventDefault:()=>{}}; 
		const wrapper = mount(<IntlProvider locale="en" messages={i18n} >
		<ToolTip {...props}/>
		</IntlProvider>);
		wrapper.find('.tooltip-container').simulate('mouseEnter', mockedEvent );
		wrapper.find('.tooltip-container').simulate('mouseLeave', mockedEvent );
		wrapper.find('#test-tooltip-anchor').simulate('click', mockedEvent );
		wrapper.find('#test-tooltip-anchor').simulate('keyDown', mockedEvent );
		//expect(wrapper.find('HTMLButtonElement')).toHaveLength(1);
	});
	it('ToolTip renders with an info icon by default', () => {
		const div = document.createElement('div');
		var component = ReactDOM.render((
			<IntlProvider locale="en" messages={i18n}>
				<ToolTip
					id="testTip"
				/>
			</IntlProvider>
		), div);
		var node = ReactDOM.findDOMNode(component);
	  expect(node.querySelectorAll('.tooltip-info-icon').length).toEqual(1);
	});
	
	it('ToolTip renders with a custom text anchor', () => {
	  const div = document.createElement('div');
	  var component = ReactDOM.render((
			<IntlProvider locale="en" messages={i18n}>
				<ToolTip
					id="testTip"
					anchor={<span>Custom Anchor</span>}
				/>
			</IntlProvider>
		), div);
		var node = ReactDOM.findDOMNode(component);
		expect(node.querySelectorAll('span')[0].textContent).toEqual("Custom Anchor");
	});
});