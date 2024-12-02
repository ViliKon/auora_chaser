import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { LocationContext } from './UserLocation';
import { FetchItems } from './FetchItems';
import MapView, { Marker } from 'react-native-maps';
import { Title } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function CurrentState() {
    const location = useContext(LocationContext);
    const myLat = location ? Math.round(location.coords.latitude) : null;
    const myLon = location ? Math.round(location.coords.longitude) : null;

    const { fixedCoords, cloudiness, bzLevel, auroraScore, alertLevel } = FetchItems(myLat, myLon);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#00ea8d', '#1e3c72', '#017ed5', '#b53dff']}
                style={styles.background}
            >
                <Title style={styles.title}>
                    Current conditions
                </Title>
                <View style={styles.info}>
                    <Text style={styles.infoText}>Your coordinates </Text>
                    <Text style={styles.infoText}>Latitude:{fixedCoords[1] || 'Loading...'} </Text>
                    <Text style={styles.infoText}>Longitude:{fixedCoords[0] || 'Loading...'}   </Text>
                    <Text style={styles.infoText}>
                        Aurora Intensity: {fixedCoords[2] !== undefined ? `${fixedCoords[2]}%` : 'Loading...'}
                    </Text>

                    <Text style={styles.infoText}>Cloudiness: {cloudiness !== null ? `${cloudiness}` : 'Loading...'}</Text>
                    <Text style={styles.infoText}>bz Level: {bzLevel !== null ? bzLevel : 'Loading...'}</Text>
                </View>
                <View style={styles.linkInfo}>
                    <Text style={styles.infoText}>
                        To learn more about space weather scales, checkout{' '}
                        <Text
                            style={styles.linkText}
                            onPress={() => Linking.openURL('https://www.swpc.noaa.gov/noaa-scales-explanation')}
                        >
                            this page!
                        </Text>
                    </Text>
                </View>
            </LinearGradient>
        </View>
    )
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
        fontFamily: "Helvetica",
        fontSize: 30,

    },
    info: {
        padding: 5,
    },
    infoText: {
        fontSize: 20
    },
    linkInfo: {
        marginTop: 15,
    },
    linkText: {
        color: "white",
    },

})