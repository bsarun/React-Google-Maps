import React from 'react';
import ReactDOM from 'react-dom';
import Routes from '../../Containers/Routes';
//import { createHistory } from 'history';
import { shallow } from 'enzyme';

describe('Routes', () => {

    it('Tests for Routes', function(){
        
        const wrapper=shallow(<Routes />);
        const component=wrapper.find('Routes').getNode;
        //expect(process.env.appConfig).toBe(undefined);

    });

    const routeChangeHandler = [
        {
            person: {
                firstName: "test",
                personId: "",
                avatar: [],
                lastName: "test"
            }
        }
    ]
});
