import requests

def fecth_bz():
    url = "https://services.swpc.noaa.gov/products/solar-wind/mag-2-hour.json"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        raise Exception("Failed to fetch data. Status code: {response.status_code}")    
    
