import requests #need to pip install
import math
import time

lat = "53.3498" #lat and long of Dublin city
long = "6.2603"
api_key = "66e50250e7bb61902cd01ad6cc2c4c4f"

def get_weather(api_key, lat, long):
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={long}&appid={api_key}&units=metric" #all units metric #putting lat, long, and key into request

    response = requests.get(url).json() #requesting api data

    temp = response['main']['temp'] #temp = 'temp' of dublin
    #temp = math.floor(temp) #takes away decimal places, have this hashed for extra data, but up to team 

    feels_like = response['main']['feels_like']#feels_like = 'feels_like' of dublin
    #feels_like = math.floor(feels_like)

    wind_speed = response['wind']['speed']#wind_speed = 'wind_speed' of dublin
    #wind_speed = math.floor(wind_speed)
    
    return { #returning data to a dictionary #overides every 60 seconds
        'temp': temp, 
        'feels_like': feels_like,
        'wind_speed': wind_speed,
    }

while True: #infinite loop
    start_time = time.time()#start time is current time
    time.sleep(60.0 - ((time.time() - start_time) % 60.0)) #updates every minute 
    
    get_weather(api_key, lat, long)#call function
    weather = get_weather(api_key, lat, long) #access the dictionary 
    #print(weather['temp'])#print data #only for testing purposes
    #print(weather['feels_like'])
    #print(weather['wind_speed'])
    #key error for description may be incorrect api call, wrong index (message for Rhys)
