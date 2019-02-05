import  ConfigStore from '../../Stores/ConfigStore.js';
import AppDispatcher from '../../Dispatchers/AppDispatcher.js';
import sinon from 'sinon';

describe(" ConfigStore tests", function () {
	
	it('checks for Enrollment Period details', () => {
		let changeSpy = sinon.spy();
	    ConfigStore.on('change', changeSpy);	
		expect(ConfigStore.get()).toEqual(null);
		ConfigStore.removeListener('change', changeSpy);
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
