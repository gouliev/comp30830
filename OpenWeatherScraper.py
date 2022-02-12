import requests 
import math

lat = "53.3498"
long = "6.2603"
api_key = "66e50250e7bb61902cd01ad6cc2c4c4f"

def get_weather(api_key, lat, long):
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={long}&appid={api_key}&units=metric"
    #all units metric

    response = requests.get(url).json()
    #weather_description = requests.get(url).json() have to figure this out - how to pull a string

    name = response['name'] #the long/lat is correct yet for name i am getting a village in the netherlands, maybe the weather station?
    
    temp = response['main']['temp']
    temp = math.floor(temp)

    feels_like = response['main']['feels_like']
    feels_like = math.floor(feels_like)

    wind_speed = response['wind']['speed']

    visibility = response['visibility']

    
    return { #return to dictionary
        'name': name,
        'temp': temp,
        'feels_like': feels_like,
        'wind_speed': wind_speed,
        'visibility': visibility
    }
    
weather = get_weather(api_key, lat, long) #access the dictionary 
print(weather['name'])
print(weather['temp'])
print(weather['feels_like'])
print(weather['wind_speed'])
print(weather['visibility'])