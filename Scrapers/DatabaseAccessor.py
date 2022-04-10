#!/usr/bin/python
from sqlalchemy import create_engine
import json


# establish DB connection parameters and connect using create_engine function from SQLAlchemy
URI = 'dbikes14backup.cgrqjxkmxcl9.eu-west-1.rds.amazonaws.com'
PORT = '3306'
DB = 'project14'
USER = 'admin'
PASSWORD = 'Project14!'
ENGINE = create_engine("mysql+mysqldb://{}:{}@{}:{}/{}".format(USER, PASSWORD, URI, PORT, DB), echo=True)

def create_availability_table():
    #send SQL query to database to create table
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
    last_update BIGINT(14)
    )
    """
    try:
        res = ENGINE.execute(sql)
        print(res.fetchall())
    except Exception as e:
        print(e)

def push_row_to_db(data: dict):
    #insert api data into table
    try:
        res = ENGINE.execute(
            f"INSERT INTO availability values('{data['number']}','{data['name']}','{data['status']}','{data['latitude']}','{data['longitude']}','{data['bikes']}','{data['stands']}','{data['banking']}','{data['last_update']}')")
        print(res.fetchall())
    except Exception as e:
        print(e)

def create_weather_table():
    sql = """
    CREATE TABLE IF NOT EXISTS weather (
    temp INTEGER, 
    feels_like INTEGER,
    wind_speed INTEGER,
    last_update BIGINT(14)
    )
    """
    try:
        res = ENGINE.execute(sql)
        print(res.fetchall())
    except Exception as e:
        print(e)

def push_to_weather(data: dict):
    try:
        res = ENGINE.execute(
            f"INSERT INTO weather values('{data['temp']}','{data['feels_like']}','{data['wind_speed']}','{data['last_update']})'")
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
    #populate new table with installed file
    file = open('/Users/os/comp30830/Scrapers/dublin.json')
    stations = json.load(file)
    for station in stations:
        vals = (int(station.get('number')), station.get('name'), station.get('address'),
                station.get('latitude'), station.get('longitude'))
        try:
            res = ENGINE.execute("INSERT INTO stations values(%s, %s, %s, %s, %s)", vals)
            print(res.fetchall())
        except Exception as e:
            print(e)
