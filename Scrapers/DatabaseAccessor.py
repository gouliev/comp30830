from sqlalchemy import create_engine
import json
import os

URI = 'project14rds.cfxfzxiykuet.us-east-1.rds.amazonaws.com'
PORT = '3306'
DB = 'project14'
USER = 'admin'
PASSWORD = os.getenv('PASSWORD')
ENGINE = create_engine("mysql+mysqldb://{}:{}@{}:{}/{}".format(USER, PASSWORD, URI, PORT, DB), echo=True)

def create_availability_table():
    sql = """
    CREATE TABLE IF NOT EXISTS availability (
    number INTEGER, 
    address VARCHAR(256),
    status VARCHAR(256),
    position_lat REAL, 
    position_lng REAL,
    bikes INTEGER,
    bike_stands INTEGER,
    banking VARCHAR(10),
    last_update INTEGER
    )
    """
    try:
        res = ENGINE.execute(sql)
        print(res.fetchall())
    except Exception as e:
        print(e)

def push_row_to_db(data: dict):
    try:
        res = ENGINE.execute(
            f"INSERT INTO availability values('{data['number']}','{data['name']}','{data['status']}','{data['latitude']}','{data['longitude']}','{data['bikes']}','{data['stands']}','{data['banking']}','{data['last_update']}')")
        print(res.fetchall())
    except Exception as e:
        print(e)

def create_static_table():
    sql = """
    CREATE TABLE IF NOT EXISTS stations (
    number INTEGER, 
    name VARCHAR(256),
    address VARCHAR(256),
    latitude REAL, 
    longitude REAL
    )
    """
    try:
        res = ENGINE.execute(sql)
        print(res.fetchall())
    except Exception as e:
        print(e)

def populate_static_table():
    file = open('dublin.json')
    stations = json.load(file)
    for station in stations:
        vals = (int(station.get('number')), station.get('name'), station.get('address'),
                station.get('latitude'), station.get('longitude'))
        try:
            res = ENGINE.execute("INSERT INTO stations values(%s, %s, %s, %s, %s)", vals)
            print(res.fetchall())
        except Exception as e:
            print(e)
