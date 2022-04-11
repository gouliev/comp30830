from flask import Flask, render_template, jsonify, g, request
import numpy as np
import requests
import pickle
from sqlalchemy import create_engine
import json
from flask_cors import CORS


app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app)

URL = 'dbikes14backup.cgrqjxkmxcl9.eu-west-1.rds.amazonaws.com' # changed URI to URL, it was mispelled
PORT = '3306'
DB = 'project14'
USER = 'admin'
PASSWORD = 'Project14!'
ENGINE = create_engine("mysql+mysqldb://{}:{}@{}:{}/{}".format(USER, PASSWORD, URL, PORT, DB), echo=True)


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



def connect_to_database():
    return ENGINE

# to return the database, code used from class
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = connect_to_database()
    return db

# stations route
@app.route("/stations")
def get_stations():
    engine = get_db()
    station = []
    rows = engine.execute("SELECT * from stations;")
    for row in rows:
        station.append(dict(row))

    return jsonify(station=station)


# takes station ID and selects most recent updates 
# Code taken from class
@app.route("/stations/<int:number>")
def recent_stations(number):
    engine = get_db()
    data = []
    rows = engine.execute("SELECT bikes, time(last_update) as hour FROM availability where number={}  group by hour(last_update) asc;".format(number))
    for row in rows:
        data.append(dict(row))
    print(data)
    return jsonify(data=data)

#
@app.route("/prediction", methods=['GET'])
def prediction():
    station_num = request.args.get('station_num')
    day = request.args.get('day').lower()
    times = np.arange(24)
    times_feature = times.reshape(-1, 1)

    model = None
    with (open(f"comp30830/Flask/stations/{station_num}/{day}.pkl", "rb")) as openfile:
        model = pickle.load(openfile)
        
    result = model.predict(times_feature)
    data = {'hour': times, 'prediction': result}
    return json.dumps(data)


if __name__ == '__main__':
    app.run()