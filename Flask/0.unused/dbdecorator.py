from flask import Flask, g, jsonify
app = Flask(__name__)


URI = 'dbikes14.cumg3hfmqkkj.eu-west-1.rds.amazonaws.com'
PORT = '3306'
DB = 'project14'
USER = 'admin'
PASSWORD = 'Project14!'
ENGINE = create_engine("mysql+mysqldb://{}:{}@{}:{}/{}".format(USER, PASSWORD, URI, PORT, DB), echo=True)
def connect_to_database():
    return ENGINE


def get_db():
    db = getattr(g, '_database')
    if db is None:
        db = g._database = connect_to_database()
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database')
    if db is not None:
        db.close()

@app.route("/available/<int:station_id>")
def get_stations():
    engine = get_db()
    data = []
    rows = engine.execute("select bikes and MAX(last_update) from availability where number = {};".format(station_id))
    for row in rows:
        data.append(dict(row))
    return jsonify(available=data)

