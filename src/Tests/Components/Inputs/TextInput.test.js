import React from 'react';
import ReactDOM from 'react-dom';
import { Form } from 'formsy-react';
import ReactTestUtils from 'react-addons-test-utils';
import TextInput from '../../../Components/Inputs/TextInput.jsx';
import App from '../../../Containers/App.jsx';
import request from 'superagent';
import { IntlProvider } from 'react-intl';
import SyntheticEvent from 'react';
import { shallow, mount, render } from 'enzyme';
import i18n from '../../../i18n.en.json';
let wrapper,wrapper1, props;
describe("TextInput", () => {


	beforeEach(() => {
        props = {
            location: { pathname: '/shopandcomapre', query: { gi: true } },
            intl: {
                messageIfExists: jest.fn()
			},
			pattern:"hello"
        };

        Object.defineProperty(window, "matchMedia", {
            value: jest.fn(() => { return { matches: true } })
		});

		wrapper = mount(
            <IntlProvider locale="en" messages={i18n}>
                <Form>
	 			<TextInput
					id="testTextInput"
					name="textInput"
				/>
	 		</Form>
            </IntlProvider>, context
        );
		let questionsNode = wrapper.find('TextInput').getNode();
		questionsNode.handleInputChange();
	});

	afterEach(() => {
        request.__setMockError(null);
    });


	it('Navigate to componentWillMount on returning getaccoridianstate = 0', () => {
        let wrapper2 = mount(
            <IntlProvider locale="en" messages={i18n}>
               <Form>
	 			<TextInput
					id="testTextInput"
					name="textInput"
				/>
	 		</Form>
            </IntlProvider>, context
        );
		let questionsNode2 = wrapper2.find('TextInput').getNode();
		questionsNode2.handleInputChange();
		
	});
	

	it('Navigate to componentWillMount on returning getaccoridianstate = 0', () => {
        let wrapper2 = mount(
            <IntlProvider locale="en" messages={i18n}>
               <Form>
	 			<TextInput
					id="testTextInput"
					name="textInput"
				/>
	 		</Form>
            </IntlProvider>, context
        );
		let questionsNode2 = wrapper2.find('TextInput').getNode();
		
		questionsNode2.handleInputFocus();
		
	});
	

	it('Navigate to componentWillMount on returning getaccoridianstate = 0', () => {
        let wrapper2 = mount(
            <IntlProvider locale="en" messages={i18n}>
               <Form>
	 			<TextInput
					id="testTextInput"
					name="textInput"
				/>
	 		</Form>
            </IntlProvider>, context
        );
		let questionsNode2 = wrapper2.find('TextInput').getNode();
		
		questionsNode2.handleInputBlur();
		
	});


	it('Navigate to componentWillMount on returning getaccoridianstate = 0', () => {
        let wrapper2 = mount(
            <IntlProvider locale="en" messages={i18n}>
               <Form>
	 			<TextInput
					id="testTextInput"
					name="textInput"
				/>
	 		</Form>
            </IntlProvider>, context
        );
		let questionsNode2 = wrapper2.find('TextInput').getNode();
		
		questionsNode2.handleInputChangeOnPaste();
		
    });
	


	it('Navigate to componentWillMount on returning getaccoridianstate = 0', () => {
        let wrapper2 = mount(
            <IntlProvider locale="en" messages={i18n}>
               <Form>
	 			<TextInput
					id="testTextInput"
					name="textInput"
				/>
	 		</Form>
            </IntlProvider>, context
        );
		let questionsNode2 = wrapper2.find('TextInput').getNode();
		
		questionsNode2.focus();
		
    });




	let context = {
        context: {
            router: {
                listen: jest.fn(),
                createHref: jest.fn(),
                isActive: jest.fn(),
                push: jest.fn(),
                replace: jest.fn(),
                go: jest.fn(),
                goBack: jest.fn(),
                goForward: jest.fn(),
                setRouteLeaveHook: jest.fn(),
            }
        },
        childContextTypes: {
            router: React.PropTypes.object.isRequired,
        }
    };

});
