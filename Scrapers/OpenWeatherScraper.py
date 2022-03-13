#!/bin/usr/python

import requests  # need to pip install
import math
import time
import DatabaseAccessor
lat = "53.34399"  # lat and long of Dublin city
long = "-6.26719"
api_key = "e857655954f34ae188982244bbb23b21"


def get_weather(api_key, lat, long):
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={long}&appid={api_key}&units=metric"  # all units metric #putting lat, long, and key into request

    response = requests.get(url).json()  # requesting api data

    temp = response['main']['temp']  # temp = 'temp' of dublin
    temp = math.floor(temp) #takes away decimal places, have this hashed for extra data, but up to team

    feels_like = response['main']['feels_like']  # feels_like = 'feels_like' of dublin
    feels_like = math.floor(feels_like)

    wind_speed = response['wind']['speed']  # wind_speed = 'wind_speed' of dublin
    wind_speed = math.floor(wind_speed)

    return {  # returning data to a dictionary #overides every 60 seconds
        'temp': temp,
        'feels_like': feels_like,
        'wind_speed': wind_speed,
    }

da = DatabaseAccessor
da.create_weather_table()
while True:  # infinite loop
    start_time = time.time()  # start time is current time
    time.sleep(900 - ((time.time() - start_time) % 900))  # updates every minute

    get_weather(api_key, lat, long)  # call function
    weather = get_weather(api_key, lat, long)  # access the dictionary
    da.push_to_weather(weather)
    print(weather['temp'])  # print data #only for testing purposes
    print(weather['feels_like'])
    print(weather['wind_speed'])
