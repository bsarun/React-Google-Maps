import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import i18n from '../i18n.en.json';

//import Component-to-be-tested from '../../Components/Example-Component.jsx';
import MoneyValue from '../Components/MoneyValue.jsx';

it('Performs some expected function', () => {
	const div = document.createElement('div');
	var component = ReactDOM.render((
			<IntlProvider locale="en" messages={i18n} >
                <MoneyValue amount="1"/>
			</IntlProvider>
		), div);
		var node = ReactDOM.findDOMNode(component);
	
    //some expected result from rendered output
    //expect(node.textContent).toEqual('some value');
});