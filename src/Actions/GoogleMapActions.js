import AppDispatcher from '../Dispatchers/AppDispatcher';
import request from 'superagent';
import EndpointUtils from './EndpointActionUtils.js';
import Geocode from "react-geocode";
import ConfigStore from '../Stores/ConfigStore.js';

let markerStorage = {};
var GoogleMapActions = {

    deleteIndividualMarker(i) {
        return EndpointUtils.dispatch('DELETE_MARKER', i);
    },

    getLatLng(locationName) {
        var payload = {};
        var apiUrl = ConfigStore.get("geoCodeEndPoint").replace('{locationName}', locationName) + ConfigStore.get("authToken")
        request
            .get(apiUrl)
            .end((err, response) => {
                if (!err && response.body) {
                    if (response.body.error && response.body.error.code === "008") {
                        return EndpointUtils.dispatch('INVALID_LOCATION', null);
                    }
                    if (response.body.error && response.body.error.code === "003") {
                        return EndpointUtils.dispatch('WRONG_AUTHENTICATION', null);
                    }
                    payload = {
                        lat: response.body.latt,
                        lng: response.body.longt,
                        locationName: locationName.toUpperCase()
                    }
                    return EndpointUtils.dispatch('NEW_MARKER', payload);
                } else {
                    return EndpointUtils.dispatch('ERROR', locationName);
                }

            }
            );
    },

    updateLatLng(i, locationName) {


        var payload = {};
        var apiUrl = ConfigStore.get("geoCodeEndPoint").replace('{locationName}', locationName) + ConfigStore.get("authToken")
        request
            .get(apiUrl)
            .end((err, response) => {
                if (!err && response.body) {
                    if (response.body.error && response.body.error.code === "008") {
                        return EndpointUtils.dispatch('INVALID_LOCATION', null);
                    }
                    if (response.body.error && response.body.error.code === "003") {
                        return EndpointUtils.dispatch('WRONG_AUTHENTICATION', null);
                    }
                    payload = {
                        lat: response.body.latt,
                        lng: response.body.longt,
                        locationName: locationName.toUpperCase(),
                        i: i
                    }
                    return EndpointUtils.dispatch('UPDATE_MARKER', payload);
                } else {
                    return EndpointUtils.dispatch('ERROR', locationName);
                }

            }
            );

    },



};


export default GoogleMapActions;