import React from 'react';
import ReactDOM from 'react-dom';
import { wrapper, shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import Formsy from 'formsy-react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import App from '../../../Containers/App.jsx';
import i18n from '../../../i18n.en.json';
import NumericInput from '../../../Components/Inputs/NumericInput';
import PortalAuthActions from '../../../Actions/PortalAuthActions';
jest.mock('../../../Actions/PortalAuthActions');
let props, portalAuthActions, component, inputType = "password", masked="true";

describe('NumericInput ', () => {

	it('Testing NumericInput', () => {
		props = {
			location: { pathname: 'numeric-input', query: { pendingAppId: 999999 } },
			intl: {
				messageIfExists: jest.fn()
			},
			masked: true
		}
		Object.defineProperty(window, "matchMedia", {
			value: jest.fn(() => { return { matches: true } })
		});
		component = renderer.create(<IntlProvider locale="en" messages={i18n} ><App {...props}><Formsy.Form>
			<NumericInput 
				type="password"	
				name="df"		
				validations={{
					isLessThan: "5",
					isLessThanEqual: "5",
					isGreaterThan: "1"
				}}
				validationErrors={{
					disLessThan: "error",
					isLessThanEqual: "error",
					isGreaterThan: "error"
					}}/></Formsy.Form></App></IntlProvider>);

		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

});