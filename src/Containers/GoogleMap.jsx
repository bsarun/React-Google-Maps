import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, MarkerWithLabel } from 'react-google-maps';
import Modal from 'react-modal';
import { Form } from 'formsy-react';
import GoogleMapActions from '../Actions/GoogleMapActions.js';
import Geocode from "react-geocode";
import GoogleMapStore from '../Stores/GoogleMapStore';
import CustomStyles from '../Components/CustomStyles.jsx';

class GoogleMaps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            isMarkerShown: false,
            shouldShowExternalModal: false,
            googleMapURL: GoogleMapStore.getGoogleMapURL(),
            markerIndex: null,
            locationName: ""
        }

        this.openModal = this.openModal.bind(this),
        this.afterOpenModal = this.afterOpenModal.bind(this),
        this.closeModal = this.closeModal.bind(this),
        this.closeEditModal = this.closeEditModal.bind(this)
        this.handleSubmitForm = this.handleSubmitForm.bind(this),
        this.handleInputChange = this.handleInputChange.bind(this),
        this.pushMarkerToMap = this.pushMarkerToMap.bind(this)
        this.editMarker = this.editMarker.bind(this),
        this.handleEditChange = this.handleEditChange.bind(this),
        this.handleEditForm = this.handleEditForm.bind(this),
        this.deleteMarker = this.deleteMarker.bind(this),
        this.duplicateMarkerFound = this.duplicateMarkerFound.bind(this),
        this.error = this.error.bind(this),
        this.invalidLocation = this.invalidLocation.bind(this),
        this.wrongAuthentication = this.wrongAuthentication.bind(this)
    }

    /*Handle Invalid Location case */
    invalidLocation(){
        alert("Invalid Location! Please Enter Valid Location.");
    }

    /*Handle wrong authentication case */
    wrongAuthentication(){
        alert("Wrong Authentication!");
    }

    /*Handle error case */
    error(){
        var toDelete = confirm("Error getting the Coordinates. Try Again?");
        if (toDelete == true) {
            GoogleMapActions.getLatLng(this.state.formData.locationName)
        } else {
            return false;
        }
    }

    /*Handle duplicate marker case */
    duplicateMarkerFound(){
        alert("Cannot Add Duplicate Location!")
    }

    /*Handle submit edit marker case */
    handleEditForm(e){       
        GoogleMapActions.updateLatLng(this.state.markerIndex, this.state.locationName);
    }

    /*Handle edit input change case */
    handleEditChange(e){
        this.setState({
            locationName: e.target.value,
            markerIndex: e.target.id
        })        
    }

    /*Handle delete marker case */
    deleteMarker(e){
        var toDelete = confirm("Delete "+e.target.id.split("-")[1].toLowerCase()+"?");
        if (toDelete == true) {
            GoogleMapActions.deleteIndividualMarker(e.target.id.split("-")[0])
        } else {
            return false;
        }        
    }

    /*Handle edit marker case */
    editMarker(e){
        this.setState({ 
            modalEditOpen: true ,
            locationName: e.target.id.split("-")[1],
            markerIndex: e.target.id.split("-")[0]
        });
    }

    /*Handle add marker submit case */
    handleSubmitForm() {
        GoogleMapActions.getLatLng(this.state.formData.locationName)
    }

    /*Push the stored markes to the map */
    pushMarkerToMap() {       
        this.setState({
            markers: GoogleMapStore.getAllMarkers(),
            modalIsOpen: false,
            modalEditOpen: false
        })
    }

    /*Handle add marker input change case */
    handleInputChange(evt) {
        let markerObj = {};
        markerObj["locationName"] = evt.target.value;
        this.setState({
            formData: Object.assign(this.state.formData, markerObj)
        });
    }

    /*Handle Add marker modal open case */
    openModal() {
        this.setState({ 
            modalIsOpen: true,
        });
    }   

    /*Handle post Add marker modal open case */
    afterOpenModal() {
        this.subtitle.style.color = '#f00';
    }

    /*Handle close for Add marer case */
    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    /*Handle close for edit marer case */
    closeEditModal() {
        this.setState({ modalEditOpen: false });
    }
    
    /*React Life Cyclces */
    componentWillUnmount() {
        GoogleMapStore.removeListener('markerStored', this.pushMarkerToMap);
        GoogleMapStore.removeListener('duplicateMarker', this.duplicateMarkerFound);
        GoogleMapStore.removeListener('error', this.error);
        GoogleMapStore.removeListener('invalidLocation', this.invalidLocation);
        GoogleMapStore.removeListener('wrongAuthentication', this.wrongAuthentication);
    }

    /*React Life Cyclces */
    componentWillMount() {
        this.setState({ markers: [] })
        GoogleMapStore.on('markerStored', this.pushMarkerToMap);
        GoogleMapStore.on('duplicateMarker', this.duplicateMarkerFound);
        GoogleMapStore.on('error', this.error);
        GoogleMapStore.on('invalidLocation', this.invalidLocation)
        GoogleMapStore.on('wrongAuthentication', this.wrongAuthentication)
    }

    /*React Life Cyclces */
    componentDidMount() {
        let apiKey = GoogleMapStore.getApiKey();
        Geocode.setApiKey(apiKey);
    }

    /*Component render */
    render() {

        /*Existing and all new markers will be looped and pushed to the map here */
        const MyMapComponent = withScriptjs(withGoogleMap((props) =>
            <GoogleMap
                defaultZoom={2}
                defaultCenter={{ lat: 53.551086, lng: 9.993682 }}
            >
                {this.state.markers.map(function (a, b) {
                    return (
                        <Marker
                            key={b}
                            position={{ lat: parseFloat(a.lat), lng: parseFloat(a.lng) }}
                        />
                    )
                })}
            </GoogleMap>
        ))

        return (
            <div>
                <MyMapComponent
                    isMarkerShown
                    markers={this.state.markers}
                    googleMapURL={this.state.googleMapURL}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    initialCenter={{
                        lat: 42.39,
                        lng: -72.52
                    }}
                />

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={CustomStyles}
                >
                  <Form onValidSubmit={this.handleSubmitForm}>
                        <div style={CustomStyles.createMarkerModalDiv} id="create-marker-modal-div">
                            <h2 style={CustomStyles.h2}>Create Marker</h2>
                            <div class="create-marker-formdata">
                                <input
                                    placeholder="Enter Location Name"
                                    ref={input => this.textInput = input}
                                    htmlFor={this.props.id}
                                    onChange={this.handleInputChange}                                    
                                    onFocus={this.handleInputFocus}
                                    onBlur={this.handleInputBlur}
                                    className="form-control"
                                    onKeyUp={this.props.onKeyUp}
                                    onKeyDown={this.props.onKeyDown}                                    
                                    id="input-id"
                                />
                            </div><br></br>
                             <button onclick={this.handleSubmitForm} style={CustomStyles.buttonStyle} id="get-coordinates-button" className="btn btn-primary">
                                Add Location
                            </button>

                        </div>

                    </Form>

                </Modal>
                <button style={CustomStyles.buttonStyle} id="addmap-button" className="btn btn-primary" onClick={this.openModal}>
                    Add Map
                </button>

                <div style={CustomStyles.markerWrapper} id="marker-wrapper">
                {
                    Array.isArray(this.state.markers) ?
                        this.state.markers.map((arr, index) => {
                            return (
                                <div key={index} className="screening-questions col-sm-12 col-md-12 ageofpeoplewrapper">
                                    <div style={CustomStyles.subwrapper} id="marker-subwrapper">
                                        <h3 style={CustomStyles.h3}>{arr.locationName}</h3>
                                        <p>Latitude : {arr.lat}</p>
                                        <p>Longitude : {arr.lng}</p>
                                        <button style={CustomStyles.buttonStyleLocation} id={index + "-" + arr.locationName} className="btn btn-primary" onClick={this.editMarker}>
                                            Edit
                                        </button>
                                        <button style={CustomStyles.buttonStyleLocation} id={index + "-" + arr.locationName} className="btn btn-primary" onClick={this.deleteMarker}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )
                        }) : null
                }
                </div>

                <Modal
                    isOpen={this.state.modalEditOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeEditModal}
                    style={CustomStyles}
                >
                  <Form onValidSubmit={this.handleEditForm}>
                        <div style={CustomStyles.createMarkerModalDiv} id="create-marker-modal-div">
                            <h2 style={CustomStyles.h2}>Edit Marker</h2>
                            <div class="create-marker-formdata">
                                <input
                                    id={this.state.markerIndex}
                                    placeholder="Enter Location Name"
                                    ref={input => this.textInput = input}
                                    htmlFor={this.props.id}
                                    onChange={this.handleEditChange}
                                    value={this.state.locationName.toLowerCase()}                                    
                                    onFocus={this.handleInputFocus}
                                    onBlur={this.handleInputBlur}
                                    className="form-control"
                                    onKeyUp={this.props.onKeyUp}
                                    onKeyDown={this.props.onKeyDown}
                                />
                            </div><br></br>


                             <button style={CustomStyles.buttonStyle} id="get-coordinates-button" className="btn btn-primary">
                                Update Location
                            </button>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}


export default GoogleMaps;