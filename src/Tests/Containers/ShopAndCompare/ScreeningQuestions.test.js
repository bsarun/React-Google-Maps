import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Form } from 'formsy-react';
import { IntlProvider } from 'react-intl';
import request from 'superagent';
import i18n from '../../../i18n.en.json';
import App from '../../../Containers/App.jsx';
import PortalAuthActions from '../../../Actions/PortalAuthActions';
import ScreeningQuestions from '../../../Containers/ShopAndCompare/ScreeningQuestions.jsx';
import ShopAndCompareStore from '../../../Stores/ShopAndCompareStore';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import AppDispatcher from '../../../Dispatchers/AppDispatcher.js';
import AuthStore from '../../../Stores/AuthStore';
import { shallow, mount, render } from 'enzyme';
import ScreeningQuestionsAction from '../../../Actions/ScreeningQuestionsActions.js';
import ConfigStore from '../../../Stores/ConfigStore';
import EndpUtils from '../../../Actions/EndpointActionUtils';

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
                    "costshare"
                ]
            },
            {
                "coverage": true,
                "age": 24,
                "pregnant": true,
                "blindOrDisabled": false,
                "eligibilities": [
                    "unsubsidized"
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

let counties = [{ "countyName": "Kern", "countyCode": "06029" }, { "countyName": "San Luis Obispo", "countyCode": "06079" }, { "countyName": "Santa Barbara", "countyCode": "06083" }, { "countyName": "Ventura", "countyCode": "06111" }];
describe('<ScreeningQuestions />', () => {

    beforeAll(() => {
        request.__setMockResponse({ body: {} });
        EndpointUtils.handleError = jest.fn();
        ScreeningQuestionsAction.getCoverageYear = jest.genMockFunction().mockReturnValue(true);
        ShopAndCompareStore.getCounty = jest.genMockFunction().mockReturnValue(counties)
    })

    beforeEach(() => {
        props = {
            location: { pathname: '/shopandcomapre', query: { gi: true } },
            intl: {
                messageIfExists: jest.fn()
            },
        };

        Object.defineProperty(window, "matchMedia", {
            value: jest.fn(() => { return { matches: true } })
        });

        wrapper = mount(
            <IntlProvider locale="en" messages={i18n}>
                <App {...props}>
                    <ScreeningQuestions />
                </App>
            </IntlProvider>, context
        );
        let questionsNode = wrapper.find('ScreeningQuestions').getNode();
        questionsNode.setState({
            formData: formData,
            counties: counties
        });
        let eventSpy = sinon.spy();
        let response = require('superagent');
        response.__setMockResponse({
            body: {
                person: {
                    firstName: '1212'
                },
                personId: 121,

            }
        });
        let dispatchListener = AppDispatcher.register((payload) => {
            if (payload.action.type === 'COVERAGE_ENDPOINT') {
                eventSpy(payload.action.payload);
            }
        });
        
        let apiEndpointHealthcareBaseURL = 'http://www.xyz.com';
        let apiEndpointHouseholdPersonBaseURI = 'http://www.xyz1.com';
        let apiEndpointHealthcareAIANURI = 'http://www.xyz2.com';
        ConfigStore.getURL = jest.genMockFunction().mockReturnValue(apiEndpointHealthcareBaseURL);
        ConfigStore.get = jest.genMockFunction().mockReturnValue(apiEndpointHouseholdPersonBaseURI);
        ConfigStore.get = jest.genMockFunction().mockReturnValue(apiEndpointHealthcareAIANURI);
        EndpointUtils.momentToDateString = jest.genMockFunction().mockReturnValue('19/08/2017');

        questionsNode.setState({
            coverageList: formData,
            progressModalIsOpen: false,
            counties: counties
        });



        expect(eventSpy.called).toBe(false);
        dispatch('COVERAGE_ENDPOINT', formData);
        dispatch('SERVER_ERROR', formData);
        

        questionsNode.setState({
            progressModalIsOpen: false,
            counties: ["a", "b"]
        });
        questionsNode.setState({
            coverageWarningModal: false,
            progressModalIsOpen: true
        });
    });

    afterEach(() => {
        request.__setMockError(null);
    });




    it('Testing Dispatch', () => {
        let eventSpy = sinon.spy();
        let response = require('superagent');
        response.__setMockResponse({
            body: {
                person: {
                    firstName: '1212'
                },
                personId: 121,

            }
        });
        let dispatchListener = AppDispatcher.register((payload) => {
            if (payload.action.type === 'SERVER_ERROR') {
                eventSpy(payload.action.payload);
            }
        });

        expect(eventSpy.called).toBe(false);
        dispatch('SERVER_ERROR', formData);

    });






    it('Testing Dispatch Event ZIPCODE_LOOKUP_SINGLE_COUNTY', () => {
        let data = {
            action: {
                type: 'ZIPCODE_LOOKUP_SINGLE_COUNTY'
            }
        }
        let eventSpy = sinon.spy();
        let dispatchListener = AppDispatcher.register((payload) => {
            if (payload.action.type === 'ZIPCODE_LOOKUP_SINGLE_COUNTY') {
                eventSpy(payload.action.payload);
            }
        });
        AppDispatcher.register = jest.fn().mockReturnValue(data);
        AuthStore.getUserId = jest.fn().mockReturnValue(true)
        dispatch('ZIPCODE_LOOKUP_SINGLE_COUNTY', data);
        const onPeopleStoreChange = jest.fn().mockReturnValue(true)
        wrapper.unmount();
        const onAuthStoreChange = jest.fn().mockReturnValue(true)
        const handleCloseGlobalMultitabErrorModal = jest.fn().mockReturnValue(true)
        //AuthStore.emit('change', onAuthStoreChange);
        // PeopleStore.on('change', this.binds.onPeopleStoreChange);
        PeopleStore.emit('change', onPeopleStoreChange);
        AuthStore.emit('change', handleCloseGlobalMultitabErrorModal);
    });




    it('Testing Dispatch Event ZIPCODE_LOOKUP_NO_COUNTY_FOUND', () => {
        let data = {
            action: {
                type: 'ZIPCODE_LOOKUP_NO_COUNTY_FOUND'
            }
        }
        let eventSpy = sinon.spy();
        let dispatchListener = AppDispatcher.register((payload) => {
            if (payload.action.type === 'ZIPCODE_LOOKUP_NO_COUNTY_FOUND') {
                eventSpy(payload.action.payload);
            }
        });
        AppDispatcher.register = jest.fn().mockReturnValue(data);
        AuthStore.getUserId = jest.fn().mockReturnValue(true)
        dispatch('ZIPCODE_LOOKUP_NO_COUNTY_FOUND', null);
        const onPeopleStoreChange = jest.fn().mockReturnValue(true)
        wrapper.unmount();
        const onAuthStoreChange = jest.fn().mockReturnValue(true)
        const handleCloseGlobalMultitabErrorModal = jest.fn().mockReturnValue(true)
        //AuthStore.emit('change', onAuthStoreChange);
        // PeopleStore.on('change', this.binds.onPeopleStoreChange);
        PeopleStore.emit('change', onPeopleStoreChange);
        AuthStore.emit('change', handleCloseGlobalMultitabErrorModal);
    });







    it('Testing Dispatch Event ZIPCODE_LOOKUP_MULTIPLE_COUNTIES', () => {
        let data = {
            action: {
                type: 'ZIPCODE_LOOKUP_MULTIPLE_COUNTIES'
            }
        }
        let eventSpy = sinon.spy();
        let dispatchListener = AppDispatcher.register((payload) => {
            if (payload.action.type === 'ZIPCODE_LOOKUP_MULTIPLE_COUNTIES') {
                eventSpy(payload.action.payload);
            }
        });
        AppDispatcher.register = jest.fn().mockReturnValue(data);
        AuthStore.getUserId = jest.fn().mockReturnValue(true)
        dispatch('ZIPCODE_LOOKUP_MULTIPLE_COUNTIES', data);
        const onPeopleStoreChange = jest.fn().mockReturnValue(true)
        wrapper.unmount();
        const onAuthStoreChange = jest.fn().mockReturnValue(true)
        const handleCloseGlobalMultitabErrorModal = jest.fn().mockReturnValue(true)
        //AuthStore.emit('change', onAuthStoreChange);
        // PeopleStore.on('change', this.binds.onPeopleStoreChange);
        PeopleStore.emit('change', onPeopleStoreChange);
        AuthStore.emit('change', handleCloseGlobalMultitabErrorModal);
    });

    it('Testing Navigate to Inbox Message Content', () => {
        expect(tree).toMatchSnapshot();

    });
    it('Navigate to componentWillMount on returning getaccoridianstate = 0', () => {
        let wrapper1 = mount(
            <IntlProvider locale="en" messages={i18n}>
                <App {...props}>
                    <ScreeningQuestions />
                </App>
            </IntlProvider>, context
        );
        let questionsNode1 = wrapper1.find('ScreeningQuestions').getNode();
        questionsNode1.setState({ formData: formData });
        questionsNode1.setState({
            counties: ["2016", "2017"]
        });

        questionsNode1.handleProgamsChange('age-1', 23);


    });







    it('Navigate to componentWillMount on returning getaccoridianstate = 0', () => {
        let wrapper9 = mount(
            <IntlProvider locale="en" messages={i18n}>
                <App {...props}>
                    <ScreeningQuestions />
                </App>
            </IntlProvider>, context
        );
        let questionsNode9 = wrapper9.find('ScreeningQuestions').getNode();
        questionsNode9.setState({ formData: formData });
        questionsNode9.setState({
            counties: ["2016", "2017"]
        });

        questionsNode9.handleProgamsChange('coverage-1', 23);


    });


    it('Navigate to componentWillMount on returning getaccoridianstate = 0', () => {
        let wrapper9 = mount(
            <IntlProvider locale="en" messages={i18n}>
                <App {...props}>
                    <ScreeningQuestions />
                </App>
            </IntlProvider>, context
        );
        let questionsNode9 = wrapper9.find('ScreeningQuestions').getNode();
        questionsNode9.setState({ formData: '' });
        questionsNode9.setState({
            counties: ["2016", "2017"]
        });

        questionsNode9.handleProgamsChange('', 23);


    });









    it('Navigate to componentWillMount on returning getaccoridianstate = 0', () => {
        let wrapper2 = mount(
            <IntlProvider locale="en" messages={i18n}>
                <App {...props}>
                    <ScreeningQuestions />
                </App>
            </IntlProvider>, context
        );
        let questionsNode2 = wrapper2.find('ScreeningQuestions').getNode();

        questionsNode2.handleChange("howmanypeopleinhousehold", "2");
        questionsNode2.setState({
            AgeOfHouseholdBlock: false,
            AgeOfHouseholdValue: 0
        })
    });

    it('Navigate to componentWillMount on returning getaccoridianstate = 0', () => {
        let wrapper3 = mount(
            <IntlProvider locale="en" messages={i18n}>
                <App {...props}>
                    <ScreeningQuestions />
                </App>
            </IntlProvider>, context
        );
        let questionsNode3 = wrapper3.find('ScreeningQuestions').getNode();
        questionsNode3.handleChange("zip", "95236");
        questionsNode3.handleChange("householdincomeperyear", "2");
        questionsNode3.navigateToResults();
        questionsNode3.handleSaveForm();



    });


    it('Navigate to componentWillMount on returning getaccoridianstate = 0', () => {
        let wrapper3 = mount(
            <IntlProvider locale="en" messages={i18n}>
                <App {...props}>
                    <ScreeningQuestions />
                </App>
            </IntlProvider>, context
        );
        let questionsNode9 = wrapper3.find('ScreeningQuestions').getNode();
      
        questionsNode9.navigateToResults();

        expect(context.context.router.push).toHaveBeenCalledWith('/screening-results');
     



    });

    it('Navigate to componentWillMount on returning getaccoridianstate = 0', () => {

        let wrapper4 = mount(
            <IntlProvider locale="en" messages={i18n}>
                <App {...props}>
                    <ScreeningQuestions />
                </App>
            </IntlProvider>, context
        );
        let questionsNode4 = wrapper4.find('ScreeningQuestions').getNode();
        questionsNode4.handleChange("householdincomeperyear", "2");
        questionsNode4.setState({ formIsValid: true });
        questionsNode4.handleSubmitForm();
        questionsNode4.componentWillUnmount();

        questionsNode4.onFormValid();

        questionsNode4.setState({ zipCodeModal: false });
        questionsNode4.onConfirmZipcodeModal();

        questionsNode4.setState({ coverageWarningModal: false });
        questionsNode4.closeWarningModal();




        let dat = {
            "enrollYear": "2018",
            "zip": "95814",
            "income": 23405.45,
            "county": ["Stanislaus", "LosAngeles"],
            "members": [
                {
                    "coverage": false,
                    "age": 23,
                    "pregnant": false,
                    "blindOrDisabled": false,
                    "eligibilities": []
                }
            ],
            "csrLevel": null,
            "maxAPTCAmount": 234.56
        }
        questionsNode4.setState({ formData: dat });
        questionsNode4.handleSaveForm();
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
