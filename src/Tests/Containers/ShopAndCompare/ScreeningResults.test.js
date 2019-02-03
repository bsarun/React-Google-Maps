import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Form } from 'formsy-react';
import { IntlProvider } from 'react-intl';
import request from 'superagent';
import i18n from '../../../i18n.en.json';
import App from '../../../Containers/App.jsx';
import PortalAuthActions from '../../../Actions/PortalAuthActions';
import ScreeningResults from '../../../Containers/ShopAndCompare/ScreeningResults.jsx';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import AppDispatcher from '../../../Dispatchers/AppDispatcher.js';
import AuthStore from '../../../Stores/AuthStore';
import { shallow, mount, render } from 'enzyme';
import ScreeningQuestionsAction from '../../../Actions/ScreeningQuestionsActions.js';
import ConfigStore from '../../../Stores/ConfigStore';
import EndpUtils from '../../../Actions/EndpointActionUtils';
import ShopAndCompareStore from '../../../Stores/ShopAndCompareStore';
const EndpointUtils = jest.mock('../../../Actions/EndpointActionUtils');

let props, portalAuthActions, tree, wrapper, wrapper1, wrapper2, output, state, zipcodeHasCounties = true, enteredAlphabets = true,
    formData = {
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
                "coverage": true,
                "age-2": 56,
                "pregnant": false,
                "blindOrDisabled": false,
                "eligibilities": [
                    "EXCHANGE_COST_SHARE",
                    "EXCHANGE_SUBSIDIZED"
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
                    "EXCHANGE_UNSUBSIDIZED"
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


describe('<ScreeningResults />', () => {

    beforeAll(() => {
        request.__setMockResponse({ body: {} });
        EndpointUtils.handleError = jest.fn();
        ShopAndCompareStore.getAllSavedData = jest.genMockFunction().mockReturnValue(formData);
    })

    beforeEach(() => {
        props = {
            location: { pathname: '/shopandcomapre', query: { gi: true } },
            intl: {
                messageIfExists: jest.fn()
            },
            goToHome: jest.fn()
        };
        Object.defineProperty(window, "matchMedia", {
            value: jest.fn(() => { return { matches: true } })
        });

        wrapper = renderer.create(
            <IntlProvider locale="en" messages={i18n}>
                <App {...props}>
                    <ScreeningResults goToHome={jest.fn()} {...props} />
                </App>
            </IntlProvider>, context
        );


        let questionsNode = wrapper.find('ScreeningResults').getNode();  
        
        questionsNode.setState({ formData: formData });
        questionsNode.goToHome();
        wrapper.goToHome();
        
    });

    afterEach(() => {
        request.__setMockError(null);
    });

    it('Testing Navigate to Inbox Message Content', () => {
        expect(tree).toMatchSnapshot();
    });
  

    let dispatch = (actionType, payload) => {
        AppDispatcher.dispatch({
            action: {
                type: actionType,
                payload: payload
            }
        });
    };

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
