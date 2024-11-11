import { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native'
import { Card, IconButton } from 'react-native-paper';
import UserLocation, { LocationContext } from './UserLocation';



export default function Home(onLocationUpdate) {

    const [repositories, setRepositories] = useState([]);
    const [fixedCoords, setFixedCoords] = useState([]);
    const [loading, setLoading] = useState(false);

    const location = useContext(LocationContext);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://services.swpc.noaa.gov/json/ovation_aurora_latest.json`);
            const data = await response.json();
            console.log('Fetched Data:', data);
            setRepositories(data);
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    };

    const checkCoordinate = async () => {
        const myLocation = Math.round(location.coords.latitude, 0);
        for (i = 0; i < repositories.coordinates.length; i++) {
            const firstCoordinate = repositories.coordinates[i];
            const [longitude, latitude, aurora] = firstCoordinate;
            console.log("mineL", myLocation)
            if(latitude == myLocation) {
            console.log("lat", latitude); 
            } else {

            }
        }
    }
    useEffect(() => {
        fetchData();
        checkCoordinate();

        const interval = setInterval(() => {
            fetchData();
            checkCoordinate();
        }, 100000);

        return () => clearInterval(interval);
    }, []);

    const calculateDistance = (aLat, aLon, uLat, uLon) => {
        const radius = 6371;
        const dLat = (uLat - aLat) * (Math.PI / 180);
        const dLon = (uLon - aLon) * (Math.PI / 180);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(aLat * (Math.PI / 180)) *
            Math.cos(uLat * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = radius * c;
        return distance;
    }

    // const filterAuroraData = () => {
    //       return repositories.flatMap(item =>
    //        item.coordinates.map(coord => {
    //             const auroraLat = coord[1];
    //              const auroraLon = coord[0];
    //             const userLat = location.coords.latitude;
    //            const userLon = location.coords.longitude;
    //       const distance = calculateDistance(userLat, userLon, auroraLat, auroraLon);
    //     return distance < 500;
    //        })
    //       );





    return (
        <View style={styles.container}>

            <FlatList
                style={{ width: '90%', marginTop: 10 }}
                data={repositories.coordinates}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <Card style={{ margin: 10 }}>
                        <Card.Title title={`Longitude: ${item[0]} , Latitude: ${item[1]}`} />
                        <Card.Content>
                            <Text variant="bodyMedium">
                                Aurora Intensity: {item[2]}
                            </Text>
                            <Text>

                            </Text>

                        </Card.Content>
                        <Card.Actions>
                            <IconButton icon="web"
                                onPress={() => handleBrowser(item.html_url)} />
                        </Card.Actions>
                    </Card>
                }
            />

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 150,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


//https://services.swpc.noaa.gov/products/solar-wind/
//Dont alert while cloudy
//https://services.swpc.noaa.gov/products/alerts.json
//https://www.swpc.noaa.gov/noaa-scales-explanation
//https://opendata.fmi.fi/timeseries?format=json&timeformat=sql&producer=opendata&timestep=10m&starttime=-2h&endtime=0h&param=stationname,utctime,nanmean(nanmean_t(Cloudiness/1h))%20as%20Cloudiness&latlon=61.23,25.25:50
//https://opendata.fmi.fi/timeseries?format=json&timeformat=sql&producer=opendata&timestep=10m&starttime=-2h&endtime=0h&param=stationname,utctime,nanmean(nanmean_t(Cloudiness/1h))%20as%20Cloudiness&place=Helsinki:50
//https://services.swpc.noaa.gov/products/solar-wind/mag-2-hour.json
//https://github.com/fmidev/smartmet-plugin-timeseries/blob/master/docs/Using-the-Timeseries-API.md
//bz_gsm -5 verylight, -10 light, -15 
// time 1 hour -5 !, 1 hour -10
//average bz and check time and level (1 hour)