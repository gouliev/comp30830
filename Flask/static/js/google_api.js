// Initialize and add the map
function initMap() {
    // The location of Dublin
    const Dublin = { lat: 53.345556, lng: -6.262778 };
    // The map, centered at Dublin
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 13,
      center: Dublin,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    const url = 'https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=f9e09d85362311d1646d868797cbc7100ded0c8d'
    async function getBikeData(){
        const response = await fetch(url);
        var bikeData = await response.json();
        test(bikeData);
    }
    getBikeData()

    //loop through info
    function test(bikeData){
    for (let i = 0; i<=bikeData.length; i++){
        addMarker(bikeData[i]);
    }
    }
    
    //make map markers
    function addMarker(bikeData){
        var marker = new google.maps.Marker({
            position: {lat:bikeData.position.lat,lng:bikeData.position.lng},
            map:map,
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        });
        
        var infoWindow = new google.maps.InfoWindow({
            content: '<h1>' + String(bikeData.name) + '</h1>' + '<br>' + 
            '<p>' + 'Available bikes: ' + String(bikeData.available_bikes) + '</p>' + '</br>' + 
            '<p>' + 'Available bike stands: ' + String(bikeData.available_bike_stands) + '</p>' + '</br>' +
            '<p>' + 'Is open: ' + String(bikeData.status) + '</p>' + '</br>' +
            '<p>' + 'Is card accepted: ' + String(bikeData.banking) + '</p>' + '</br>' +
            '<button onclick="myFunction()">Find route</button>'

        });
    
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
                title: "You",
            });
        }
        const error = () => {
            status.textContent = 'error';
        }
        navigator.geolocation.getCurrentPosition(success, error);     
    }
    findUserLocation()

    /*
    var changeColor = function(obj){

        if(obj.value < 6){
          obj.style.backgroundColor = 'green';
        } else if(obj.value >= 6 && obj.value <= 9){
          obj.style.backgroundColor = 'orange';
        } else if(obj.value > 9){
          obj.style.backgroundColor = 'red';
        }
      };*/


/*
// from user location to selected area    
    //directions service and directions renderer and bind to map
    var directionsService = new google.maps.DirectionsService();
    var DirectionsDisplay = new google.maps.DirectionsRenderer();
    DirectionsDisplay.setMap(map)

    function route(){
    //request
        var request = {
            origin: findUserLocation(position),
            destination: document.getElementById("").value,
            travelMode: google.maps.TravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC,
        }
    //pass in request
    directionsService.route(request, (result,status) => {
        if status == google.maps.DirectionsStatus.Ok) {
            //distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("").value + ".<br />To: " + document.getElementById("").value + ".<br />Walking distance " + result.route[0].legs[0].distance.text + ".<br />Duration" + result.route[0].legs[0].duration.text + ". </div";
            //disply route
            DirectionsDisplay.setDirections(result);
        } else {
            //delete route
            DirectionsDisplay.setDirections({routes:[]});
            //error message
            output.innerHTML = "<div class = 'alert-danger'> Could not retrieve walking distance. </div>";
        }
    });
    }*/
    
}

