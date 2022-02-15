#work in progress

import requests #need to pip install
import time
'''using a station number retrieves data of that station, could be formulated another way'''

api_key = "f9e09d85362311d1646d868797cbc7100ded0c8d"
station_number = "3"
city = "Dublin"

##make a list on all known bikes stands and loop through them for data

def get_JCD(city, station_number, api_key):
    #url = f"https://api.jcdecaux.com/vls/v1/stations?contract={city}&apiKey={api_key}"
    url = f"https://api.jcdecaux.com/vls/v1/stations/{station_number}?contract={city}&apiKey={api_key}" 

    response = requests.get(url).json()

    station_num = response['number']
    station_name = response['name']
    lat = response['position']['lattitude']
    long = response['position']['longitude']
    number_bikes = response['totalStands']['availabilities']['bikes']
    number_mech_bikes = response['totalStands']['availabilities']['mechanicalBikes']
    number_elec_bikes = response['totalStands']['availabilities']['electricalBikes']
    number_stands = response['totalStands']['availabilities']['stands']

    return {
        'number': station_num,
        'name': station_name,
        'lattitude': lat,
        'longitude': long,
        'bikes': number_bikes,
        'mechanicalBikes': number_mech_bikes,
        'electricalBikes': number_elec_bikes,
        'stands': number_stands,
    }


while True:
    
    start_time = time.time()
    time.sleep(60.0 - ((time.time() - start_time) % 60.0)) #updates every minute 
    
    get_JCD(city, station_number, api_key)
    bike_data = get_JCD(city, station_number, api_key) #access the dictionary 
    print(bike_data['number'])
    print(bike_data['lattitude'])
    print(bike_data['longitude'])