import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Form } from 'formsy-react';
import { IntlProvider } from 'react-intl';
// import Adapter from 'enzyme-adapter-react-15.4';
import request from 'superagent';
import sinon from 'sinon';
import AppDispatcher from '../../Dispatchers/AppDispatcher.js';
import Enzyme, { shallow, mount, render } from 'enzyme';
import ConfigStore from '../../Stores/ConfigStore';
import GoogleMap from '../../Containers/GoogleMap.jsx';
const EndpointUtils = jest.mock('../../Actions/EndpointActionUtils');
import GoogleMapActions from '../../Actions/GoogleMapActions.js';

describe('<GoogleMap />', () => {

    beforeAll(() => {
        request.__setMockResponse({ body: {} });
        EndpointUtils.handleError = jest.fn();
        GoogleMapActions.getLatLng = jest.genMockFunction().mockReturnValue("Bangalore");
        GoogleMapActions.updateLatLng = jest.genMockFunction().mockReturnValue(0, "Bangalore")
    })

    beforeEach(() => {
     
        Object.defineProperty(window, "matchMedia", {
            value: jest.fn(() => { return { matches: true } })
        });

        var output = renderer.mount(<GoogleMap/>);

        let tree = output.toJSON();
		expect(tree).toMatchSnapshot();	


    });

    it('Navigate to componentWillMount on returning getaccoridianstate = 0', () => {
        let wrapper1 = mount(<GoogleMap />);

        
       


    });


  
});
