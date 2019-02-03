import  ConfigStore from '../../Stores/ConfigStore.js';
//import { deepGet, deepSetObj } from '../../Components/Forms/FormHOC.jsx';
import AppDispatcher from '../../Dispatchers/AppDispatcher.js';
import sinon from 'sinon';

describe(" ConfigStoretests", function () {

    it('checks for agent enable', () => {
		let changeSpy = sinon.spy();
	    ConfigStore.on('change', changeSpy);
		dispatch('AGENT_SEP_ENABLE', 'abcd');
		expect(changeSpy.called).toBe(true);
		expect(ConfigStore.getEnrollmentPeriod()).toEqual('OPN');
		ConfigStore.removeListener('change', changeSpy);
    });
	
	it('checks for Enrollment Period details', () => {
		let changeSpy = sinon.spy();
	    ConfigStore.on('change', changeSpy);
		dispatch('ENROLLMENT_PERIOD_DETAILS', 'abcd');
		expect(changeSpy.called).toBe(true);
		expect(ConfigStore.getEnrollmentPeriod()).toEqual('OPN');
		expect(ConfigStore.isEnrollmentPeriod()).toEqual(false);
		expect(ConfigStore.createNewUUIDForRouteChange()).toEqual(undefined);
		expect(ConfigStore.setConfig()).toEqual(undefined);
		expect(ConfigStore.get()).toEqual(null);
		expect(ConfigStore.getURL()).toEqual(null);
		expect(ConfigStore.getRouteChangeBasedUUIDCorrelationId()).toEqual("3e509532-2e0d-4780-b11f-077eaa836e21");

		ConfigStore.removeListener('change', changeSpy);
    });

    it('checks for setting enrollment year', () => {
		let changeSpy = sinon.spy();
	    ConfigStore.on('change', changeSpy);
		dispatch('SET_ENROLLMENT_YEAR', 'abcd');
		expect(changeSpy.called).toBe(true);
		expect(ConfigStore.getEnrollmentPeriod()).toEqual('OPN');
		ConfigStore.removeListener('change', changeSpy);
    });

    it('checks for timeshifter refresh from server', () => {
		let changeSpy = sinon.spy();
	    ConfigStore.on('change', changeSpy);
		dispatch('TIMESHIFTER_REFRESH_FROM_SERVER', 'OPN');
		expect(changeSpy.called).toBe(false);
		expect(ConfigStore.getEnrollmentPeriod()).toEqual('OPN');
		ConfigStore.removeListener('change', changeSpy);
    });

	it('setPageIdAndNameForRouteChange matches pageIds.json with path containing text only', () => {
		var result = ConfigStore.setPageIdAndNameForRouteChange('/application-menu');
		expect(ConfigStore.getPageId()).toEqual("2.0");
		expect(ConfigStore.getPageName()).toEqual("AppMenu");
	});

	it('setPageIdAndNameForRouteChange matches pageIds.json with path containing ids in path (expected to be removed and matched)', () => {
		var result = ConfigStore.setPageIdAndNameForRouteChange('/household/edit-review/123456/basic-info');
		expect(ConfigStore.getPageId()).toEqual("4.0.1.1");
		expect(ConfigStore.getPageName()).toEqual("Name/DOB");
	});

	it('setPageIdAndNameForRouteChange matches pageIds.json with path containing ids and trailing digit in path (expected to be removed and matched)', () => {
		var result = ConfigStore.setPageIdAndNameForRouteChange('/household/add/123456/basic-info4');
		expect(ConfigStore.getPageId()).toEqual("4.0.1.4");
		expect(ConfigStore.getPageName()).toEqual("MaritalStatus");
	});

	it('setPageIdAndNameForRouteChange matches pageIds.json with path containing ids and trailing id in path (expected to be removed and matched)', () => {
		var result = ConfigStore.setPageIdAndNameForRouteChange('/household/edit/1234/relationship-info/1234');
		expect(ConfigStore.getPageId()).toEqual("4.0.1.1");
		expect(ConfigStore.getPageName()).toEqual("DefineRelationships");
	});

	it('setPageIdAndNameForRouteChange matches pageIds.json with path containing encryped ids in path (expected to be removed and matched)', () => {
		var result = ConfigStore.setPageIdAndNameForRouteChange('/household/edit/enc-wwDRyc5gEY4YVtVgRMRZoF7Foesz1_fIlnjuDB2O8sI=/basic-info');
		expect(ConfigStore.getPageId()).toEqual("4.0.1.1");
		expect(ConfigStore.getPageName()).toEqual("Name/DOB");
	});

	it('setPageIdAndNameForRouteChange matches pageIds.json with path containing encryped ids at end of path (expected to be removed and matched)', () => {
		var result = ConfigStore.setPageIdAndNameForRouteChange('/household/review/enc-wwDRyc5gEY4YVtVgRMRZoF7Foesz1_fIlnjuDB2O8sI=');
		expect(ConfigStore.getPageId()).toEqual("4.0.1.9");
		expect(ConfigStore.getPageName()).toEqual("HouseholdMemberReview");
	});

	it('setPageIdAndNameForRouteChange returns not found for unknown route', () => {
		var result = ConfigStore.setPageIdAndNameForRouteChange('/undefined/route');
		expect(ConfigStore.getPageId()).toEqual("[pageId not defined for route path]");
		expect(ConfigStore.getPageName()).toEqual("[pageName not defined for route path]");
	});

});


var config = window.__APP_CONFIG__;

let dispatch = (actionType, payload) => {
	AppDispatcher.dispatch({
		action: {
			type:    actionType,
			payload: payload
		}
	});
};
