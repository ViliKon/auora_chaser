import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LocationContext } from './UserLocation';
import { FetchItems } from './FetchItems';
import MapView, { Marker } from 'react-native-maps';
import { Title } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';


export default function Home() {
    const location = useContext(LocationContext);
    const myLat = location ? Math.round(location.coords.latitude) : null;
    const myLon = location ? Math.round(location.coords.longitude) : null;

    const { fixedCoords, cloudiness, bzLevel, auroraScore, alertLevel } = FetchItems(myLat, myLon);
    const myLocation = useContext(LocationContext);



    //Home Page
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#00ea8d', '#1e3c72', '#017ed5', '#b53dff']} 
                style={styles.background}
            >
                <Title style={styles.title}>
                    Welcome
                </Title>
                <View style={styles.visibility}>
                    <Text style={styles.infoText}>The chances of aurora lights right now are {alertLevel}</Text>
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
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    title: {
        backgroundColor: "",
        fontFamily: "Helvetica",
        fontSize: 32,
    },
    visibility: {
        marginTop: 20,
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
        marginTop: 30,
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