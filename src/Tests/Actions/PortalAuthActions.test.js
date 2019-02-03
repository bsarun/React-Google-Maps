import React from 'react';
import renderer from 'react-test-renderer';
import PortalAuthAction from '../../Actions/PortalAuthActions.js';
import {IntlProvider,addLocationData } from 'react-intl';
import { shallow } from 'enzyme';
import AppDispatcher from '../../Dispatchers/AppDispatcher';
import sinon from 'sinon';
import ConfigStore from '../../Stores/ConfigStore';
import AuthStore from '../../Stores/AuthStore';
//import ApplicationStore from '../../Stores/ApplicationStore' ;
import PortalAuthActions from '../../Actions/PortalAuthActions';
import NavActions from '../../Actions/NavActions';

//jest.mock('../../Actions/PortalAuthActions');


describe("PortalAuthActions tests", function () {
	it('refreshAuthToken for PortalAuthActions ', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockResponse({
			status:200,
			body: {
				agreeToConsent: false,
				applicationDate: '2017-07-31T00:00:00.000',
				applicationSource: "EMAIL",
				pendingAppId: "1234",
				zipCode:4555454,
				timeshifterEnabledForUser:'true',
				timeshifterOffsetMillis:'00.11',
       			shiftedDateMillisFromEpoch:'11.22',
				status:200

			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'TIMESHIFTER_REFRESH_FROM_SERVER') {
				eventSpy(payload.action.payload);
			}
		});
	let timeshifterPayload = {
							timeshifterEnabledForUser : true,
							timeshifterOffsetMillis : '00.11',
							shiftedDateMillisFromEpoch : '11.22'
						};
		let process=require('process');
		process.env.appConfig='development';
		let tokenId = "545r5e45er4e5r.erereere";
		AuthStore.loggedIn = jest.genMockFunction().mockReturnValue(true);
		AuthStore.on = jest.genMockFunction().mockReturnValue('change');
		AuthStore.getToken = jest.genMockFunction().mockReturnValue('545r5e45er4e5r.erereere');
		let pendingAppId = "12345";
		//ApplicationStore.getPendingAppId = jest.genMockFunction().mockReturnValue(pendingAppId);
		PortalAuthAction.refreshAuthToken();
		expect(eventSpy.called).toEqual(true);
		dispatch('TIMESHIFTER_REFRESH_FROM_SERVER',timeshifterPayload);
		expect(timeshifterPayload.timeshifterEnabledForUser == true);
		expect(timeshifterPayload.timeshifterOffsetMillis).toEqual('00.11');
		expect(timeshifterPayload.timeshifterEnabledForUser).toEqual(true);
		AppDispatcher.unregister(dispatchListener);
  });

//AUTH_TOKEN_REFRESH_FROM_SERVER
	it('refreshAuthToken for AUTH_TOKEN_REFRESH_FROM_SERVER ', () => {
		let eventSpy = sinon.spy();
		let response=require('superagent');
		response.__setMockResponse({
			status:200,
			body: {
				agreeToConsent: false,
				applicationDate: '2017-07-31T00:00:00.000',
				applicationSource: "EMAIL", 
				pendingAppId: "1234",
				zipCode:4555454,
        		encodedToken:'uiuiouiouiouiouiouiou.sdsd'
			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'AUTH_TOKEN_REFRESH_FROM_SERVER') {
				eventSpy(payload.action.payload);
			}
		});
	
		let tokenId = "545r5e45er4e5r.erereere";
		AuthStore.loggedIn = jest.genMockFunction().mockReturnValue(true);
		AuthStore.on = jest.genMockFunction().mockReturnValue('change');
		AuthStore.getToken = jest.genMockFunction().mockReturnValue('545r5e45er4e5r.erereere');
    AuthStore.login = jest.genMockFunction().mockReturnValue(data);
    AuthStore.parseJwt = jest.genMockFunction().mockReturnValue('545r5e45er4e5r.erereere');
		let pendingAppId = "12345";
		//ApplicationStore.getPendingAppId = jest.genMockFunction().mockReturnValue(pendingAppId);
		PortalAuthAction.refreshAuthToken();
		expect(eventSpy.called).toEqual(true);
		dispatch('AUTH_TOKEN_REFRESH_FROM_SERVER', response.encodedToken);
		AppDispatcher.unregister(dispatchListener);
  });
  //refresh refreshPortalSession
  it('PORTAL_SESSION_REFRESH for PortalAuthActions ', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockResponse({
			status:200,
			
		});	
		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'PORTAL_SESSION_REFRESH') {
				eventSpy(payload.action.payload);
			}
		});
	
			let tokenId = "545r5e45er4e5r.erereere";
		AuthStore.loggedIn = jest.genMockFunction().mockReturnValue(true);
		AuthStore.on = jest.genMockFunction().mockReturnValue('change');
		AuthStore.getToken = jest.genMockFunction().mockReturnValue('545r5e45er4e5r.erereere');
		let pendingAppId = "12345";
		//ApplicationStore.getPendingAppId = jest.genMockFunction().mockReturnValue(pendingAppId);
		PortalAuthAction.refreshPortalSession();
		expect(eventSpy.called).toEqual(true);
		dispatch('PORTAL_SESSION_REFRESH');
		AppDispatcher.unregister(dispatchListener);
  });

   
  //for OTHER_ERROR refreshPortalSession
	it('refreshPortalSession redirects to anonymous page on error', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockError({
			body: {
				err: '500 Server Error'
			}
		});		
		let orig = NavActions.reloadAppAtURL;
		NavActions.reloadAppAtURL = jest.fn();
		PortalAuthAction.refreshPortalSession();
		expect(NavActions.reloadAppAtURL).toBeCalledWith('portalAnonymousURL');
		NavActions.reloadAppAtURL = orig;
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
		personId:12345,
		enrollmentYear:2017,
		zipCode:11111,
		appConfig:'development',
				status:200,
    claim:{
      roles:{roleName:'dfd'},
      additionalClaims:{pendingAppId:1212,personId:1212121}
    },
		agreeToConsent: false,
	  	applicationDate: '2017-07-31T00:00:00.000',
	  	applicationSource: "EMAIL",
        encodedToken:'uiuiouiouiouiouiouiou.sdsd',
         timeshifterPayload : {
							timeshifterEnabledForUser : '1222',
							timeshifterOffsetMillis : 33333,
							shiftedDateMillisFromEpoch : 444444
						},
		persons:[{
					personId:123,
					age:30,
					dob:'12-07-1988',
					addressList:'bang',
					citizenship:'indian',
					incomes:'35000',

				}]
	};
