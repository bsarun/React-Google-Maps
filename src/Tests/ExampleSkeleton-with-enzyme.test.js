import React from 'react';
import ReactDOM from 'react-dom';
import {shallow, mount, render} from 'enzyme';
import { Form } from 'formsy-react';

it('Renders a TextInput with class = numeric-input', () => {
	var output = mount(<Form><NumericInput name="test"/></Form>);
	expect(output.find('.numeric-input')).toHaveLength(1);
});

it('Renders a TextInput with id=idtest, name=test, and value=123', () => {
	var output = mount(<Form><NumericInput id="idtest" name="test" value="123"/></Form>);
	//console.log(output);
	expect(output.find('#idtest')).toHaveLength(1);
	expect(output.find('#idtest').prop('name')).toEqual('test');
	expect(output.find('#idtest').prop('value')).toEqual('123');
});
