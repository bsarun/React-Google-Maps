import AppDispatcher from '../../Dispatchers/AppDispatcher';
import ConfigStore from '../../Stores/ConfigStore';
import sinon from 'sinon';
const EndpointUtils = jest.mock('../../Actions/EndpointActionUtils');
import GoogleMapActions from '../../Actions/GoogleMapActions.js';


describe("Google Map Actions Tests", function () {

	it('Test : deleteIndividualMarker', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockResponse({
			body: {
				longt: '77.60979',
				latt: "12.96783",
				locationName: "Bangalore"
			}
		});

		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'DELETE_MARKER') {
				eventSpy(payload.action.payload);
			}
		});

		expect(eventSpy.called).toBe(false);
		GoogleMapActions.deleteIndividualMarker(0);
		dispatch('DELETE_MARKER', 0);
		AppDispatcher.unregister(dispatchListener);

	});


	it('Test : getLatLng - NEW_MARKER', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockResponse({
			body: {
				longt: '77.60979',
				latt: "12.96783",
				locationName: "Bangalore"
			}
		});

		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'NEW_MARKER') {
				eventSpy(payload.action.payload);
			}
		});

		var data = {
			"longt": "77.60979",
			"latt": "12.96783"
		}

		expect(eventSpy.called).toBe(false);
		dispatch('NEW_MARKER', data);
		GoogleMapActions.getLatLng('Bangalore');
		AppDispatcher.unregister(dispatchListener);

	});



	it('Test : getLatLng - INVALID_LOCATION', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockResponse({
			body: {
				error: {
					code: "008"
				}
			}
		});

		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'INVALID_LOCATION') {
				eventSpy(payload.action.payload);
			}
		});

		expect(eventSpy.called).toBe(false);
		dispatch('INVALID_LOCATION', null);
		GoogleMapActions.getLatLng('Bangalore');
		AppDispatcher.unregister(dispatchListener);

	});


	it('Test : getLatLng - WRONG_AUTHENTICATION', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockResponse({
			body: {
				error: {
					code: "003"
				}
			}
		});

		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'WRONG_AUTHENTICATION') {
				eventSpy(payload.action.payload);
			}
		});

		expect(eventSpy.called).toBe(false);
		dispatch('WRONG_AUTHENTICATION', null);
		GoogleMapActions.getLatLng('Bangalore');
		AppDispatcher.unregister(dispatchListener);

	});


	it('Test : getLatLng - ERROR', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockResponse({
			body: {
				err: '12121'
			}
		});

		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'ERROR') {
				eventSpy(payload.action.payload);
			}
		});

		expect(eventSpy.called).toBe(false);
		dispatch('ERROR', null);
		GoogleMapActions.getLatLng('Bangalore');
		AppDispatcher.unregister(dispatchListener);

	});







	it('Test : updateLatLng - UPDATE_MARKER', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockResponse({
			body: {
				longt: '77.60979',
				latt: "12.96783",
				locationName: "Bangalore"
			}
		});

		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'UPDATE_MARKER') {
				eventSpy(payload.action.payload);
			}
		});

		var data = {
			"longt": "77.60979",
			"latt": "12.96783",
			"i": 0
		}

		expect(eventSpy.called).toBe(false);
		GoogleMapActions.updateLatLng(0, 'Bangalore');
		dispatch('UPDATE_MARKER', data);
		AppDispatcher.unregister(dispatchListener);

	});


	it('Test : updateLatLng - INVALID_LOCATION', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockResponse({
			body: {
				error: {
					code: "008"
				}
			}
		});

		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'INVALID_LOCATION') {
				eventSpy(payload.action.payload);
			}
		});

		expect(eventSpy.called).toBe(false);
		dispatch('INVALID_LOCATION', null);
		GoogleMapActions.updateLatLng(0, 'Bangalore');
		AppDispatcher.unregister(dispatchListener);

	});


	it('Test : updateLatLng - WRONG_AUTHENTICATION', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockResponse({
			body: {
				error: {
					code: "003"
				}
			}
		});

		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'WRONG_AUTHENTICATION') {
				eventSpy(payload.action.payload);
			}
		});

		expect(eventSpy.called).toBe(false);
		dispatch('WRONG_AUTHENTICATION', null);
		GoogleMapActions.updateLatLng(0, 'Bangalore');
		AppDispatcher.unregister(dispatchListener);

	});



});

let dispatch = (actionType, payload) => {
	AppDispatcher.dispatch({
		action: {
			type: actionType,
			payload: payload
		}
	});
};

