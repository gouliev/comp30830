import requests #need to pip install
import math
import time

lat = "53.3498"
long = "6.2603"
api_key = "66e50250e7bb61902cd01ad6cc2c4c4f"

def get_weather(api_key, lat, long):
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={long}&appid={api_key}&units=metric" #all units metric

    response = requests.get(url).json()

    temp = response['main']['temp']
    #temp = math.floor(temp)

    feels_like = response['main']['feels_like']
    #feels_like = math.floor(feels_like)

    wind_speed = response['wind']['speed']
    #wind_speed = math.floor(wind_speed)
    
    return {
        'temp': temp,
        'feels_like': feels_like,
        'wind_speed': wind_speed,
    }

while True:
    start_time = time.time()
    time.sleep(60.0 - ((time.time() - start_time) % 60.0)) #updates every minute 
    
    get_weather(api_key, lat, long)
    weather = get_weather(api_key, lat, long) #access the dictionary 
    print(weather['temp'])
    print(weather['feels_like'])
    print(weather['wind_speed'])