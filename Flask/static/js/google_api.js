const url = 'https://api.jcdecaux.com/vls/v1/stations?contract=dublin&apiKey=f9e09d85362311d1646d868797cbc7100ded0c8d'
async function getBikeData(){
    const response = await fetch(url);
    const data = await response.json();
    console.log("Station number: " + data[0].number);
    console.log("Station name: " + data[0].name);
    console.log("Station lat: " + data[0].position.lat);
    console.log("Station lng: " + data[0].position.lng);
    console.log("Bike stands available for returns: " + data[0].available_bike_stands);
    console.log("Number of bikes available: " + data[0].available_bikes);
    console.log("Number of bike stands: " + data[0].bike_stands);
} 
getBikeData()

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

    var markers = [
        {
            //42 SMITHFIELD NORTH 53.349562 -6.278198
            coords:{lat:53.349562,lng:-6.278198},
            content: '<h1> 42 SMITHFIELD NORTH </h1>'
        },
        {
            //30 PARNELL SQUARE NORTH 53.353462 -6.265305
            coords:{lat:53.353462,lng:-6.265305},
            content: '<h1> 30 PARNELL SQUARE NORTH </h1>'
        },
        {
             //54 CLONMEL STREET 53.336021 -6.26298
            coords:{lat:53.336021,lng:-6.26298},
            content: '<h1> 54 CLONMEL STREET </h1>'
        }
    ];

    //loop through info
    for (var i = 0;i< markers.length;i++){
        addMarker(markers[i]);
    }
    
    //make map markers
    function addMarker(props){
        var marker = new google.maps.Marker({
            position:props.coords,
            map:map,
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
        });
        
        if(props.content)
        var infoWindow = new google.maps.InfoWindow({
            content:props.content
        });
    
        marker.addListener('click', function(){
            infoWindow.open(map, marker);
        });
    }
    // gelocation for user
    const findUserLocation = () => {
        const status = document.querySelector('.status');
        const success = (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(latitude + ' ' + longitude)
        
        }
        const error = () => {
            status.textContent = 'error'
        }
        navigator.geolocation.getCurrentPosition(success, error);  
        
        new google.maps.Marker({
            position: {lat: latitude, lng: longitude},
            map:map,
            title: "You",
        });
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
            origin: document.getElementById("").value,
            destination: document.getElementById("").value,
            travelMode: google.maps.TravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC
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

