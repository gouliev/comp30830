from flask import Flask, render_template
import requests 

app = Flask(__name__)
app.config['DEBUG'] = True

@app.route('/')
def index():
    lat = "53.3498" 
    long = "-6.2603"
    api_key = "57c745b64650ac91012e9b0215ac7b1e"
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={long}&appid={api_key}&units=metric"
    response = requests.get(url).json()

    weather = {
        'feels_like': response['main']['feels_like'],
        'description': response['weather'][0]['description'],
        'icon': response['weather'][0]['icon']
    }
    print(weather)
    return render_template('index.html', weather=weather)

if __name__ == '__main__':
    app.run()