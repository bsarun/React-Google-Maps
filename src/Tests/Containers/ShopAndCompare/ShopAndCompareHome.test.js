import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Form } from 'formsy-react';
import { IntlProvider } from 'react-intl';
import i18n from '../../../i18n.en.json';
import App from '../../../Containers/App.jsx';
import PortalAuthActions from '../../../Actions/PortalAuthActions';
//import shopandcomapreHome from '../../../Containers/ShopAndCompare/ShopAndCompareHome';

import ShopAndCompareContainer from '../../../Containers/ShopAndCompare/ShopAndCompareHome.jsx';

import PropTypes from 'prop-types';
import sinon from 'sinon';
import AppDispatcher from '../../../Dispatchers/AppDispatcher.js';
import AuthStore from '../../../Stores/AuthStore';
import { shallow, mount, render } from 'enzyme';
let props, portalAuthActions, tree, wrapper, wrapper1, wrapper2, output, state, zipcodeHasCounties = true;

describe('<ShopAndCompareContainer />', () => {
    let shopandcomparecontainer, props;
    beforeEach(() => {
        props = {
            location: { pathname: '/secure-mailbox', query: { gi: true } },
            intl: {
                messageIfExists: jest.fn()
            },
            formData: {
                enrollmentYear: "2017"
            }
        };
        Object.defineProperty(window, "matchMedia", {
            value: jest.fn(() => { return { matches: true } })
        });

        shopandcomparecontainer = mount(
            <IntlProvider locale="en" messages={i18n} >
                <App {...props}>
                    <ShopAndCompareContainer />
                </App>
            </IntlProvider>);
    });
    it('Testing Display of ShopAndCompareContainer', () => {
        let shopandcomparecontainerWrapper = mount(
            <IntlProvider locale="en" messages={i18n} >
                <App {...props}>
                    <ShopAndCompareContainer />
                </App>
            </IntlProvider>);
        expect(shopandcomparecontainerWrapper).toHaveLength(1);
    });
});

