import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect, useContext } from 'react';
import Home from './Home';
import UserLocation, { LocationContext } from './UserLocation';

export default function Map() {

    const location = useContext(LocationContext);

    if (!location) {
        return null;
    }

    return (
        <MapView
            style={{ width: '100%', height: '100%' }}
            initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }}
        >
            <Marker
                coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                }}
                title='Your location'
                description=''
                pinColor='red' />
        </MapView>
    );

}