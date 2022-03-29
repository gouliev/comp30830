// Initialize and add the map
function initMap() {
    // The location of Dublin
    const Dublin = { lat: 53.345556, lng: -6.262778 };
    // The map, centered at Dublin
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: Dublin,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          "featureType": "poi",
          "stylers": [
            { "visibility": "off" }
          ]
        }
      ]
    });

    /*
}
new AutocompleteDirectionsHandler(map);
class AutocompleteDirectionsHandler {
  map;
  originPlaceId;
  destinationPlaceId;
  travelMode;
  directionsService;
  directionsRenderer;
  constructor(map) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.WALKING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);

    const originInput = document.getElementById("origin-input");
    const destinationInput = document.getElementById("destination-input");
    const modeSelector = document.getElementById("mode-selector");
    // Specify just the place data fields that you need.
    const originAutocomplete = new google.maps.places.Autocomplete(
      originInput,
      { fields: ["place_id"] }
    );
    // Specify just the place data fields that you need.
    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput,
      { fields: ["place_id"] }
    );

    this.setupClickListener(
      "changemode-walking",
      google.maps.TravelMode.WALKING
    );
    this.setupClickListener(
      "changemode-transit",
      google.maps.TravelMode.TRANSIT
    );
    this.setupClickListener(
      "changemode-driving",
      google.maps.TravelMode.DRIVING
    );
    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      destinationInput
    );
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
  }
  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  setupClickListener(id, mode) {
    const radioButton = document.getElementById(id);

    radioButton.addEventListener("click", () => {
      this.travelMode = mode;
      this.route();
    });
  }
  setupPlaceChangedListener(autocomplete, mode) {
    autocomplete.bindTo("bounds", this.map);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
      } else {
        this.destinationPlaceId = place.place_id;
      }

      this.route();
    });
  }
  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      return;
    }

    const me = this;

    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
      },
      (response, status) => {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
    }
    }
    */

    //json data for jcd bikes
    const url = 'https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=f9e09d85362311d1646d868797cbc7100ded0c8d'
    async function getBikeData(){
        const response = await fetch(url);
        var bikeData = await response.json();
        test(bikeData);
        //test2(bikeData);
    }
    getBikeData()

    //loop through info
    function test(bikeData){
    for (let i = 0; i<bikeData.length; i++){
        addMarker(bikeData[i]);
    }
    }

    /*
    //making array for navigation bar
    function test2(bikeData){
    var arr = [];
    for (let i = 0; i < 1; i++) {
        arr.push({
            key: String(bikeData.name)
        });
    }
    console.log(arr)
    }
    test2()*/

    //make map markers depending upon proportion of bikes left
    function addMarker(bikeData){
        var bikeIconSelect = bikeData.available_bikes / bikeData.bike_stands;
        if (bikeIconSelect>=.4){
            bike_icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        } else if (bikeIconSelect>.2 && bikeIconSelect<.4){
            bike_icon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
        } else {
            bike_icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        }

        //Makes markers with coords from bike.data
        var marker = new google.maps.Marker({
            position: {lat:bikeData.position.lat,lng:bikeData.position.lng},
            map:map,
            icon: bike_icon
        });
        
        //creates markers with info box with information
        var infoWindow = new google.maps.InfoWindow({
        content:
          "<h1>" +
          String(bikeData.name) +
          "</h1>" +
          "<br>" +
          "<p>" +
          "Available bikes: " +
          String(bikeData.available_bikes) +
          "</p>" +
          "</br>" +
          "<p>" +
          "Available bike stands: " +
          String(bikeData.available_bike_stands) +
          "</p>" +
          "</br>" +
          "<p>" +
          "Is open: " +
          String(bikeData.status) +
          "</p>" +
          "</br>" +
          "<p>" +
          "Is card accepted: " +
          String(bikeData.banking) +
          "</p>" +
          "</br>" +
          '<button onclick="myFunction">' +
          "Click me" +
          "</button>" +
          '<p id="demo">' +
          "</p>",
        });
        
        //makes the info box if you click the box
        marker.addListener('click', function(){
            infoWindow.open(map, marker); 
        });
    }

    // gelocation for user
   const findUserLocation = () => {
        const status = document.querySelector('.status');
        const success = (position) => {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            new google.maps.Marker({
                position: {lat: latitude, lng: longitude},
                map:map,
                title: "Your current location",
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            });
        }
        const error = () => {
            status.textContent = 'error';
        }
        navigator.geolocation.getCurrentPosition(success, error);     
    }
    findUserLocation()

    /*
    function routeFunction(){
    // from user location to selected area    
    //directions service and directions renderer and bind to map        
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    
        function calcRoute(){
        //request
        var request = {
            origin: {lat: 53.3493, lng: -6.2607},//function marker poisition on click
            destination: {lat: 53.3607, lng: -6.2512},//function find user location position
            travelMode: google.maps.TravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC,
        }
        //pass in request
        directionsService.route(request, (result,status) => {
            if (status == google.maps.DirectionsStatus.OK) {
                //disply route
                directionsDisplay.setDirections(result);
            } else {
                //error message
                output.innerHTML = "<div class = 'alert-danger'> Could not retrieve walking distance. </div>";
                
            }
        });

        }
        calcRoute()
    }*/
  }
  
