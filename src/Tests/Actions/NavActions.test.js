
import NavActions from '../../Actions/NavActions.js';

import AppDispatcher from '../../Dispatchers/AppDispatcher.js';
import sinon from 'sinon';
import ConfigStore from '../../Stores/ConfigStore.js';


describe("NavActions", function () {
	
	it('checks for LOCALE_CHANGE', () => {
		let changeSpy = sinon.spy();
		let sample = {locale: 'en'};
		NavActions.changeLocale(sample);
		dispatch('LOCALE_CHANGE', sample);
		expect(changeSpy.called).toBe(false);
	});
	it('checks for SAVE_EXIT_REQUESTED', () => {
		let changeSpy = sinon.spy();
		let payload = {locale: 'en'};
		NavActions.saveAndExit(payload);
		dispatch('SAVE_EXIT_REQUESTED',payload);
		expect(changeSpy.called).toBe(false);
	});

	it('redirects to portal personal data', () => {
		let orig = NavActions.redirectToPortalURL;
		NavActions.redirectToPortalURL = jest.fn();
		NavActions.redirectToPersonalData();
		expect(NavActions.redirectToPortalURL).toBeCalledWith('navigation-personal-data-url');
		NavActions.redirectToPortalURL = orig;
	});
	
	it('redirects to portal eligibility', () => {
		let orig = NavActions.redirectToPortalURL;
		NavActions.redirectToPortalURL = jest.fn();
		NavActions.redirectToEligibility();
		expect(NavActions.redirectToPortalURL).toBeCalledWith('navigation-eligibility-url');
		NavActions.redirectToPortalURL = orig;
	});

	it('redirects to portal login', () => {
		let orig = NavActions.reloadAppAtURL;
		NavActions.reloadAppAtURL = jest.fn();
		NavActions.redirectToLogin();
		expect(NavActions.reloadAppAtURL).toBeCalledWith('portalLoginURL');
		NavActions.reloadAppAtURL = orig;
	});

	it('redirects to portal logout', () => {
		let orig = NavActions.reloadAppAtURL;
		NavActions.reloadAppAtURL = jest.fn();
		NavActions.logOutUser();
		expect(NavActions.reloadAppAtURL).toBeCalledWith('portalSignoutURL');
		NavActions.reloadAppAtURL = orig;
	});

	it('redirects to application home', () => {
		let orig = NavActions.reloadAppAtURL;
		NavActions.reloadAppAtURL = jest.fn();
		NavActions.reloadApplicationHome();
		expect(NavActions.reloadAppAtURL).toBeCalledWith('accountHome');
		NavActions.reloadAppAtURL = orig;
	});
	
	it('does not redirect when a URL is not provided', () => {
		let orig = global.location.assign;
		global.location.assign = jest.fn();
		// the function being tested
		NavActions.redirectToURL();
		// expectations
		expect(global.location.assign).not.toBeCalled();
		global.location.assign = orig;

	});

	it('redirects to a specific URL', () => {
		// mocks
		let orig = global.location.assign;
		global.location.assign = jest.fn();
		// the function being tested
		NavActions.redirectToURL('/account-home');
		// expectations
		expect(global.location.assign).toBeCalledWith('/account-home');
		global.location.assign = orig;
	});

	it('reloads the page if the URL matches current', () => {
		// mocks
		let orig = global.location.assign,
			orig2 = global.location.reload;
		global.location.assign = jest.fn();
		global.location.reload = jest.fn();
		// the function being tested
		NavActions.redirectToURL('about:blank');
		// expectations
		expect(global.location.assign).not.toBeCalled();
		expect(global.location.reload).toBeCalled();
		// resets
		global.location.assign = orig;
		global.location.reload = orig2;
	});
	
	it('redirects to app at a specific route', () => {
		// mocks
		let orig1 = NavActions.redirectToURL,
			orig2 = ConfigStore.getURL;
		NavActions.redirectToURL = jest.fn();
		ConfigStore.getURL = jest.fn().mockReturnValue('/test-account-home');
		// the function being tested
		NavActions.reloadAppAtURL('accountHome');
		// expectations
		expect(ConfigStore.getURL).toBeCalledWith('accountHome');
		expect(NavActions.redirectToURL).toBeCalledWith('/test-account-home');
		// resets
		NavActions.redirectToURL = orig1;
		ConfigStore.getURL = orig2;
		
	});
	
	it('redirects to a portal URL by config key', () => {
		// mocks
		let orig1 = NavActions.redirectToURL,
			orig2 = NavActions.generatePortalURL,
			spy = jest.fn();
		NavActions.generatePortalURL = jest.fn().mockReturnValue('/ahbx/some-portal-url');
		NavActions.redirectToURL = jest.fn();
		
		// the function being tested
		NavActions.redirectToPortalURL('someConfigKey', 'somePendingAppId', spy);
		// expectations
		expect(NavActions.generatePortalURL).toBeCalledWith('someConfigKey', 'somePendingAppId', spy);
		expect(NavActions.redirectToURL).toBeCalledWith('/ahbx/some-portal-url');
		// resets
		NavActions.redirectToURL = orig1;
		NavActions.generatePortalURL = orig2;	
	});
	
	it('generates a portal-relative URL with standard pendingAppId', () => {
		// mocks and spies
		// return the value passed to the transform spy
		let transformSpy = jest.fn().mockImplementation((url) => {
				return url.replace('{lang}', 'en').replace('{year}', '2017');
			}),
			orig1 = ConfigStore.getURL,
			orig2 = ConfigStore.get;
			
		ConfigStore.getURL = jest.fn().mockReturnValue('http://test.local/ahbx');
		ConfigStore.get = jest.fn().mockReturnValue('{portalURL}/page?_pendingAppId={encryptedId}&year={year}&lang={lang}');
				
		// the function being tested
		let url = NavActions.generatePortalURL('someConfigKey', null, transformSpy);
		// expectations
		expect(url).toEqual('http://test.local/ahbx/page?_pendingAppId=somePendingAppId&year=2017&lang=en');
		expect(ConfigStore.getURL).toBeCalledWith('portalURL');
		expect(ConfigStore.get).toBeCalledWith('someConfigKey');
		
		expect(transformSpy).toBeCalledWith('http://test.local/ahbx/page?_pendingAppId=somePendingAppId&year={year}&lang={lang}');
		
		// resets
		ConfigStore.getURL = orig1;
		ConfigStore.get = orig2;
		
		
	});
	
	it('generates a portal-relative URL with override pendingAppId', () => {
		// mocks and spies
		let orig1 = ConfigStore.getURL,
			orig2 = ConfigStore.get;
			
		ConfigStore.getURL = jest.fn().mockReturnValue('http://test.local/ahbx');
		ConfigStore.get = jest.fn().mockReturnValue('{portalURL}/page?_pendingAppId={encryptedId}');
		

		// the function being tested
		let url = NavActions.generatePortalURL('someConfigKey', 'somePendingAppId');
		// expectations
		expect(url).toEqual('http://test.local/ahbx/page?_pendingAppId=somePendingAppId');
		expect(ConfigStore.getURL).toBeCalledWith('portalURL');
		expect(ConfigStore.get).toBeCalledWith('someConfigKey');
		

		// resets
		ConfigStore.getURL = orig1;
		ConfigStore.get = orig2;
		
	});
	
	it('dispatches an event', () => {
		let orig = AppDispatcher.dispatch;
		AppDispatcher.dispatch = jest.fn();
		NavActions.dispatch('SOME_EVENT', {key: 'value'});
		expect(AppDispatcher.dispatch).toBeCalledWith({
			action: {
				type: 'SOME_EVENT',
				payload: {key: 'value'}
			}
		});
		AppDispatcher.dispatch = orig;
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
