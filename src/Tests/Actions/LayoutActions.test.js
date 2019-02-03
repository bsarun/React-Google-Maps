
import LayoutActions from '../../Actions/LayoutActions.js';
//import { deepGet, deepSetObj } from '../../Components/Forms/FormHOC.jsx';
import AppDispatcher from '../../Dispatchers/AppDispatcher.js';
import sinon from 'sinon';

describe(" LayoutActions", function () {
	
	it('checks for MOBILE_NAV_TOGGLE', () => {
		let changeSpy = sinon.spy();
		LayoutActions.toggleMobileNav();
		dispatch('MOBILE_NAV_TOGGLE');
		expect(changeSpy.called).toBe(false);
	});
	
	it('checks for TOGGLE_FAB', () => {
		let changeSpy = sinon.spy();
		LayoutActions.toggleFAB();
		dispatch('TOGGLE_FAB');
		expect(changeSpy.called).toBe(false);
	});
	
	it('checks for TOGGLE_LOCALE_MENU', () => {
		let changeSpy = sinon.spy();
		LayoutActions.toggleLocaleMenu();
		dispatch('TOGGLE_LOCALE_MENU');
		expect(changeSpy.called).toBe(false);
	});

	it('checks for OPEN_PROGRESS_MODAL', () => {
		let changeSpy = sinon.spy();
		LayoutActions.openProgressModal();
		dispatch('OPEN_PROGRESS_MODAL');
		expect(changeSpy.called).toBe(false);
	});

	it('checks for CLOSE_PROGRESS_MODAL', () => {
		let changeSpy = sinon.spy();
		LayoutActions.closeProgressModal();
		dispatch('CLOSE_PROGRESS_MODAL');
		expect(changeSpy.called).toBe(false);
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