from fastapi import FastAPI
from intensityFetch import fetch_intesnity
from cloudFetch import fecth_cloud_data 
from bzFetch import fecth_bz

app = FastAPI()

@app.get("/intensityData")
def getdata():
    try:
        
        intensity_data = fetch_intesnity()
        
        return intensity_data
    
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/cloudData")
def getdata():
    try:
        
        cloud_data = fecth_cloud_data()
        
        return cloud_data
    
    except Exception as e:
        return {"error": str(e)}


@app.get("/bzData")
def getdata():
    try:
        
        bz_data = fecth_bz()
        
        return bz_data
    
    except Exception as e:
        return {"error": str(e)}
