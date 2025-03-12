import requests

def fetch_intesnity():
    url = "https://services.swpc.noaa.gov/json/ovation_aurora_latest.json"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        raise Exception("Failed to fetch data. Status code: {response.status_code}")    
    
    
