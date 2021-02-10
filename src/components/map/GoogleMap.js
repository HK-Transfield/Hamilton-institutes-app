import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';
import '../styles/Map.css';


/**
 * Google map data for the locations of each institute
 */
const instituteLocations = [
    {
        // location index: 0
        address: '74 Hillcrest Road, Hamilton, New Zealand',
        center: {
            lat: -37.792536144023174,
            lng: 175.31773863814905
        }
    },
    {
        // location index: 1
        address: '131 Ward Street, Hamilton, New Zealand',
        center: {
            lat: -37.787967,
            lng: 175.278854
        }
    }
];


const GoogleMap = (props) => {
   
    return( 
        <div className="google-map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
                center={instituteLocations[props.locationIndex].center}
                defaultZoom={14}
            >
                <LocationPin
                    lat={instituteLocations[props.locationIndex].center.lat}
                    lng={instituteLocations[props.locationIndex].center.lng}
                    text={instituteLocations[props.locationIndex].address}
                />
            </GoogleMapReact>
        </div>
    )
}
export default GoogleMap;

/**
 * @description Display a pin showing the location of institute buildings
 * @param text address of the location of institute pin
 */
const LocationPin = ({ text }) => (
    <div className="pin">
      <Icon icon={locationIcon} className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  )