import React from 'react';
import CheckBox from '../../../Components/Inputs/CheckBox';
import { IntlProvider } from 'react-intl';
import i18n from '../../../i18n.en.json';
import renderer from 'react-test-renderer';
import App from '../../../Containers/App.jsx';
let props;
import { Form } from 'formsy-react';
import {shallow, mount, render} from 'enzyme';

describe('RecaptchaInput ', () => {
	let callbackSpy = jest.fn(),
  callbackSpy2 = jest.fn(),
  callbackSpy3 = jest.fn(),
  // ref to the internal React component instance
  ref;


it('Renders RecaptchaInput element', () => {
	let wrapper = mount(<Form><IntlProvider locale="en" messages={i18n} ><CheckBox id='abc' name="test" setValue={callbackSpy2} onChange={callbackSpy3}/></IntlProvider></Form>);
 // call the ref's internal method

wrapper.find('#abc').simulate('change');

});


});

