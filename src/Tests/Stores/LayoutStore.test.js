import LayoutStore from '../../Stores/LayoutStore.js';
//import { deepGet, deepSetObj } from '../../Components/Forms/FormHOC.jsx';
import AppDispatcher from '../../Dispatchers/AppDispatcher.js';
import sinon from 'sinon';

describe("LayoutStore tests", function () {
	
	it('mobile nav open', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('MOBILE_NAV_OPEN');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		mobileNavOpen = getState.mobileNavOpen;
        expect(mobileNavOpen).toBe(true);
		LayoutStore.removeListener('change', changeSpy);
	});

	it('mobile nav close', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('MOBILE_NAV_CLOSE');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		mobileNavOpen = getState.mobileNavOpen;
        expect(mobileNavOpen).toBe(false);
		LayoutStore.removeListener('change', changeSpy);
	});
	
	it('mobile nav toggle', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('MOBILE_NAV_TOGGLE', data);
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		mobileNavOpen = getState.mobileNavOpen;
		expect(mobileNavOpen).toBe(true);
		LayoutStore.removeListener('change', changeSpy);
	});

	it('toggle fab', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('TOGGLE_FAB',data);
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		fabIsOpen = getState.fabIsOpen,
		localeMenuIsOpen = getState.localeMenuIsOpen;
		expect(fabIsOpen).toBe(true);
		expect(localeMenuIsOpen).toBe(false);
		LayoutStore.removeListener('change', changeSpy);
	});

	it('open locale menu', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('OPEN_LOCALE_MENU');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		localeMenuIsOpen = getState.localeMenuIsOpen,
		fabIsOpen = getState.fabIsOpen;
		expect(localeMenuIsOpen).toBe(true);
		expect(fabIsOpen).toBe(false);
		LayoutStore.removeListener('change', changeSpy);
	});
	
	it('close locale menu', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('CLOSE_LOCALE_MENU');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		localeMenuIsOpen = getState.localeMenuIsOpen;
		expect(localeMenuIsOpen).toBe(false);		
		LayoutStore.removeListener('change', changeSpy);
	});
	
	it('toggle locale menu', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('TOGGLE_LOCALE_MENU',data);
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		localeMenuIsOpen = getState.localeMenuIsOpen,
		fabIsOpen = getState.fabIsOpen;
		expect(localeMenuIsOpen).toBe(true);
		expect(fabIsOpen).toBe(false);
		LayoutStore.removeListener('change', changeSpy);
	});

	it('open progress model', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('OPEN_PROGRESS_MODAL');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		progressModalIsOpen = getState.progressModalIsOpen;
		expect(progressModalIsOpen).toBe(true);
		LayoutStore.removeListener('change', changeSpy);
	});

	it('application signature in progress', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('APP_SIGNATURE_IN_PROGRESS');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		progressModalIsOpen = getState.progressModalIsOpen;
		expect(progressModalIsOpen).toBe(true);
		LayoutStore.removeListener('change', changeSpy);
	});

	it('create account pending', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('CREATE_ACCOUNT_PENDING');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		progressModalIsOpen = getState.progressModalIsOpen;
		expect(progressModalIsOpen).toBe(true);
		LayoutStore.removeListener('change', changeSpy);
	});

	it('identity verification question in progress', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('IDENTITY_VERIFICATION_QUESTIONS_IN_PROGRESS');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		progressModalIsOpen = getState.progressModalIsOpen;
		expect(progressModalIsOpen).toBe(true);
		LayoutStore.removeListener('change', changeSpy);
	});
	
	it('indentity verification response in progress', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('IDENTITY_VERIFICATION_RESPONSE_IN_PROGRESS');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		progressModalIsOpen = getState.progressModalIsOpen;
		expect(progressModalIsOpen).toBe(true);
		LayoutStore.removeListener('change', changeSpy);
	});

	it('close progress modal', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('CLOSE_PROGRESS_MODAL');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		progressModalIsOpen = getState.progressModalIsOpen;
		expect(progressModalIsOpen).toBe(false);
		LayoutStore.removeListener('change', changeSpy);
	});

	it('application signature saved', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('APP_SIGNATURE_SAVED');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		progressModalIsOpen = getState.progressModalIsOpen;
		expect(progressModalIsOpen).toBe(false);
		LayoutStore.removeListener('change', changeSpy);
	});

	it('create account saved', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('CREATE_ACCOUNT_SUCCESS');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		progressModalIsOpen = getState.progressModalIsOpen;
		expect(progressModalIsOpen).toBe(false);
		LayoutStore.removeListener('change', changeSpy);
	});

	it('create account username exists', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('CREATE_ACCOUNT_USERNAME_EXISTS');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		progressModalIsOpen = getState.progressModalIsOpen;
		expect(progressModalIsOpen).toBe(false);
		LayoutStore.removeListener('change', changeSpy);
	});

	it('create account duplicate account', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('CREATE_ACCOUNT_DUPLICATE_ACCOUNT');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		progressModalIsOpen = getState.progressModalIsOpen;
		expect(progressModalIsOpen).toBe(false);
		LayoutStore.removeListener('change', changeSpy);
	});

	it('create account access code invalid', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('CREATE_ACCOUNT_ACCESS_CODE_INVALID');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		progressModalIsOpen = getState.progressModalIsOpen;
		expect(progressModalIsOpen).toBe(false);
		LayoutStore.removeListener('change', changeSpy);
	});

	it('identity verification questions', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('IDENTITY_VERIFICATION_QUESTIONS');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		progressModalIsOpen = getState.progressModalIsOpen;
		expect(progressModalIsOpen).toBe(false);
		LayoutStore.removeListener('change', changeSpy);
	});

	it('identity verification response', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('IDENTITY_VERIFICATION_RESPONSE');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		progressModalIsOpen = getState.progressModalIsOpen;
		expect(progressModalIsOpen).toBe(false);
		LayoutStore.removeListener('change', changeSpy);
	});

	it('identity verification error', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('IDENTITY_VERIFICATION_ERROR');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		progressModalIsOpen = getState.progressModalIsOpen;
		expect(progressModalIsOpen).toBe(false);
		LayoutStore.removeListener('change', changeSpy);
	});
	
	it('server error', () => {
		let changeSpy = sinon.spy();
		LayoutStore.on('change', changeSpy);
		dispatch('SERVER_ERROR');
		expect(changeSpy.called).toBe(true);
		let getState = LayoutStore.getState(),
		progressModalIsOpen = getState.progressModalIsOpen;
		expect(progressModalIsOpen).toBe(false);
		LayoutStore.removeListener('change', changeSpy);
	});
});

var dispatch = (actionType, payload) => {
	AppDispatcher.dispatch({
		action: {
			type:    actionType,
			payload: payload
		}
	});
};

var data = {
	mobileNavOpen: false,
	fabIsOpen: false,
	localeMenuIsOpen: false,
	progressModalIsOpen: false
};