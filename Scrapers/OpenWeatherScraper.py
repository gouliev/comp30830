#!/usr/bin/python

import requests  # need to pip install
import math
import time
import DatabaseAccessor
lat = "53.34399"  # lat and long of Dublin city
long = "-6.26719"
api_key = "e857655954f34ae188982244bbb23b21"
unix = int(time.time()*1000)

def get_weather(api_key, lat, long):
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={long}&appid={api_key}&units=metric"  # all units metric #putting lat, long, and key into request

    response = requests.get(url).json()  # requesting api data

    temp = response['main']['temp']  # temp = 'temp' of dublin
    temp = math.floor(temp) #takes away decimal places, have this hashed for extra data, but up to team

    feels_like = response['main']['feels_like']  # feels_like = 'feels_like' of dublin
    feels_like = math.floor(feels_like)

    wind_speed = response['wind']['speed']  # wind_speed = 'wind_speed' of dublin
    wind_speed = math.floor(wind_speed)

    last_update = unix

    'temp': temp,
    'feels_like': feels_like,
    'wind_speed': wind_speed,
    'last_update': last_update

}

da = DatabaseAccessor
da.create_weather_table()
while True:  # infinite loop
    start_time = time.time()
    time.sleep(3600.0 - ((time.time() - start_time) % 3600.0))

    weather = get_weather(api_key, lat, long)  # access the dictionary
    da.push_to_weather(weather)

