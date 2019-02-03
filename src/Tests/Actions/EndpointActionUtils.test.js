// use __mocks__/superagent.js instead of the real superagent library
jest.mock('superagent');
//import PeopleStore from '../../Stores/PeopleStore';
import EndpointActionUtils from '../../Actions/EndpointActionUtils.js';
import AppDispatcher from '../../Dispatchers/AppDispatcher.js';
//import ApplicationStores from '../../Stores/ApplicationStore' ;
import AuthStore from '../../Stores/AuthStore';
//import EndpUtils from '../../Actions/EndpointActionUtils';
import sinon from 'sinon';
import moment from 'moment';

describe("EndpointActionUtils tests", function () {

	it('response for validateRequestString', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockResponse({
			body: {
				string:'abc'
			}
		});		
		
			let dataString ='abc';
		//EndpUtils.validateRequestString = jest.genMockFunction().mockReturnValue(dataString);
		EndpointActionUtils.validateRequestString(dataString);
		
	});	
// ahbxError is not null
	it('response for handles error by dispatching flux event', () => {
		let eventSpy = sinon.spy();
		// let response = require('superagent');
		// require('superagent').__setMockResponse({
		// 	body: {
		// 		err:405
		// 	}
		// });		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'SERVER_ERROR') {
				eventSpy(payload.action.payload);
			}
		});
	let code = {
			errorCode:'204',
			errorNumber:121,
			id:err
		}
		let resp = {
			body:{
				ahbxError:'x'
			}
		}
		let ahbxerror='406';
		 let err = '204';
		EndpointActionUtils.handleError(resp, 1);
		expect(eventSpy.called).toBe(true);
		dispatch('SERVER_ERROR', code);
		AppDispatcher.unregister(dispatchListener);
	});	
//handleError ahbxError is null
it('handles success response for getPayloadValue(response.body, ahbxError apPlication by dispatching flux event', () => {
			let eventSpy = sinon.spy();
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'SERVER_ERROR') {
				eventSpy(payload.action.payload);
			}
		});
		let err = '204';
		//EndpointActionUtils.getPayloadValue = jest.genMockFunction().mockReturnValue(ahbxerror);		
		
		
		let code = {
			errorCode:'204',
			errorNumber:121,
			id:err
		}
		let resp = {
			body:{
				ahbxError:null,
				responseCode:'406',
				messages:{
					description:'hi'
				}
			}
		}
		// let process=require('process');
		// process.env.appConfig='vpn';
		EndpointActionUtils.handleError(resp);
		expect(eventSpy.called).toBe(true);		
		dispatch('SERVER_ERROR', code);
		AppDispatcher.unregister(dispatchListener);
	});	

// covering process
it('handles success response for getPayloadValue(response.body, ahbxError apPlication by dispatching flux event', () => {
			let eventSpy = sinon.spy();
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'SERVER_ERROR') {
				eventSpy(payload.action.payload);
			}
		});
		let resp = {
			body:{
				ahbxError:null,
				responseCode:'406',
				messages:{
					description:'hi'
				}
			}
		}
		let process=require('process');
		process.env.appConfig='vpn';
        EndpointActionUtils.handleError(resp);
        EndpointActionUtils.boolToString();
        EndpointActionUtils.momentToDateString();
	});	

});

let dispatch = (actionType, payload) => {
	AppDispatcher.dispatch({
		action: {
			type:    actionType,
			payload: payload
		}
	});
};

var data = {
		agreeToConsent: true,
		applicationDate: null,		
		applicationSource: 'EMAIL',
		pendingAppId:null,
		enrollmentYear:2017,
		string:'abc',
		appConfig:'development',
		dataString:true
	};

	var dataAppId = {
		appId:'21221'
	};

	