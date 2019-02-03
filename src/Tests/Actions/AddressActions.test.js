import AppDispatcher from '../../Dispatchers/AppDispatcher';
import AuthStore from '../../Stores/AuthStore';
import ConfigStore from '../../Stores/ConfigStore';
//import ApplicationStore from '../../Stores/ApplicationStore';
import request from 'superagent';
import sinon from 'sinon';
//import { deepGet, deepSetObj } from '../../Components/Forms/FormHOC.jsx';
import AddressActions  from '../../Actions/AddressActions.js';
// use __mocks__/superagent.js instead of the real superagent library
jest.mock('superagent');
const EndpointUtils = jest.mock('../../Actions/EndpointActionUtils');

//const PeopleStore = jest.mock('../../Stores/PeopleStore');
const endpointBaseURL = ConfigStore.getURL('apiEndpointApplicationBaseURL');
const endpointHomeServiceBaseURL = ConfigStore.getURL('apiEndpointUserHomeBaseURL');
const endpointApplicationBaseURLWithAlt = ConfigStore.getURL('apiEndpointApplicationBaseURLWithAlt');



describe("Address Action test", function () {

	it('lookupZipcode---ZIPCODE_LOOKUP_MULTIPLE_COUNTIES', () => {
		let eventSpy = sinon.spy();
		
		require('superagent').__setMockResponse({
			body: {
				zipCode:'2222',
				calZipCode:true,
			    counties:['abc','def','fgh','ijk']
			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'ZIPCODE_LOOKUP_MULTIPLE_COUNTIES') {
				eventSpy(payload.action.payload);
			}
		});
		AddressActions.lookupZipcode(1,'2222');
		expect(eventSpy.called).toBe(false);
		dispatch('ZIPCODE_LOOKUP_MULTIPLE_COUNTIES', null);
		AppDispatcher.unregister(dispatchListener);
		
    });	

	
    it('lookupZipcode---ZIPCODE_LOOKUP_SINGLE_COUNTY', () => {
		let eventSpy = sinon.spy();
		let counties=['abc','def','fgh','ijk'];
		let calZipCode=true; 
		require('superagent').__setMockResponse({
			body: {
				zipCode:'2222',
				calZipCode:true,
			    counties:['abc']
			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'ZIPCODE_LOOKUP_SINGLE_COUNTY') {
				eventSpy(payload.action.payload);
			}
		});
		AddressActions.lookupZipcode(1,'2222');
		expect(eventSpy.called).toBe(false);
		dispatch('ZIPCODE_LOOKUP_SINGLE_COUNTY', null);
		AppDispatcher.unregister(dispatchListener);
    });	

    it('lookupZipcode---ZIPCODE_LOOKUP_INVALID_CA', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockResponse({
			body: {
				zipCode:'2222',
				calZipCode:false,
			    counties:['abc','def','fgh','ijk']
			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'ZIPCODE_LOOKUP_INVALID_CA') {
				eventSpy(payload.action.payload);
			}
		});
		AddressActions.lookupZipcode(1,'2222');
		expect(eventSpy.called).toBe(false);
		dispatch('ZIPCODE_LOOKUP_INVALID_CA', null);
		AppDispatcher.unregister(dispatchListener);
    });
    
     it('lookupZipcode---ZIPCODE_LOOKUP_NO_COUNTY_FOUND', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockResponse({
			body: {
				zipCode:'2222',
			    calZipCode:true,
			    counties:'0'
			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'ZIPCODE_LOOKUP_NO_COUNTY_FOUND') {
				eventSpy(payload.action.payload);
			}
		});
		AddressActions.lookupZipcode(1,'2222');
		expect(eventSpy.called).toBe(true);
		dispatch('ZIPCODE_LOOKUP_NO_COUNTY_FOUND', null);
		AppDispatcher.unregister(dispatchListener);
	});
	
	it('handles error lookupZipcode', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockError({
			body: {
				err:'12121'
			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'ZIPCODE_LOOKUP_MULTIPLE_COUNTIES') {
				eventSpy(payload.action.payload);
			}
		});
		AddressActions.lookupZipcode(1,'2222');
		expect(eventSpy.called).toBe(false);
		dispatch('ZIPCODE_LOOKUP_MULTIPLE_COUNTIES', null);
		AppDispatcher.unregister(dispatchListener);
	});

      it('confirmAddress---Bannercode as G,ADDRESS_CONFIRMATION_SUCCESS', () => {
		let eventSpy = sinon.spy();
		let Address = {
			city:'NY',
			state:'LA',
			streetAddress1:'No.23,2nd Street,Lane 1',
			zipCode:'1234'
		};
		require('superagent').__setMockResponse({
			body: {
			bannerCode:'G'
			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'ADDRESS_CONFIRMATION_SUCCESS') {
				eventSpy(payload.action.payload);
			}
		});
		process.env.appConfig ='development';
		let tokenId = "545r5e45er4e5r.erereere";
		AuthStore.loggedIn = jest.genMockFunction().mockReturnValue(true);
		AuthStore.getToken = jest.genMockFunction().mockReturnValue('545r5e45er4e5r.erereere');
		let pendingAppId = "12345";
		AddressActions.pendingAppId = jest.genMockFunction().mockReturnValue(pendingAppId);
		AddressActions.confirmAddress('1',Address);
		expect(eventSpy.called).toBe(true);
		dispatch('ADDRESS_CONFIRMATION_SUCCESS',null);
		AppDispatcher.unregister(dispatchListener);
    });

      it('confirmAddress---Bannercode as Y,ADDRESS_CONFIRMATION_RESPONSE', () => {
		let eventSpy = sinon.spy();
		let Address = {
			city:'NY',
			state:'LA',
			streetAddress1:'No.23,2nd Street,Lane 1',
			zipCode:'1234'
		};
		require('superagent').__setMockResponse({
			body: {
			bannerCode:'Y'
			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'ADDRESS_CONFIRMATION_RESPONSE') {
				eventSpy(payload.action.payload);
			}
		});
		process.env.appConfig ='development';
		let tokenId = "545r5e45er4e5r.erereere";
		AuthStore.loggedIn = jest.genMockFunction().mockReturnValue(true);
		AuthStore.getToken = jest.genMockFunction().mockReturnValue('545r5e45er4e5r.erereere');
		let pendingAppId = "12345";
		AddressActions.pendingAppId = jest.genMockFunction().mockReturnValue(pendingAppId);
		AddressActions.confirmAddress('1',Address);
		expect(eventSpy.called).toBe(true);
		dispatch('ADDRESS_CONFIRMATION_RESPONSE',null);
		AppDispatcher.unregister(dispatchListener);
    });

	 it('confirmAddress---Bannercode as R,ADDRESS_CONFIRMATION_RESPONSE', () => {
		let eventSpy = sinon.spy();
		let Address = {
			city:'NY',
			state:'LA',
			streetAddress1:'No.23,2nd Street,Lane 1',
			zipCode:'1234'
		};
		require('superagent').__setMockResponse({
			body: {
			bannerCode:'R'
			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'ADDRESS_CONFIRMATION_RESPONSE') {
				eventSpy(payload.action.payload);
			}
		});
		process.env.appConfig ='development';
		let tokenId = "545r5e45er4e5r.erereere";
		AuthStore.loggedIn = jest.genMockFunction().mockReturnValue(true);
		AuthStore.getToken = jest.genMockFunction().mockReturnValue('545r5e45er4e5r.erereere');
		let pendingAppId = "12345";
		AddressActions.pendingAppId = jest.genMockFunction().mockReturnValue(pendingAppId);
		AddressActions.confirmAddress('1',Address);
		expect(eventSpy.called).toBe(true);
		dispatch('ADDRESS_CONFIRMATION_RESPONSE',null);
		AppDispatcher.unregister(dispatchListener);
    });

		 it('confirmAddress---Error Handle', () => {
		let eventSpy = sinon.spy();
		let Address = {
			city:'NY',
			state:'LA',
			streetAddress1:'No.23,2nd Street,Lane 1',
			zipCode:'1234'
			
		};
		require('superagent').__setMockError({
			body: {
			err:'12121'
			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'ADDRESS_CONFIRMATION_RESPONSE') {
				eventSpy(payload.action.payload);
			}
		});
	
		let tokenId = "545r5e45er4e5r.erereere";
		AuthStore.loggedIn = jest.genMockFunction().mockReturnValue(true);
		AuthStore.getToken = jest.genMockFunction().mockReturnValue('545r5e45er4e5r.erereere');
		let pendingAppId = "12345";
		AddressActions.pendingAppId = jest.genMockFunction().mockReturnValue(pendingAppId);
		AddressActions.confirmAddress('1',Address);
		expect(eventSpy.called).toBe(true);
		dispatch('ADDRESS_CONFIRMATION_RESPONSE',null);
		AppDispatcher.unregister(dispatchListener);
    });

	 it('confirmAddress---Bannercode Default Case when StreetAddress1 is qamulti', () => {
		let eventSpy = sinon.spy();
		let Address = {
			city:'NY',
			state:'LA',
			streetAddress1:"qamulti",
			zipCode:'1234'
		};
		require('superagent').__setMockResponse({
			body: {
			bannerCode:'X'
			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'ADDRESS_CONFIRMATION_RESPONSE') {
				eventSpy(payload.action.payload);
			}
		});
	
		let tokenId = "545r5e45er4e5r.erereere";
		process.env.appConfig = 'development';
		AuthStore.loggedIn = jest.genMockFunction().mockReturnValue(true);
		AuthStore.getToken = jest.genMockFunction().mockReturnValue('545r5e45er4e5r.erereere');
		let pendingAppId = "12345";
		AddressActions.pendingAppId = jest.genMockFunction().mockReturnValue(pendingAppId);
		AddressActions.confirmAddress('1',Address);
		expect(eventSpy.called).toBe(false);
		dispatch('ADDRESS_CONFIRMATION_RESPONSE',null);
		AppDispatcher.unregister(dispatchListener);
	});
	
	
	 it('confirmAddress---Bannercode Default Case when StreetAddress1 is qasingle', () => {
		let eventSpy = sinon.spy();
		let Address = {
			city:'NY',
			state:'LA',
			streetAddress1:"qasingle",
			zipCode:'1234'
		};
		require('superagent').__setMockResponse({
			body: {
			bannerCode:'X'
			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'ADDRESS_CONFIRMATION_SUCCESS') {
				eventSpy(payload.action.payload);
			}
		});
	
		let tokenId = "545r5e45er4e5r.erereere";
		process.env.appConfig = 'development';
		AuthStore.loggedIn = jest.genMockFunction().mockReturnValue(true);
		AuthStore.getToken = jest.genMockFunction().mockReturnValue('545r5e45er4e5r.erereere');
		let pendingAppId = "12345";
		AddressActions.pendingAppId = jest.genMockFunction().mockReturnValue(pendingAppId);
		AddressActions.confirmAddress('1',Address);
		expect(eventSpy.called).toBe(false);
		dispatch('ADDRESS_CONFIRMATION_SUCCESS',null);
		AppDispatcher.unregister(dispatchListener);
	});

	 it('confirmAddress---Bannercode Default Case when StreetAddress1 is qanomatch', () => {
		let eventSpy = sinon.spy();
		let Address = {
			city:'NY',
			state:'LA',
			streetAddress1:"qanomatch",
			zipCode:'1234'
		};
		require('superagent').__setMockResponse({
			body: {
			bannerCode:'X'
			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'ADDRESS_CONFIRMATION_RESPONSE') {
				eventSpy(payload.action.payload);
			}
		});
	
		let tokenId = "545r5e45er4e5r.erereere";
		process.env.appConfig = 'development';
		AuthStore.loggedIn = jest.genMockFunction().mockReturnValue(true);
		AuthStore.getToken = jest.genMockFunction().mockReturnValue('545r5e45er4e5r.erereere');
		let pendingAppId = "12345";
		AddressActions.pendingAppId = jest.genMockFunction().mockReturnValue(pendingAppId);
		AddressActions.confirmAddress('1',Address);
		expect(eventSpy.called).toBe(false);
		dispatch('ADDRESS_CONFIRMATION_RESPONSE',null);
		AppDispatcher.unregister(dispatchListener);
	});


          it('selectConfirmedAddress---ADDRESS_CONFIRMATION_SELECTION', () => {
		let eventSpy = sinon.spy();
		let Address = {
			city:'NY',
			state:'LA',
			streetAddress1:'No.23,2nd Street,Lane 1',
			zipCode:'1234'
		};
	
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'ADDRESS_CONFIRMATION_SELECTION') {
				eventSpy(payload.action.payload);
			}
		});
	
		let tokenId = "545r5e45er4e5r.erereere";
		AuthStore.loggedIn = jest.genMockFunction().mockReturnValue(true);
		AuthStore.getToken = jest.genMockFunction().mockReturnValue('545r5e45er4e5r.erereere');
		let pendingAppId = "12345";
		AddressActions.pendingAppId = jest.genMockFunction().mockReturnValue(pendingAppId);
		AddressActions.selectConfirmedAddress('1',Address);
		expect(eventSpy.called).toBe(true);
		dispatch('ADDRESS_CONFIRMATION_SELECTION',null);
		AppDispatcher.unregister(dispatchListener);
    });

            it('validateCaliforniaZipcode---ZIPCODE_VALID_CA', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockResponse({
			body: {
				isValidZipCode:false
			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'ZIPCODE_VALID_CA') {
				eventSpy(payload.action.payload);
			}
		});
	
		let tokenId = "545r5e45er4e5r.erereere";
		process.env.appConfig ='development';
		AuthStore.loggedIn = jest.genMockFunction().mockReturnValue(true);
		AuthStore.getToken = jest.genMockFunction().mockReturnValue('545r5e45er4e5r.erereere');
		let pendingAppId = "12345";
		AddressActions.pendingAppId = jest.genMockFunction().mockReturnValue(pendingAppId);
		AddressActions.validateCaliforniaZipcode('1','11111');
		expect(eventSpy.called).toBe(true);
		dispatch('ZIPCODE_VALID_CA',null);
		AppDispatcher.unregister(dispatchListener);
	});
	
	            it('validateCaliforniaZipcode---ZIPCODE_INVALID_CA', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockResponse({
			body: {
				isValidZipCode:false
			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'ZIPCODE_INVALID_CA') {
				eventSpy(payload.action.payload);
			}
		});
	
		let tokenId = "545r5e45er4e5r.erereere";
		process.env.appConfig ='development';
		AuthStore.loggedIn = jest.genMockFunction().mockReturnValue(true);
		AuthStore.getToken = jest.genMockFunction().mockReturnValue('545r5e45er4e5r.erereere');
		let pendingAppId = "12345";
		AddressActions.pendingAppId = jest.genMockFunction().mockReturnValue(pendingAppId);
		AddressActions.validateCaliforniaZipcode('1','324234');
		expect(eventSpy.called).toBe(true);
		dispatch('ZIPCODE_INVALID_CA',null);
		AppDispatcher.unregister(dispatchListener);
    });

	 it('validateCaliforniaZipcode---Error Handle', () => {
		let eventSpy = sinon.spy();
			require('superagent').__setMockError({
			body: {
			err:'12121'
			}
		});	
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'ZIPCODE_INVALID_CA') {
				eventSpy(payload.action.payload);
			}
		});
		AddressActions.validateCaliforniaZipcode('1','324234');
		expect(eventSpy.called).toBe(true);
		dispatch('ZIPCODE_INVALID_CA',null);
		AppDispatcher.unregister(dispatchListener);
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

 