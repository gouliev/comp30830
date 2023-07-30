**Biking Dublin Application**


![image](https://github.com/gouliev/comp30830/assets/91686296/1d6f8086-754a-42e7-9633-05c061cdfa05)

**Contributors:**  
Zaur Gouliev, Rhys O Dowd, Olivia Keane

The "Biking Dublin" application was created to collect real-time data from the JCDecaux API about Dublin City Bikes' usage on a daily basis. This data was collected using an Amazon Web Service instance, EC2, and stored in a SQLite database. The main goal is to predict the availability of bikes at different stations and times for users looking to rent or return a bicycle.


![image](https://github.com/gouliev/comp30830/assets/91686296/c8247a78-df78-414c-95f1-03b02fcac360)

**Contents of this File:**

- Introduction
- Requirements
- Recommended Modules
- Installation
- Configuration
- Troubleshooting
- FAQ
- License

**Introduction:**

The "Biking Dublin" application provides users with up-to-date information about bike availability for hiring and returning at various bike stations throughout Dublin city. It also offers historical data on daily and hourly bike availability for different stations.


![image](https://github.com/gouliev/comp30830/assets/91686296/ada42300-29ab-4984-976b-bf3fb577a439)

**Requirements:**

This module requires the following modules:

- Python 3.X: [https://www.python.org/downloads/](https://www.python.org/downloads/)
- Pandas library for Python: [https://pypi.python.org/pypi/pandas/](https://pypi.python.org/pypi/pandas/)
- Flask framework version 0.10.1: [https://pypi.python.org/pypi/Flask](https://pypi.python.org/pypi/Flask)
- SQLite to connect the web application to the database: [https://www.sqlite.org/download.html](https://www.sqlite.org/download.html)

**Recommended Modules:**

- Python 3.5.0: [https://www.python.org/downloads/release/python-350/](https://www.python.org/downloads/release/python-350/)
- Pandas 0.18 library for Python: [https://pypi.python.org/pypi/pandas/0.18.0/#downloads](https://pypi.python.org/pypi/pandas/0.18.0/#downloads)

**Installation:**

Once all the required modules are installed on your computer, you can launch the HTML file, which will integrate with the SQL database using the Flask framework to fetch data based on user input.

![Alt text](/Documentation/Architecture.jpg?raw=true "Web App Architecture")

You may modify the source code on the webpage (HTML, JavaScript files) if you prefer to use the pandas library to generate static graphs for visualization. Otherwise, keep the Google Charts script as the default setup for interactive graphs.

**Configuration:**

The website application is designed to function without the need for configuration.

- Select the stations from the drop-down menu to view information about a specific station.
- Additional information can be accessed by choosing a particular day to see the bike station's hourly availability.

The graph displayed is interactive and provides detailed information when the mouse hovers over it.

**Troubleshooting:**

If the application does not display correctly, check the following:

- Ensure that the HTML file is in the same folder as the CSS file, Python file, and SQLite databases.
- Make sure your browser is not older than:
  - Internet Explorer 7
  - Firefox 43
  - Safari 9.1
  - Chrome 48

The "Biking Dublin" application is licensed under the MIT License:

```
The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
