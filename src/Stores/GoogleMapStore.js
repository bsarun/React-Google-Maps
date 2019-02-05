// Import dependencies
import { EventEmitter } from 'events';
import ConfigStore from '../Stores/ConfigStore.js';
import AppDispatcher from '../Dispatchers/AppDispatcher';

let allMarkers = [];

var GoogleMapStore = Object.assign({}, EventEmitter.prototype, {

    /*return apiKey from ConfigStore */
    getApiKey: () => {
        return ConfigStore.get("apiKey");
    },

    /*return googleMapUrl from ConfigStore */
    getGoogleMapURL: () =>{
        return  ConfigStore.get("googleMapURL");
    },

    /*Return All markers from the store */
    getAllMarkers: () =>{
      return allMarkers;
    },

	dispatcherId: AppDispatcher.register(payload => {
		var action = payload.action;		
		// Do something on dispatcher events, like update the store.
		switch(action.type) {			
            case 'NEW_MARKER':
                _storeMarker(action.payload);                
                break;	
            case 'UPDATE_MARKER':
                _updateMarker(action.payload);
                GoogleMapStore.emit('markerStored');
                break;    
            case 'DELETE_MARKER':
                _deleteMarker(action.payload);
                GoogleMapStore.emit('markerStored');
                break;
            case 'ERROR':                
                GoogleMapStore.emit('error');
                break; 
            case 'INVALID_LOCATION':                
                GoogleMapStore.emit('invalidLocation');
                break;   
            case 'WRONG_AUTHENTICATION':                
                GoogleMapStore.emit('wrongAuthentication');
                break;             
		}
	})
});

/*Handle delete marker based on the index */
const _deleteMarker = index => {
    delete allMarkers[index];
};

/*Push location if not exists in the store */
const _storeMarker = obj => {
    for(var i in allMarkers){         
        if(allMarkers[i].lat === obj.lat){
            GoogleMapStore.emit('duplicateMarker');     
            return false;     
        }
    }

    allMarkers.push(obj);
    GoogleMapStore.emit('markerStored');
};

/*Update marker location */
const _updateMarker = (payload) => {
    allMarkers[payload.i].lat = payload.lat;
    allMarkers[payload.i].lng = payload.lng;
    allMarkers[payload.i].locationName = payload.locationName;
};

export default GoogleMapStore;