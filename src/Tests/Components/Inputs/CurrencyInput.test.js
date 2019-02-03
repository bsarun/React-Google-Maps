import React from 'react';
import ReactDOM from 'react-dom';
import { Form } from 'formsy-react';
import CurrencyInput from '../../../Components/Inputs/CurrencyInput.jsx';
import {shallow, mount, render} from 'enzyme';
import { IntlProvider } from 'react-intl';
import renderer from 'react-test-renderer';shops
it('CurrencyInput renders value with comma as thousands seperator', () => {
	const div = document.createElement('div');
	var component = ReactDOM.render((
			<Form>
				<CurrencyInput
					id="testCurrencyInput"
					value="1000"
					name="currencyInput"
				/>
			</Form>
		), div);
		var node = ReactDOM.findDOMNode(component);
	expect(node.querySelectorAll('input')[0].value).toEqual('1,000');
});

it('CurrencyInput includes cents', () => {
	const div = document.createElement('div');
	var component = ReactDOM.render((
			<Form>
				<CurrencyInput
					id="testCurrencyInput"
					value="1000.26"
					name="currencyInput"
				/>
			</Form>
		), div);
		var node = ReactDOM.findDOMNode(component);
	expect(node.querySelectorAll('input')[0].value).toEqual('1,000.26');
});

it('CurrencyInput onBlur function', () => {
	const mockedEvent = { target: {value:'11111...'} ,preventDefault:()=>{}}; 
	var component = mount(
			<Form>
				<CurrencyInput
				id="testCurrencyInput"
					value="1000"
					name="currencyInput"
				/>
			</Form>
		);
	component.find('TextInput').prop('onBlur')(mockedEvent);
		
});
