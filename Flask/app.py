from flask import Flask, render_template
import requests 
import pickle
import json
import datetime


app = Flask(__name__)
app.config['DEBUG'] = True

URI = 'bikes14backup.cgrqjxkmxcl9.eu-west-1.rds.amazonaws.com'
PORT = '3306'
DB = 'project14'
USER = 'admin'
PASSWORD = 'Project14!'
ENGINE = create_engine("mysql+mysqldb://{}:{}@{}:{}/{}".format(USER, PASSWORD, URI, PORT, DB), echo=True)

monday = pickle.load(open('./static/monday.pkl', 'rb'))
tuesday = pickle.load(open("./static/tuesday.pkl", "rb"))
wednesday = pickle.load(open("./static/wednesday.pkl", "rb"))
thursday = pickle.load(open("./static/thursday.pkl", "rb"))
friday = pickle.load(open("./static/friday.pkl", "rb"))
saturday = pickle.load(open("./static/saturday.pkl", "rb"))
sunday = pickle.load(open("./static/sunday.pkl", "rb"))

def connect_to_database():
    return ENGINE
# code provided in class 
def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = connect_to_database()
    return db

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


# station route
@app.route("/stations")
# @functools.lru_cache(maxsize=128)
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
    rows = engine.execute("SELECT bikes, time(last_update ) as hour FROM availability where number={}  group by hour( last_update ) asc;".format(number))
    #rows = engine.execute("SELECT bikes, dayname( last_update ) as day,hour( last_update ) as hours From availability where number={} group by dayname( last_update ),hours( last_update );".format(station_id))
    for row in rows:
        data.append(dict(row))
    print(data)
    return jsonify(available_bikes=data)




# prediction call JS route
@app.route("/prediction", methods=['GET', 'POST'])
def prediction_model():
    import numpy as np

    # evaluate JS selection
    data = request.args.get('post', 0, type=str)
    data = data.split()
    d = datetime.datetime.strptime(date, "%Y-%m-%d")
    date = d.strftime("%A")
    number = int(data[0])
    d = datetime.datetime.strptime(time, "%H")
    time = int(d.time)
    prediction_request = [[number, time, day]]
    if day == "Monday":
        x = monday.predict(prediction_request)
    if day == "Tuesday":
        x = tuesday.predict(prediction_request)
    if day == "Wednesday":
        x = wednesday.predict(prediction_request)
    if day == "Thurday":
        x = thursday.predict(prediction_request)
    if day == "Friday":
        x = friday.predict(prediction_request)
    if day == "Saturday":
        x = saturday.predict(prediction_request)
    if day == "Sunday":
        x = sunday.predict(prediction_request)
    print("Predicted Availability for this Station", int(x[0]))
    prediction = [int(x[0])]
    return json.dumps(prediction)


if __name__ == '__main__':
    app.run()
