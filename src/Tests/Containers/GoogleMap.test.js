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
import GoogleMapStore from '../../Stores/GoogleMapStore.js';

describe('<GoogleMap />', () => {
    let applicationMenu, props, tree;

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
        
        applicationMenu = renderer.create(<GoogleMap/>);
        tree =applicationMenu.toJSON();
        applicationMenu.unmount();
       

    });

    it('Navigate to componentWillMount on returning getaccoridianstate = 0', () => {
        const mockedEvent = { target: {} ,preventDefault:()=>{}}; 
        const wrapper = mount(<GoogleMap/>);
        var output = wrapper.find('GoogleMap').getNode();
        output.handleInputChange(mockedEvent)
        // wrapper.find('#input-id').simulate('change', mockedEvent  );

    });

   


  
});
