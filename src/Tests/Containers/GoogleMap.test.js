import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Form } from 'formsy-react';
import { IntlProvider } from 'react-intl';
import request from 'superagent';
import sinon from 'sinon';
import AppDispatcher from '../../Dispatchers/AppDispatcher.js';
import Enzyme, { shallow, mount, render } from 'enzyme';
import ConfigStore from '../../Stores/ConfigStore';
import GoogleMaps from '../../Containers/GoogleMap.jsx';
const EndpointUtils = jest.mock('../../Actions/EndpointActionUtils');
import GoogleMapActions from '../../Actions/GoogleMapActions.js';
import GoogleMapStore from '../../Stores/GoogleMapStore.js';

describe('<GoogleMaps />', () => {
    let googleMapMount, props, tree, googleMapWrap, toDelete = true;

    beforeAll(() => {
        request.__setMockResponse({ body: {} });
        EndpointUtils.handleError = jest.fn();
        GoogleMapActions.getLatLng = jest.genMockFunction().mockReturnValue("Bangalore");
        GoogleMapActions.updateLatLng = jest.genMockFunction().mockReturnValue(0, "Bangalore")
    })

    beforeEach(() => {
        props = {
            closeEditModal: jest.fn()
        }
        Object.defineProperty(window, "matchMedia", {
            value: jest.fn(() => { return { matches: true } })
        });

        googleMapMount = mount(<GoogleMaps />);
        googleMapWrap = googleMapMount.find('GoogleMaps').getNode();
        googleMapWrap.invalidlocation();
        googleMapWrap.wrongauthentication();
        googleMapWrap.duplicateMarkerFound();
        googleMapWrap.handleSubmitForm();
        googleMapWrap.setState = jest.fn();
        googleMapWrap.openModal();
        googleMapWrap.setState({ modalIsOpen: true });

        googleMapWrap.closeModal();
        googleMapWrap.setState({ modalIsOpen: false });

        googleMapWrap.closeEditModal();
        googleMapWrap.setState({ modalEditOpen: false });

    });

    afterEach(() => {
        googleMapMount.unmount();
    });

    it('Error test', () => {
        googleMapWrap.error();
    });

    it('handleEditForm test', () => {
        googleMapWrap.handleEditForm();
    });

    it('handleEditChange test', () => {
        const mockedEvent = { target: { value: "A", id: "0-BERLIN" }, preventDefault: () => { } };
        googleMapWrap.setState = jest.fn();
        googleMapWrap.handleEditChange(mockedEvent);
        googleMapWrap.setState({ locationName: mockedEvent.value });
        googleMapWrap.setState({ markerIndex: mockedEvent.id });
    });

    it('deleteMarker test', () => {
        const mockedEvent = { target: { value: "A", id: "0-BERLIN" }, preventDefault: () => { } };
        googleMapWrap.setState = jest.fn();
        googleMapWrap.deleteMarker(mockedEvent);

    });

    it('editMarker test', () => {
        const mockedEvent = { target: { value: "A", id: "0-BERLIN" }, preventDefault: () => { } };
        googleMapWrap.setState = jest.fn();
        googleMapWrap.editMarker(mockedEvent);
        googleMapWrap.setState({ modalEditOpen: true });
        googleMapWrap.setState({ locationName: mockedEvent.id });
        googleMapWrap.setState({ markerIndex: mockedEvent.id });

    });

    it('pushMarkerToMap test', () => {
        googleMapWrap.setState = jest.fn();
        googleMapWrap.pushMarkerToMap();
        googleMapWrap.setState({ modalIsOpen: false });
        googleMapWrap.setState({ modalEditOpen: false });
    });

    it('handleInputChange test', () => {
        const mockedEvent = { target: { value: "A", id: "0-BERLIN" }, preventDefault: () => { } };
        googleMapWrap.setState = jest.fn();
        googleMapWrap.handleInputChange(mockedEvent);
        googleMapWrap.setState({
            formData: [{
                lat: "56.36",
                lng: "36.65"
            }]
        });
    });
});
