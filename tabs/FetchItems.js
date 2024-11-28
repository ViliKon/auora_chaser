import { useState, useEffect } from 'react';

const useAlerts = (cloudiness, bzLevel, auroraIntensity, bzDuration) => {
    let score = 0;
    let alertLevel = "unlikely";

    // Calculate aurora score
    if (cloudiness <= 3) score += 30;
    else if (cloudiness <= 5) score += 15;

    if (bzLevel <= -40) score += 40;
    else if (bzLevel <= -30) score += 30;
    else if (bzLevel <= -20) score += 20;
    else if (bzLevel <= -10) score += 10;

    if (auroraIntensity >= 75) score += 30;
    else if (auroraIntensity >= 50) score += 20;
    else if (auroraIntensity >= 30) score += 10;

    if (bzDuration >= 60) score += 20;
    else if (bzDuration >= 30) score += 10;

   
    if (score >= 80) alertLevel = "high";
    else if (score >= 50) alertLevel = "moderate";
    else if (score >= 30) alertLevel = "low";
    return { auroraScore: score, alertLevel };
};

export const FetchItems = (myLat, myLon) => {
    const [auroraRepositories, setAuroraRepositories] = useState([]);
    const [cloudiness, setCloudiness] = useState(null);
    const [bzLevel, setBzLevel] = useState(null);
    const [fixedCoords, setFixedCoords] = useState([]);
    const [bzStartTime, setBzStartTime] = useState(null);
    const [bzDuration, setBzDuration] = useState(0);

    const fetchAurora = async () => {
        try {
            const response = await fetch(`https://services.swpc.noaa.gov/json/ovation_aurora_latest.json`);
            const data = await response.json();
            setAuroraRepositories(data);
        } catch (error) {
            console.error('Error fetching aurora data:', error);
        } 
    };

    const checkCoordinate = () => {
        if (!auroraRepositories.coordinates || !myLat || !myLon) return;


        const tolerance = 0.1;


        const myInfo = auroraRepositories.coordinates.find(([longitude, latitude, aurora]) => {
            return (
                Math.abs(latitude - myLat) <= tolerance &&
                Math.abs(longitude - myLon) <= tolerance
            );
        });


        if (myInfo) {
            setFixedCoords(myInfo);
        } else {
            setFixedCoords([]);
        }
    };

    const fetchClouds = async () => {
        try {
            const response = await fetch(
                `https://opendata.fmi.fi/timeseries?format=json&timeformat=sql&producer=opendata&timestep=10m&starttime=-2h&endtime=0h&param=stationname,utctime,nanmean(nanmean_t(Cloudiness/1h))%20as%20Cloudiness&latlon=${myLat},${myLon}:50`
            );
            const data = await response.json();
            setCloudiness(data[data.length - 1]?.Cloudiness || null);
        } catch (error) {
            console.error('Error fetching cloudiness data:', error);
        }
    };

    const fetchbz = async () => {
        try {
            const response = await fetch(`https://services.swpc.noaa.gov/products/solar-wind/mag-2-hour.json`);
            const data = await response.json();
            setBzLevel(data[data.length - 1]?.[3] || null);
        } catch (error) {
            console.error('Error fetching bz data:', error);
        }
    };

    useEffect(() => {
        fetchAurora();
        fetchClouds();
        fetchbz();

        const interval = setInterval(() => {
            fetchAurora();
            fetchClouds();
            fetchbz();
        }, 60000);

        return () => clearInterval(interval);
    }, [myLat, myLon]);

    useEffect(() => {
        checkCoordinate();
    }, [auroraRepositories]);

    useEffect(() => {
        if (bzLevel <= -10) {
            if (!bzStartTime) setBzStartTime(new Date());
            else {
                const elapsedMinutes = (new Date() - bzStartTime) / (1000 * 60);
                setBzDuration(elapsedMinutes);
            }
        } else {
            setBzStartTime(null);
            setBzDuration(0);
        }
    }, [bzLevel, bzStartTime]);


    const { auroraScore, alertLevel } = cloudiness !== null && bzLevel !== null && fixedCoords[2] !== undefined
        ? useAlerts(cloudiness, bzLevel, fixedCoords[2], bzDuration)
        : { auroraScore: 0, alertLevel: 'Unlikely' };

    return { fixedCoords, cloudiness, bzLevel, auroraScore, alertLevel };
};
