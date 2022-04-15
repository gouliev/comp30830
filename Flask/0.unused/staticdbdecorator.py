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


@app.route("/stations")
@functools.lru_cache(maxsize=128)
def get_stations():
    engine = get_db()
    sql = "select * from stations;"
    rows = engine.execute(sql).fetchall()
    print('#found {} stations', len(rows))
    return jsonify(stations=[dict(row.items()) for row in rows])