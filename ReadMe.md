# Dublin Bikes

## Database

### Set Up
Edit the global variables at the top of the DatabaseAccessor file as required.
To set the password create an environment variable and populate it with the correct password `export PASSWORD=<password>`. 
If you are using PyCharm set the environment variable by selecting `Edit Confirations` in the top bar, selecting `environment variables`
and adding a new variable `PASSWORD=<password>`.

### Create + Populate Static Database
To populate the static database simply run the file PopulateStaticDB.py, this should only have to be populated once.

###  Create + Populate Dynamic Database
When JCDScrapper is run the dynamic database is created automatically if it does not already exist, the scraper then
runs and the dynamic database is populated with the data found, new values are added to the db every 60 seconds when the
scraper runs again.
