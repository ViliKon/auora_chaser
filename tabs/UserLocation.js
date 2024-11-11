import { useState, useEffect, createContext } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export const LocationContext = createContext();

export default function UserLocation({children}) {

    const [location, setLocation] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('No permission to get location')
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();

    }, []);

    return (
        <LocationContext.Provider value={location}>
            {children}
        </LocationContext.Provider>
    )
}