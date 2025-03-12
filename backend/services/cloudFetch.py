import requests

def fecth_cloud_data():
    userLoc = 0
    url = "https://opendata.fmi.fi/timeseries?format=json&timeformat=sql&producer=opendata&timestep=10m&starttime=-2h&endtime=0h&param=stationname,utctime,nanmean(nanmean_t(Cloudiness/1h))%20as%20Cloudiness&latlon=61.23,25.25:50"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        raise Exception("Failed to fetch data. Status code: {response.status_code}")    
    