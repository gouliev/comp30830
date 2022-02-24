# Dublin Bikes

COMP30830: SWE Dublin Bike Application: COMP30830. This web application allows user to view live information regarding Dublin Bikes. The data is pulled from the JCD and OpenWeather API. This GitHub is for educational purposes and is apart of a module called COMP30830. It contains 3 authors.

This is a web application built using different tools, languages and technologies (AWS, Python, API, JavaScript, CSS, SQL, RDS and more). It is still in development and the goal of the app is to display real time information regarding Dublin Bikes.

Owners: The authoris are Victoria Keane, Rhys O' Dowd and Zaur Gouliev. https://github.com/Victoria98k https://github.com/rhys-o-dowd https://github.com/gouliev/

## Database

### Set Up
Edit the global variables at the top of the DatabaseAccessor file as required.
To set the password create an environment variable and populate it with the correct password `export PASSWORD=<password>`. 
If you are using PyCharm set the environment variable by selecting `Edit Configurations` in the top bar, selecting `environment variables`
and adding a new variable `PASSWORD=<password>`.

### Create + Populate Static Database
To populate the static database simply run the file PopulateStaticDB.py, this should only have to be populated once.

###  Create + Populate Dynamic Database
When JCDScrapper is run the dynamic database is created automatically if it does not already exist, the scraper then
runs and the dynamic database is populated with the data found, new values are added to the db every 60 seconds when the
scraper runs again.
