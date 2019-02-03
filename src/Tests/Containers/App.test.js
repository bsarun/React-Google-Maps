import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../Containers/App.jsx';
import { IntlProvider } from 'react-intl';
import i18n from '../../i18n.en.json';
import PortalAuthActions from '../../Actions/PortalAuthActions';
import ConfigStore from '../../Stores/ConfigStore';
import AppDispatcher from '../../Dispatchers/AppDispatcher.js';
import LayoutStore from '../../Stores/LayoutStore';
import NavActions from '../../Actions/NavActions.js';
import sinon from 'sinon';
import AuthStore from '../../Stores/AuthStore'
import { shallow, compile, mount } from 'enzyme';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';


let props,portalAuthActions,householdMembersObj,wrapper,dispatch;
describe('App', () => {
	beforeEach(() => {
		props = {
			location: { pathname: 'Tax-Review', query: {pendingAppId: 999999,appIdGetParam:'param'}},
			intl: {
				doesMessageExist : jest.genMockFunction().mockReturnValue('545r5e45er4e5r.erereere'),
				messageIfExists : jest.genMockFunction().mockReturnValue('545r5e45er4e5r.erereere')
			},
			applicationDetails:{
				primaryContactName:"test",
				applicationId:123456,
				caseId:1234
			},
			documentHeaderNeedsFocus:true
		} 
		process.env.appConfig = "development";
		Object.defineProperty(window, "matchMedia", {
			value: ''
		});

		jest.mock('../../Actions/PortalAuthActions');
		portalAuthActions = require('../../Actions/PortalAuthActions');
		portalAuthActions.refreshAuthToken = jest.fn();
		portalAuthActions.refreshAuthToken.mockImplementation(function (){return;});


		householdMembersObj = [
					{
						firstName:"test", 
						personId:"",
						avatar : [],
						lastName:"test"
					}
			
		]	
		ConfigStore.get = jest.fn().mockReturnValue("consumer");
		ConfigStore.get = jest.fn().mockReturnValue("enrollmentYear");
		ConfigStore.getURL = jest.fn().mockReturnValue("#");
		ConfigStore.setConfig = jest.fn();
		wrapper = mount(<IntlProvider locale="en" messages={i18n} >
				<App {...props} householdMembers={householdMembersObj} pendingAppId={133} />
				</IntlProvider>,
				{
					context: {
					router: {
					  listen: ()=>{},
					  createHref: ()=>{},
					  isActive: ()=>{},
					  push: ()=>{}
					}
					},
					childContextTypes: {
					router: PropTypes.object.isRequired,
					}
				  });
		dispatch = (actionType, payload) => {
			AppDispatcher.dispatch({
				action: {
					type:    actionType,
					payload: payload
				}
			});
		  };
		  
		//   wrapper.onAuthStoreChange = jest.fn()
		//   wrapper.unmount()
	});
	it('Testing App', () => {	
		let output = renderer.create(<IntlProvider locale="en" messages={i18n} ><App {...props} householdMembers={householdMembersObj} pendingAppId={133} /></IntlProvider>);
		let tree = output.toJSON();
	});
	it('Testing Dispatch Event GENERIC_SAVE_EXIT', () => {	
		let data = {
            action:{
                type:'GENERIC_SAVE_EXIT'
            }
        }
        let eventSpy = sinon.spy();
        let dispatchListener = AppDispatcher.register((payload) => {
        if (payload.action.type === 'GENERIC_SAVE_EXIT') {
        eventSpy(payload.action.payload);
        }
        });
		AppDispatcher.register = jest.fn().mockReturnValue(data);
		AuthStore.getUserId = jest.fn().mockReturnValue(true)
		
		dispatch('GENERIC_SAVE_EXIT',data);
		
		wrapper.unmount();
		const onAuthStoreChange = jest.fn().mockReturnValue(true)
		const handleCloseGlobalMultitabErrorModal =  jest.fn().mockReturnValue(true)	
		//AuthStore.emit('change', onAuthStoreChange);
		
		AuthStore.emit('change', handleCloseGlobalMultitabErrorModal);

	});
	it('Testing Dispatch Event SET_ENROLLMENT_YEAR', () => {	
		// let data = {
        //     action:{
        //         type:'SET_ENROLLMENT_YEAR'
        //     }
        // }
        // let eventSpy = sinon.spy();
        // let dispatchListener = AppDispatcher.register((payload) => {
        // if (payload.action.type === 'SET_ENROLLMENT_YEAR') {
        // eventSpy(payload.action.payload);
        // }
        // });
        // AppDispatcher.register = jest.fn().mockReturnValue(data);
		// dispatch('SET_ENROLLMENT_YEAR',data);
		
		let data = {
            action:{
                type:'SET_ENROLLMENT_YEAR'
            }
        }
        let eventSpy = sinon.spy();
        let dispatchListener = AppDispatcher.register((payload) => {
        if (payload.action.type === 'SET_ENROLLMENT_YEAR') {
        eventSpy(payload.action.payload);
        }
        });
        AppDispatcher.register = jest.fn().mockReturnValue(data);
        dispatch('SET_ENROLLMENT_YEAR',data);
	});
	it('Testing functions', () => {
		const mockedEvent = { target: {} ,preventDefault:()=>{}}; 
		ConfigStore.getURL = jest.fn().mockReturnValue('#');
		ConfigStore.get = jest.fn().mockReturnValue('#');
		var confirmModal = wrapper.find('ConfirmModal');
		
	  }); 
	  it('Testing other functions 3', () => {
		
		var appContainer = wrapper.find('App').getNode();
		appContainer.handleCloseGlobalServerErrorModal();
		appContainer.handleCloseGlobalUserIdleModal();
		appContainer.setState({
			mobileNavOpen: true
		});
		for(var i=0;i<20;i++) {	
			appContainer.addUserIdleTime();
		}
		
		
		appContainer.state.enrollmentYear = null;
		
		
		
		
	  }); 
	  it('Testing Config', () => {
			let appIdGetParam=ConfigStore.get=jest.fn().mockReturnValue('appIdGetParam');
			ConfigStore.get=jest.fn().mockReturnValue('devUserRole');
			expect(typeof query).not.toBe(undefined);
			expect(query.appIdGetParam).not.toBe(undefined);
			ConfigStore.setConfig=jest.fn().mockReturnValue(query[appIdGetParam]);
			
			wrapper._setCookie=jest.fn().mockReturnValue(appIdGetParam, query[appIdGetParam]);


	  }); 
	  it('Testing renderDevToolsContentIfEnvVarSet', () => {
			let process=require('process');
			process.env.devtoolsFooter = true;
			let tokenId = "545r5e45er4e5r.erereere";
			let appIdGetParam=ConfigStore.get=jest.fn().mockReturnValue('appIdGetParam');
			expect(typeof query).not.toBe(undefined);
			expect(query.appIdGetParam).not.toBe(undefined);
			ConfigStore.setConfig=jest.fn().mockReturnValue(query[appIdGetParam]);
			
			wrapper._setCookie=jest.fn().mockReturnValue(appIdGetParam, query[appIdGetParam]);
		}); 
		it('Testing renderDevToolsContentIfEnvVarSet', () => {
			let process=require('process');
			process.env.devtoolsFooter = true;
			let changeSpy = sinon.spy();
			
			// dispatch('VOTER_REGISTRATION_SAVED', data);
			expect(changeSpy.called).toBe(false);
			// expect(VoterRegistrationStore.getDetails()).toEqual(data);
			// VoterRegistrationStore.removeListener('change', changeSpy);
		
			
		}); 


		it('server error', () => {
			let payload={
				errorCode:'N/A',
				errorNumber:'N/A',
				errorMessage:''
			};
			let changeSpy = sinon.spy();
			LayoutStore.on('change', changeSpy);
			dispatch('TIMESHIFTER_REFRESH_FROM_SERVER',payload);
			expect(changeSpy.called).toBe(false);
			wrapper.setState({
				globalServerErrorModalIsOpen: true, 
				globalServerErrorCode: 'N/A', 
				globalServerErrorNumber: 'N/A',
				globalServerErrorMessage:''
			});
		});



		it('server error', () => {
			let payload={
				errorCode:'N/A',
				errorNumber:'N/A',
				errorMessage:''
			};
			let changeSpy = sinon.spy();
			LayoutStore.on('change', changeSpy);
			dispatch('SERVER_ERROR',payload);
			expect(changeSpy.called).toBe(true);
			wrapper.setState({
				globalServerErrorModalIsOpen: true, 
				globalServerErrorCode: 'N/A', 
				globalServerErrorNumber: 'N/A',
				globalServerErrorMessage:''
			});
		});
		it('APPLICATION_LOAD', () => {
			let payload={
				errorCode:'N/A',
				errorNumber:'N/A',
				errorMessage:''
			};
			let changeSpy = sinon.spy();
			LayoutStore.on('change', changeSpy);
			dispatch('APPLICATION_LOAD',payload);
			expect(changeSpy.called).toBe(false);
		});
		it('APPLICATION_CREATE_SUCCESS', () => {
			let payload={
				errorCode:'N/A',
				errorNumber:'N/A',
				errorMessage:''
			};
			let changeSpy = sinon.spy();
			LayoutStore.on('change', changeSpy);
			dispatch('APPLICATION_CREATE_SUCCESS',payload);
			expect(changeSpy.called).toBe(false);
		});
		it('APPLICATION_SET_ID', () => {
			let payload={
				errorCode:'N/A',
				errorNumber:'N/A',
				errorMessage:''
			};
			let changeSpy = sinon.spy();
			LayoutStore.on('change', changeSpy);
			dispatch('APPLICATION_SET_ID');
			expect(changeSpy.called).toBe(false);
		});

		it('ACTION_TAKEN', () => {
			let payload={
				errorCode:'N/A',
				errorNumber:'N/A',
				errorMessage:''
			};
			let changeSpy = sinon.spy();
			LayoutStore.on('change', changeSpy);
			dispatch('ACTION_TAKEN');
			expect(changeSpy.called).toBe(false);
		});


		it('APPLICATION_TEST', () => {
			let payload={
				errorCode:'N/A',
				errorNumber:'N/A',
				errorMessage:''
			};
			let changeSpy = sinon.spy();
			LayoutStore.on('change', changeSpy);
			dispatch('APPLICATION_TEST');
			expect(changeSpy.called).toBe(false);
		});
		it('reviewOnlyMode', () => {
			let payload={
				errorCode:'N/A',
				errorNumber:'N/A',
				errorMessage:''
			};
			let changeSpy = sinon.spy();
			
						
			
			// let isReviewApplicationModeValid=false;
			NavActions.reloadApplicationHome=jest.fn().mockReturnValue();
			
			
			// LayoutStore.on('change', changeSpy);
			// dispatch('APPLICATION_TEST');
			// expect(changeSpy.called).toBe(false);
		});
		it('unmount', () => {
			let changeSpy = sinon.spy(),
			oneTimeAppLoad = jest.fn().mockReturnValue(true)
			let dispatchListener = AppDispatcher.register((payload) => {
			if (payload.action.type === 'GENERIC_SAVE_EXIT') {
			eventSpy(payload.action.payload);
			}
			});
			LayoutStore.removeListener=jest.fn()('change',changeSpy);
			AuthStore.removeListener('change',changeSpy);
			AuthStore.routerUnlistener();
						
			
			clearInterval(userIdleInterval);
		});

});
let query={
	appIdGetParam:'param',
	usertype:'usertype'
};