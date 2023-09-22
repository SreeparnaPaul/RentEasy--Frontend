import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    position: 'absolute',

     top: '120px',  
     marginTop: '25px',
     paddingTop: '30px',   
    // left: '80%',    
    transform: 'translate(-50%, -50%)',  
    width: '350px',   
    height: '250px', 
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false, 
    activeMarker: {},          
    selectedPlace: {}          
  };

  onMarkerClick = (props, marker, e) =>
   {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 22.588012,
          lng: 88.408503
        }}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'City Centre Mall'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyABMOd4XL7AmaVjoW8hmXUvlxNkgxSSXPs' 
})(MapContainer);











