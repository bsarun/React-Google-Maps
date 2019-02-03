import AppDispatcher from '../../Dispatchers/AppDispatcher';
import AuthStore from '../../Stores/AuthStore';
import ConfigStore from '../../Stores/ConfigStore';
import request from 'superagent';
import sinon from 'sinon';
//import request from 'superagent';
import uuidv4 from 'uuid/v4';
import EndpointUtils from '../../Actions/EndpointActionUtils';
import moment from '../../TimeshifterMoment.js';
import { range } from 'lodash';
import ScreeningQuestionsAction from '../../Actions/ScreeningQuestionsActions'


describe(" ScreeningQuestionActions tests", function () {

//saveCreateAccount
it('1  AccountActions for saveCreateAccount', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockResponse({
			body: {
				 dob: "07/10/1987",
                  accountAddress: 'dfds',
                  termsAndConditions: false,
                  phone:'7878888834',
                  email2: 'asds',
				  ssn: 'dfg',
				  firstName: 'shan',
				  lastName: 'm ',
				  prefModeOfComm: 'dfd'	,
				  username: 'shanmuga',
				  password: 'fdsf'
			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'CREATE_ACCOUNT_SAVE') {
				eventSpy(payload.action.payload);
			}
		});
	
		// let tokenId = "545r5e45er4e5r.erereere";
		// AuthStore.loggedIn = jest.genMockFunction().mockReturnValue(true);
		// AuthStore.getToken = jest.genMockFunction().mockReturnValue('545r5e45er4e5r.erereere');
		// let accountAddress = 'dfds';
		ScreeningQuestionsAction.gidirection = jest.genMockFunction().mockReturnValue(ScreeningQuestionsAction);
        ScreeningQuestionsAction.gidirection(data);
        ScreeningQuestionsAction.getBacktheData();
		expect(eventSpy.called).toBe(false);
		dispatch('GET_DATA', data);
		AppDispatcher.unregister(dispatchListener);
    });	

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
		ScreeningQuestionsAction.lookupZipcode(1,'2222');
		expect(eventSpy.called).toBe(true);
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
		ScreeningQuestionsAction.lookupZipcode(1,'2222');
		expect(eventSpy.called).toBe(true);
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
		ScreeningQuestionsAction.lookupZipcode(1,'2222');
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
			    counties:[]
			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'ZIPCODE_LOOKUP_NO_COUNTY_FOUND') {
				eventSpy(payload.action.payload);
			}
		});
		ScreeningQuestionsAction.lookupZipcode(1,'2222');
		expect(eventSpy.called).toBe(false);
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
        ScreeningQuestionsAction.lookupZipcode(1,'2222');
        
		expect(eventSpy.called).toBe(false);
		dispatch('ZIPCODE_LOOKUP_MULTIPLE_COUNTIES', null);
		AppDispatcher.unregister(dispatchListener);
    });
    
    it('handles error SAVE_PAYLOAD_DATA', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockError({
			body: {
				"enrollYears": ["2017","2018"],
				"zip": "95814",
				"income": 23405.45,
				"county": ["Stanislaus", "LosAngeles"],
				"members": [
					{
						"coverage": false,
						"age-1": 23,
						"pregnant": false,
						"blindOrDisabled": false,
						"eligibilities": [
							"magiMedical"
						]
					}
				]
			}
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'SAVE_PAYLOAD_DATA') {
				eventSpy(payload.action.payload);
			}
		});
		let data = {
			"enrollYear": "2018",
			"zip": "95814",
			"income": 23405.45,
			"county": ["Stanislaus", "LosAngeles"],
			"members": [
				{
					"coverage": false,
					"age-1": 23,
					"pregnant": false,
					"blindOrDisabled": false,
					"eligibilities": [
						"magiMedical"
					]
				},
				{
					"coverage": false,
					"age-2": 56,
					"pregnant": false,
					"blindOrDisabled": false,
					"eligibilities": [
						"magiMedical",
						"subsidized"
					]
				},
				{
					"coverage": true,
					"age-3": 77,
					"pregnant": false,
					"blindOrDisabled": false,
					"eligibilities": [
						"costshare"
					]
				},
				{
					"coverage": true,
					"age": 24,
					"pregnant": true,
					"blindOrDisabled": false,
					"eligibilities": [
						"unsubsidized"
					]
				},
				{
					"coverage": true,
					"age": 99,
					"pregnant": true,
					"blindOrDisabled": false,
					"eligibilities": [
						"mcap"
					]
				},
				{
					"coverage": true,
					"age": 76,
					"pregnant": true,
					"blindOrDisabled": false,
					"eligibilities": [
						"cchip"
					]
				},
				{
					"coverage": true,
					"age": 65,
					"pregnant": true,
					"blindOrDisabled": false,
					"eligibilities": [
						"nonMagiMedical"
					]
				}
			],
			"csrLevel": null,
			"maxAPTCAmount": 234.56
		}
        ScreeningQuestionsAction.screeningPayload(data);
        
		expect(eventSpy.called).toBe(false);
		dispatch('SAVE_PAYLOAD_DATA', null);
		AppDispatcher.unregister(dispatchListener);
    });
    
    it('handles error COVERAGE_ENDPOINT', () => {
		let eventSpy = sinon.spy();
		require('superagent').__setMockError({
			body: {"enrollYears":["2015","2016","2017","2018"]}
			
		});		
		let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'COVERAGE_ENDPOINT') {
				eventSpy(payload.action.payload);
			}
		});

        ScreeningQuestionsAction.getCoverageYear();
        
		expect(eventSpy.called).toBe(false);
		dispatch('COVERAGE_ENDPOINT', null);
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


	var data = {	  dob: "07/10/1987",
                  accountAddress: 'dfds',
                  termsAndConditions: false,
                  phone:'7878888834',
                  email2: 'asds',
				  ssn: 'dfg',
				  lastName: 'm ',
				  prefModeOfComm: 'dfd'	,
				  username: 'shanmuga',
				  password: 'fdsf',
				   message:{
								description:'ACCOUNT_NOT_FOUND'
						},
						  
						  process:{
								  env:{
									  appConfig:'test'
									  }
								  }	
	};












