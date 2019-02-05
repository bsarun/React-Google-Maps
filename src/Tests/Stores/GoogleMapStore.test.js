
import GoogleMapStore from '../../Stores/GoogleMapStore';
import AppDispatcher from '../../Dispatchers/AppDispatcher.js';
import sinon from 'sinon';

describe("GoogleMapStore tests", function () {
    
    var allMarkers = [
        {
            lat:"56.36",
            lng:"76.36",
            locationName:"Bangalore"
        },
        {
            lat:"56.36",
            lng:"76.55",
            locationName:"Mysore"
        }
    ]
    
    it('getApiKey test', () => {
		let changeSpy = sinon.spy();		
	    expect(changeSpy.called).toBe(false);
        expect(GoogleMapStore.getApiKey()).toEqual('AIzaSyCSd52ktTVSJHfNFMgHaNbDmth');
        GoogleMapStore.removeListener('change', changeSpy);
		
    });

    it('getGoogleMapURL test', () => {
		let changeSpy = sinon.spy();		
	    expect(changeSpy.called).toBe(false);
        expect(GoogleMapStore.getGoogleMapURL()).toEqual('https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places');
        GoogleMapStore.removeListener('change', changeSpy);
		
    });

    it('getAllMarkers test', () => {
		let changeSpy = sinon.spy();		
	    expect(changeSpy.called).toBe(false);
        expect(GoogleMapStore.getAllMarkers()).toEqual([]);
       		
    });

    it('NEW_MARKER test', () => {
		let changeSpy = sinon.spy();
		GoogleMapStore.on('markerstored', changeSpy);
		let payload = {
            lat:"56.36",
            lng:"76.63"
        }
        dispatch('NEW_MARKER', payload);
        GoogleMapStore.removeListener('markerstored', changeSpy);		
    });

    it('UPDATE_MARKER test', () => {
		let changeSpy = sinon.spy();
		GoogleMapStore.on('markerstored', changeSpy);
		let payload = {
            lat:"56.36",
            lng:"76.63",
            locationName:"Bangalore",
            i:0
        }
        
        dispatch('UPDATE_MARKER', payload);
        GoogleMapStore.removeListener('markerstored', changeSpy);		
    });

    it('DELETE_MARKER test', () => {
		let changeSpy = sinon.spy();
		GoogleMapStore.on('markerstored', changeSpy);	
        dispatch('DELETE_MARKER', 0);
        GoogleMapStore.removeListener('markerstored', changeSpy);		
    });

    it('ERROR test', () => {
		let changeSpy = sinon.spy();
		GoogleMapStore.on('error', changeSpy);	
        dispatch('ERROR', null);
        GoogleMapStore.removeListener('error', changeSpy);		
    });

    it('INVALID_LOCATION test', () => {
		let changeSpy = sinon.spy();
		GoogleMapStore.on('invalidlocation', changeSpy);	
        dispatch('INVALID_LOCATION', null);
        GoogleMapStore.removeListener('invalidlocation', changeSpy);		
    });

    it('WRONG_AUTHENTICATION test', () => {
		let changeSpy = sinon.spy();
		GoogleMapStore.on('wrongauthentication', changeSpy);	
        dispatch('WRONG_AUTHENTICATION', null);
        GoogleMapStore.removeListener('wrongauthentication', changeSpy);		
    });

    let dispatch = (actionType, payload) => {
        AppDispatcher.dispatch({
            action: {
                type:    actionType,
                payload: payload
            }
        });
    };
    
});