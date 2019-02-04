// Import dependencies
import { EventEmitter } from 'events';
import AppDispatcher from '../Dispatchers/AppDispatcher';
import Configstore from '../Stores/ConfigStore.js';

let allMarkers = [];

var GoogleMapStore = Object.assign({}, EventEmitter.prototype, {

    getApiKey: () => {
        return ConfigStore.get("apiKey");
    },

    getGoogleMapURL: () =>{
        return  ConfigStore.get("googleMapURL");
    },

    getIndividualMarker: (index) =>{
        console.log(index)
    },

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
                GoogleMapStore.emit('markerstored');
                break;    
            case 'DELETE_MARKER':
                _deleteMarker(action.payload);
                GoogleMapStore.emit('markerstored');
                break;
            case 'ERROR':                
                GoogleMapStore.emit('error');
                break; 
            case 'INVALID_LOCATION':                
                GoogleMapStore.emit('invalidlocation');
                break;   
            case 'WRONG_AUTHENTICATION':                
                GoogleMapStore.emit('wrongauthentication');
                break;             
		}
	})
});

const _deleteMarker = index => {
    delete allMarkers[index];
};

const _storeMarker = obj => {
    for(var i in allMarkers){
        if(allMarkers[i].lat === obj.lat){
            GoogleMapStore.emit('duplicatemarker');     
            return false;     
        }
    }

    allMarkers.push(obj);
    GoogleMapStore.emit('markerstored');
};

const _updateMarker = (payload) => {
    allMarkers[payload.i].lat = payload.lat;
    allMarkers[payload.i].lng = payload.lng;
    allMarkers[payload.i].locationName = payload.locationName;
};

export default GoogleMapStore;