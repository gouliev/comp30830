function updateChart(station, day) {
  var station = station;
  var day = day;
  var availabilityPrediction;
  async function getData(station, day) {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      "http://localhost:5000/prediction?day=" + day + "&station_num=" + station,
      requestOptions
    )
      .then((response) => response.json())
      .then((availabilityPrediction) => console.log(availabilityPrediction))
      .catch((error) => console.log("error", error));
    return availabilityPrediction;
  }

  getData(station, day).then((availabilityPrediction) => {
    const bikeAvailability = availabilityPrediction.prediction[0];
    console.log(bikeAvailability);
    myChart.update;
  });
  console.log(bikeAvailability);
}

const data = {
  labels: [
    "12am",
    "1am",
    "2am",
    "3am",
    "4am",
    "5am",
    "6am",
    "7am",
    "8am",
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm",
    "9pm",
    "10pm",
    "11pm",
  ],
  datasets: [
    {
      label: "Weekly Sales",
      data: bikeAvailability,
      backgroundColor: [
        "rgba(255, 26, 104, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(0, 0, 0, 0.2)",
      ],
      borderColor: [
        "rgba(255, 26, 104, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(0, 0, 0, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
const config = {
  type: "bar",
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};
const myChart = new Chart(document.getElementById("myChart"), config);
