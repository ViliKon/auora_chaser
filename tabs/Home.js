import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LocationContext } from './UserLocation';
import { FetchItems } from './FetchItems';
import MapView, { Marker } from 'react-native-maps';
import { Title } from 'react-native-paper';
 
export default function Home() {
    const location = useContext(LocationContext);
    const myLat = location ? Math.round(location.coords.latitude) : null;
    const myLon = location ? Math.round(location.coords.longitude) : null;

    const { fixedCoords, cloudiness, bzLevel, auroraScore, alertLevel } = FetchItems(myLat, myLon);
 
    const currentTime = new Date().toLocaleString();
    const myLocation = useContext(LocationContext);


    return (

        <View style={styles.container}>
            <Title style={styles.title}>
                Welcome
            </Title>  
            <View>
                <Title>
                    Current conditions
                </Title>
                <Text>The chances of aurora lights right now are {alertLevel}</Text>
                <Text>Your coordinates: {fixedCoords[0] + ", " + fixedCoords[1] || 'Loading...'}  </Text>
                <Text>
                    Aurora Intensity: {fixedCoords[2] !== undefined ? `${fixedCoords[2]}%` : 'Loading...'}
                </Text>

                <Text>Cloudiness: {cloudiness !== null ? `${cloudiness}` : 'Loading...'}</Text>
                <Text>BZ Level: {bzLevel !== null ? bzLevel : 'Loading...'}</Text>
            </View>
            <View style={styles.mapContainer}>
                {fixedCoords[0] && fixedCoords[1] ? (
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: myLocation.coords.latitude,
                            longitude: myLocation.coords.longitude,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: myLocation.coords.latitude,
                                longitude: myLocation.coords.longitude,
                            }}
                            title="Your location"
                            pinColor="red"
                        />
                    </MapView>
                ) : (
                    <Text>Loading Map...</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    title: {
        backgroundColor: "",
        fontFamily: "Helvetica",
        fontSize: 32,
    },
    infoContainer: {
        marginBottom: 20,
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    mapContainer: {
        width: '100%',
        height: 350,
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    map: {
        flex: 1,
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
        color: '#888',
    },
});