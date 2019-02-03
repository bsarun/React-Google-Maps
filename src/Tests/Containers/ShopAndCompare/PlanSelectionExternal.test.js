import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, render, mount, configure } from 'enzyme';
import renderer from 'react-test-renderer';
import { Form } from 'formsy-react';
import { IntlProvider } from 'react-intl';
import i18n from '../../../i18n.en.json';
import App from '../../../Containers/App.jsx';
import PortalAuthActions from '../../../Actions/PortalAuthActions';
import PlanSelectionExternal from '../../../Containers/ShopAndCompare/PlanSelectionExternal';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import AppDispatcher from '../../../Dispatchers/AppDispatcher.js';
import ConfigStore from '../../../Stores/ConfigStore';
import ShopAndCompareStore from '../../../Stores/ShopAndCompareStore';

let formData = {
	"enrollYear": "2018",
	"zip": "95814",
	"income": 23405.45,
	"county": ["Stanislaus", "LosAngeles"],
	"members": [
		{
			"coverage": false,
			"age-1": 23,
			"pregnant": false,
			"blindOrDisabled": false,
			"eligibilities": [
				"magiMedical"
			]
		}
	],
	"csrLevel": null,
	"maxAPTCAmount": 234.56
};

jest.mock('../../../Actions/PortalAuthActions');
jest.mock('../../../Actions/EndpointActionUtils.js');


let formData = {
        "enrollYear": "2018",
        "zip": "95814",
        "income": 23405.45,
        "county": ["Stanislaus", "LosAngeles"],
        "members": [
            {
                "coverage": false,
                "age-1": 23,
                "pregnant": false,
                "blindOrDisabled": false,
                "eligibilities": [
                    "magiMedical"
                ]
            },
            {
                "coverage": false,
                "age-2": 56,
                "pregnant": false,
                "blindOrDisabled": false,
                "eligibilities": [
                    "magiMedical",
                    "subsidized"
                ]
            },
            {
                "coverage": true,
                "age-3": 77,
                "pregnant": false,
                "blindOrDisabled": false,
                "eligibilities": [
                    "EXCHANGE_SUBSIDIZED"
                ]
            },
            {
                "coverage": true,
                "age": 24,
                "pregnant": true,
                "blindOrDisabled": false,
                "eligibilities": [
                    "MAGI_MEDICAL_CARETAKER"
                ]
            },
            {
                "coverage": true,
                "age": 99,
                "pregnant": true,
                "blindOrDisabled": false,
                "eligibilities": [
                    "mcap"
                ]
            },
            {
                "coverage": true,
                "age": 76,
                "pregnant": true,
                "blindOrDisabled": false,
                "eligibilities": [
                    "cchip"
                ]
            },
            {
                "coverage": true,
                "age": 65,
                "pregnant": true,
                "blindOrDisabled": false,
                "eligibilities": [
                    "nonMagiMedical"
                ]
            }
        ],
        "csrLevel": null,
        "maxAPTCAmount": 234.56
    };

describe('<PlanSelectionExternal />', () => {

	beforeAll(() => {
        request.__setMockResponse({ body: {} });
        EndpointUtils.handleError = jest.fn();
        ShopAndCompareStore.getAllSavedData = jest.genMockFunction().mockReturnValue(formData);
    })

	let 	props, 
		portalAuthActions,
		output,
		tree,
		wrapper,
		component;
	
	let context = {
		context:           {
			router: {
				listen:            jest.fn(),
				createHref:        jest.fn(),
				isActive:          jest.fn(),
				push:              jest.fn(),
				replace:           jest.fn(),
				go:                jest.fn(),
				goBack:            jest.fn(),
				goForward:         jest.fn(),
				setRouteLeaveHook: jest.fn(),
			}
		},
		childContextTypes: {
			router: React.PropTypes.object.isRequired,
		}
	};

	console.warn = jest.fn();
	console.error = jest.fn();

	beforeEach(() => {
		props = {
			location: { pathname: 'Tax-Review', query: {pendingAppId: 999999, appIdGetParam:'param',url : 'url'}},	
			intl: {
			messageIfExists : jest.fn()
			}
		};
		Object.defineProperty(window, "matchMedia", {
			value: jest.fn(() => { return { matches: true } })
		});
		jest.mock('../../../Actions/PortalAuthActions');
		portalAuthActions = require('../../../Actions/PortalAuthActions');
		portalAuthActions.refreshAuthToken = jest.fn();
		portalAuthActions.refreshAuthToken.mockImplementation(function (){return;});


		let questionsNode = wrapper.find('PlanSelectionExternal').getNode();
        ShopAndCompareStore.getAllSavedData();
        questionsNode.setState({ formData: formData });
	});

	afterEach(() => {
		props = {
			location: { pathname: 'Tax-Review', query: {pendingAppId: 999999, appIdGetParam:'param',url : 'url'}},	
			intl: {
			messageIfExists : jest.fn(),
			}
		};
		wrapper = mount(<IntlProvider locale="en" messages={i18n} >
				<App {...props}>
					<Formsy.Form {...props}>
						<PlanSelectionExternal {...props}/>
					</Formsy.Form>
				</App>
			</IntlProvider>,
			context
		);

		wrapper.unmount();
	});

	it ("Overrides the GI click properly", () => {
		props = {
			location: { pathname: 'Tax-Review', query: {pendingAppId: 999999, appIdGetParam:'param',url : 'url'}},	
			intl: {
			messageIfExists : jest.fn()
			}
		};
		ConfigStore.get = jest.fn().mockReturnValue("ABC");
		wrapper = mount(
		<IntlProvider locale="en" messages={i18n} >
				<App {...props}>
					<Formsy.Form {...props}>
						<PlanSelectionExternal {...props}/>
					</Formsy.Form>
				</App>
		</IntlProvider>,
		context
		);
// get the react component so it can be interacted with directly
		component = wrapper.find('PlanSelectionExternal').getNode();
        component.handleGIRedirectClick();
        component.onLoad();
		expect(context.context.router.push).toBeCalledWith("ABC");
	});

	it("It handles the location change correctly", () => {
		var form = {
			getElementsByClassName: jest.fn().mockReturnValue([{formData}])			
		};
		var iframe = {
			gotoparent: jest.fn(),			
			document: {
				getElementById: jest.fn().mockReturnValue(form),
				formData: formData
			}
		};
		props = {
			location: { pathname: 'Tax-Review', query: {pendingAppId: 999999, appIdGetParam:'param',url : 'url'}},	
			intl: {
			messageIfExists : jest.fn()
			}
		};
		wrapper = mount(<IntlProvider locale="en" messages={i18n} >
				<App {...props}>
					<Formsy.Form {...props}>
						<PlanSelectionExternal {...props}/>
					</Formsy.Form>
				</App>
			</IntlProvider>,
			context
		);
		// get the react component so it can be interacted with directly
		component = wrapper.find('PlanSelectionExternal').getNode();
		component.onLocationChange("", iframe);
		// component.handleGIRedirectClick()
	});

});