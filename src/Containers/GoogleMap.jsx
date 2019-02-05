import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, MarkerWithLabel } from 'react-google-maps';
import Modal from 'react-modal';
import { Form } from 'formsy-react';
import GoogleMapActions from '../Actions/GoogleMapActions.js';
import Geocode from "react-geocode";
import GoogleMapStore from '../Stores/GoogleMapStore';


class GoogleMaps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            isMarkerShown: false,
            shouldShowExternalModal: false,
            googleMapURL: GoogleMapStore.getGoogleMapURL(),
            actions: "",            
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
            this.invalidlocation = this.invalidlocation.bind(this),
            this.wrongauthentication = this.wrongauthentication.bind(this)
    }

    invalidlocation(){
        alert("Invalid Location");
    }

    wrongauthentication(){
        alert("Wrong Authentication!");
    }

    error(){
        var toDelete = confirm("Error getting the Coordinates. Try Again?");
        if (toDelete == true) {
            GoogleMapActions.getLatLng(this.state.formData.locationName)
        } else {
            return false;
        }
    }

    duplicateMarkerFound(){
        alert("Cannot Add Duplicate Location!")
    }

    handleEditForm(e){       
        GoogleMapActions.updateLatLng(this.state.markerIndex, this.state.locationName);
    }

    handleEditChange(e){
        this.setState({
            locationName: e.target.value,
            markerIndex: e.target.id
        })
        
    }

    deleteMarker(e){
        var toDelete = confirm("Delete "+e.target.id.split("-")[1].toLowerCase()+"?");
        if (toDelete == true) {
            GoogleMapActions.deleteIndividualMarker(e.target.id.split("-")[0])
        } else {
            return false;
        }        
    }

    editMarker(e){
        this.setState({ 
            modalEditOpen: true ,
            actions: "edit",
            locationName: e.target.id.split("-")[1],
            markerIndex: e.target.id.split("-")[0]
        });
    }

    handleSubmitForm() {
        GoogleMapActions.getLatLng(this.state.formData.locationName)
    }

    pushMarkerToMap() {       
        this.setState({
            markers: GoogleMapStore.getAllMarkers(),
            modalIsOpen: false,
            modalEditOpen: false
        })
    }

    handleInputChange(evt) {
        let markerObj = {};
        markerObj["locationName"] = evt.target.value;
        this.setState({
            formData: Object.assign(this.state.formData, markerObj)
        });
    }

    openModal() {
        this.setState({ 
            modalIsOpen: true,
            actions: "create" 
        });
    }   

    afterOpenModal() {
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    closeEditModal() {
        this.setState({ modalEditOpen: false });
    }
    

    componentWillUnmount() {
        GoogleMapStore.removeListener('markerstored', this.pushMarkerToMap);
        GoogleMapStore.removeListener('duplicatemarker', this.duplicateMarkerFound);
        GoogleMapStore.removeListener('error', this.error);
        GoogleMapStore.removeListener('invalidlocation', this.invalidlocation);
        GoogleMapStore.removeListener('wrongauthentication', this.wrongauthentication);
    }

    componentWillReceiveProps(nextProps){    
             console.log(nextProps)
    }

    componentWillMount() {
        this.setState({ markers: [] })
        GoogleMapStore.on('markerstored', this.pushMarkerToMap);
        GoogleMapStore.on('duplicatemarker', this.duplicateMarkerFound);
        GoogleMapStore.on('error', this.error);
        GoogleMapStore.on('invalidlocation', this.invalidlocation)
        GoogleMapStore.on('wrongauthentication', this.wrongauthentication)
    }


    componentDidMount() {
        let apiKey = GoogleMapStore.getApiKey();
        Geocode.setApiKey(apiKey);
    }

    render() {

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
                    style={customStyles}
                >
                  <Form onValidSubmit={this.handleSubmitForm}>
                        <div style={customStyles.createMarkerModalDiv} id="create-marker-modal-div">
                            <h2 style={customStyles.h2}>Create Marker</h2>
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
                                    aria-describedby="jhgj"
                                    id="input-id"
                                />
                            </div><br></br>


                             <button onclick={this.handleSubmitForm} style={customStyles.buttonStyle} id="get-coordinates-button" className="btn btn-primary">
                                Add Location
                            </button>

                        </div>

                    </Form>

                </Modal>
                <button style={customStyles.buttonStyle} id="addmap-button" className="btn btn-primary" onClick={this.openModal}>
                    Add Map
                </button>

                <div style={customStyles.markerWrapper} id="marker-wrapper">
                {
                    Array.isArray(this.state.markers) ?
                        this.state.markers.map((arr, index) => {
                            return (
                                <div key={index} className="screening-questions col-sm-12 col-md-12 ageofpeoplewrapper">
                                    <div style={customStyles.subwrapper} id="marker-subwrapper">
                                        <h3 style={customStyles.h3}>{arr.locationName}</h3>
                                        <p>Latitude : {arr.lat}</p>
                                        <p>Longitude : {arr.lng}</p>
                                        <button style={customStyles.buttonStyleLocation} id={index + "-" + arr.locationName} className="btn btn-primary" onClick={this.editMarker}>
                                            Edit
                                        </button>
                                        <button style={customStyles.buttonStyleLocation} id={index + "-" + arr.locationName} className="btn btn-primary" onClick={this.deleteMarker}>
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
                    style={customStyles}
                >
                  <Form onValidSubmit={this.handleEditForm}>
                        <div style={customStyles.createMarkerModalDiv} id="create-marker-modal-div">
                            <h2 style={customStyles.h2}>Edit Marker</h2>
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


                             <button style={customStyles.buttonStyle} id="get-coordinates-button" className="btn btn-primary">
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

const customStyles = {
    content: {
        top: '25%',
        width: '40%',
        height: '200px',
        margin: '6% 0% 0% 25%'
    },
    buttonStyle: {
        margin: '2%',
        background: '#1a73e8',
        border: 'none',
        color: 'white',
        padding: '5px 15px 5px 15px',
        'text-align': 'center',
        'border-radius': '4px'
    },
    buttonStyleLocation: {
        'margin-right': '2%',
        background: '#1a73e8',
        border: 'none',
        color: 'white',
        padding: '5px 15px 5px 15px',
        'text-align': 'center',
        'border-radius': '4px'
    },
    createMarkerModalDiv: {
        'text-align': 'center'
    },
    markerWrapper: {
        margin: '2%',
        
        width: 'auto',
        height: 'auto',
        padding: '2%',
        overflow: 'hidden'
    },

    subwrapper: {
        width: '50%',
        float: 'left',

    },
    editMarkerModal: {
        'text-align': 'center'
    },
    buttonStyleModal: {
        margin: '2%',
        background: '#1a73e8',
        border: 'none',
        color: 'white',
        padding: '5px 15px 5px 15px',
        'text-align': 'center'
    },
    content: {
        top: '25%',
        width: '40%',
        height: '200px',
        margin: '6% 0% 0% 25%'
    },
    h3: {
        color: 'blue'
    },
    h2: {
        'background': 'lightgrey',
        'padding': '4% 2% 4% 2%'
    }
};