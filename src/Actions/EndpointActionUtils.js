import AppDispatcher from '../Dispatchers/AppDispatcher.js';

const EndpointActionUtils = {
	dispatch: (actionType, payload) => {
		AppDispatcher.dispatch({
			action: {
				type:    actionType,
				payload: payload
			}
		});
	}
};


export default EndpointActionUtils;
