import React from 'react';
import ReactDOM from 'react-dom';
import {wrapper,shallow, mount, render} from 'enzyme';
import sinon from 'sinon';
import { Form } from 'formsy-react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
//import i18n from '../../../i18n.en.json';
import FormColumn from '../../../Components/Inputs/FormColumn';

describe('<FromColumn />', () => {
       const component = renderer.create(<IntlProvider locale="en"  ><Formsy.Form>
            <FormColumn /></Formsy.Form></IntlProvider>);
		let tree = component.toJSON();
    it('Renders the AppPdf component', () => {
        expect(tree).toMatchSnapshot();

    });
   
});
