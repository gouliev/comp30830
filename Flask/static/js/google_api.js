//Initialize and add the map
function initMap() {
    //The location of Dublin
    const Dublin = { lat: 53.3459, lng: -6.2735 };
    //The map, centered at Dubli
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: Dublin,
      //default to non-satellite map
      mapTypeId: "roadmap",
      //map settings
      styles: [
        {
          "featureType": "poi",
          "stylers": [
            { "visibility": "off" }]}]
    });
    
    //bike lanes on map
    const bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);

    //json data for jcd bikes
    const url = 'https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=f9e09d85362311d1646d868797cbc7100ded0c8d'
    async function getBikeData(){
        const response = await fetch(url);
        var bikeData = await response.json();
        test(bikeData);
    }
    getBikeData()

    //loop through info from jsonto create map markers
    function test(bikeData){
    for (let i = 0; i<bikeData.length; i++){
        addMarker(bikeData[i]);
    }
    }

    //make map marker colours depending upon proportion of bikes left
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
          '<h4 style="font-family: Roboto;">' +
          String(bikeData.name) +
          "</h4>" +
          "<br>" +
          '<h4 style="font-family: Roboto;">' +
          "Available bikes: " +
          String(bikeData.available_bikes) +
          "</h4>" +
          "</br>" +
          '<h4 style="font-family: Roboto;">' +
          "Available bike stands: " +
          String(bikeData.available_bike_stands) +
          "</h4>"
        });
        
        //makes the info box if you click the box
        marker.addListener('click', function(){
            infoWindow.open(map, marker); 
        });
    }

    //gelocation for user
   const findUserLocation = () => {
        const status = document.querySelector('.status');
        const success = (position) => {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            /*https://stackoverflow.com/questions/17603738/convert-latitude-longitude-to-address*/
            //transforms current user coordinates into string
            var geocoder  = new google.maps.Geocoder();    
            var location  = new google.maps.LatLng(latitude, longitude);

            geocoder.geocode({'latLng': location}, function (results, status) {
              if(status == google.maps.GeocoderStatus.OK) {           
              var currentLocation=results[0].formatted_address;
            
            //creates map marker for current user location 
            var marker = new google.maps.Marker({
                position: {lat: latitude, lng: longitude},
                map:map,
                title: "Your current location",
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            });

            //creates text box for current user location
            var infoWindow = new google.maps.InfoWindow({
              content:
                '<h4 style="font-family: Roboto;">' +
                String(currentLocation) +
                "</h4>"
              });
              
              //makes the info box if you click the box
              marker.addListener('click', function(){
                  infoWindow.open(map, marker); 
              });
            }
          });
        }
        //returns error if no geolocation gathered
        const error = () => {
            status.textContent = 'error';
        }
        navigator.geolocation.getCurrentPosition(success, error);  
    }
    findUserLocation()
    
  //required for navigation bar
  new AutocompleteDirectionsHandler(map);
}
/*https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-directions*/
//google code for navigation bar and navigation-code
class AutocompleteDirectionsHandler {
  //gelocation for user
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
    //Specify just the place data fields that you need.
    const originAutocomplete = new google.maps.places.Autocomplete(
      originInput,
      { fields: ["place_id"] }
    );
    //Specify just the place data fields that you need.
    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput,
      { fields: ["place_id"] }
    );

    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(
      destinationInput
    );
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);

  }
  //Sets a listener on a radio button to change the filter type on Places
  //Autocomplete.
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