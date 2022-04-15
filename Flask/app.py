from flask import Flask, render_template, request
import numpy as np
import requests
import pickle
from pandas._libs import json
from flask_cors import CORS

# imported CORS to bypass CORS policy that was preventing JS from accessing the API
app = Flask(__name__)
CORS(app)
app.config['DEBUG'] = True


@app.route('/')
def index():
    lat = "53.3498"
    long = "-6.2603"
    api_key = "66e50250e7bb61902cd01ad6cc2c4c4f"
    url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={long}&appid={api_key}&units=metric"
    response = requests.get(url).json()

    weather = {
        'feels_like': response['main']['feels_like'],
        'description': response['weather'][0]['description'],
        'icon': response['weather'][0]['icon']
    }
    print(weather)
    return render_template('index.html', weather=weather)

# prediction accesses a cache of over 700 pickled data models that trained
# bike availability for each station on each day of the week
@app.route("/prediction", methods=['GET'])
def prediction():
    # gets station from html/JS request
    station_num = request.args.get('station_num')
    # gets day from html/JS request
    day = request.args.get('day').lower()
    # creates array instance with evenly spaced values
    times = np.arange(24)
    times_feature = times.reshape(-1, 1)  # shapes array for function compatability
    model = None

    # uses JS data to access relevant pickle file
    with (open(f"comp30830/Flask/static/stations/{station_num}/{day}.pkl", "rb")) as openfile:
        model = pickle.load(openfile)
        
    result = model.predict(times_feature)
    data = {'hour': times, 'prediction': result}
    return json.dumps(data)
    # dumps trained prediction arrays into a JSON file

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=443)
