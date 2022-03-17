// Initialize and add the map
function initMap() {
    // The location of Dublin
    const Dublin = { lat: 53.3493, lng: -6.2607 };
    // The map, centered at Dublin
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: Dublin,
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

    for (var i = 0;i< markers.length;i++){
        addMarker(markers[i]);
    }
    
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

  }