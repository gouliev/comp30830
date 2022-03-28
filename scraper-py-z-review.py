"""

Zaur_18718545
Code review, testing to see for bugs or any errors, or any way to optimize it"""

# Code runs fine, sending a copy to my personal dev branch

import requests  # need to pip install
import time

'''using a station number retrieves data of that station, could be formulated another way'''

bike_stand_number = [42, 30, 54, 108, 56, 6, 18, 32, 52, 48, 13, 43, 31, 98, 23, 106, 112, 68, 74, 84, 90, 11, 45, 17,
                     114, 63, 72, 113, 99, 91, 9, 116, 67, 55, 62, 5, 97, 61, 77, 73, 4, 49, 19, 7, 60, 102, 38, 53, 58,
                     66, 104, 101, 47,
                     115, 117, 27, 8, 16, 82, 96, 76, 79, 71, 69, 51, 25, 37, 59, 95, 94, 105, 36, 22, 93, 22, 50, 110,
                     12, 34, 78, 75, 2,
                     111, 65, 26, 15, 10, 86, 100, 64, 24, 109, 85, 33, 107, 44, 89, 57, 80, 41, 3, 40, 29, 103, 28, 39,
                     83, 92, 21, 88] #every bike stand in dublin
api_key = "f9e09d85362311d1646d868797cbc7100ded0c8d"
contract_name = "dublin"


def get_JCD(contract_name, station_number, api_key):
    url = f"https://api.jcdecaux.com/vls/v1/stations/{station_number}?contract={contract_name}&apiKey={api_key}"  # api for calling specific bike stands

    response = requests.get(url).json()  # accesing api

    station_num = response['number']  # bike stand number
    station_name = response['name']  # bike stand name
    if_open = response['status']  # if station is open
    lat = response['position']['lat']  # latitude of station
    long = response['position']['lng']  # long of station
    number_bikes = response['available_bikes']  # current number of bikes
    number_stands = response['available_bike_stands']  # number of bikes that can be returned
    if_card = response['banking']  # if stand accepts credit card
    last_update = response['last_update']  # last time this data has been updated

    return {  # return all api data to a dictionary, updates every 60 seconds
        'number': station_num,
        'name': station_name,
        'status': if_open,
        'latitude': lat,
        'longitude': long,
        'bikes': number_bikes,
        'stands': number_stands,
        'banking': if_card,
        'last_update': last_update
    }

while True:
    start_time = time.time()
    time.sleep(60.0 - ((time.time() - start_time) % 60.0)) #runs script indefinitely every 60 seconds

    for a in range(len(bike_stand_number)): #for each bike station in list
        bike_data = get_JCD(contract_name, bike_stand_number[a], api_key)  #run method with specific bike station

        print(bike_data['number'],bike_data['name'],bike_data['status'],bike_data['latitude'],bike_data['longitude'],
        bike_data['bikes'],bike_data['stands'],bike_data['banking'],bike_data['last_update']) #printing for testing purposes
