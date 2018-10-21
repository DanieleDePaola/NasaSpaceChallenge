var mymap;
var lati;
var longi;
var reportIcon;
$( document ).ready(function() {
  mymap = L.map('mapid').setView([45, 10], 5);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGNvbGxpbmkiLCJhIjoiY2puaGw5ZTU0MDJtcjN3bWpsc2UyZWoyZyJ9.rhC2MyJ3u9gHr44__RmPfA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);
   reportIcon = L.icon({
      iconUrl: 'ph/warning.png',
      iconSize:     [22, 22], // size of the icon
      iconAnchor:   [11, 11], // point of the icon which will correspond to marker's location
      popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  });
  mymap.on('click', function(e){
    var coord = e.latlng;
    lati = coord.lat;
    longi = coord.lng;
    console.log("You clicked the map at latitude: " + lati + " and longitude: " + longi);
    var marker = L.marker([lati, longi], {icon: reportIcon}).addTo(mymap);
    marker.bindPopup("<b>Latitude: </b>"+lati+"<br>"+"<b>Longitude: </b>"+longi+"<br>Click subit to report a fire at this coordinates").openPopup();
  });

  var fireIcon = L.icon({
      iconUrl: 'ph/fire.png',

      iconSize:     [22, 22], // size of the icon
      iconAnchor:   [12, 15], // point of the icon which will correspond to marker's location
      popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  });


  for(var i = 0; i < points.length-1; i = i+2){
    var marker = L.marker([points[i], points[i+1]], {icon: fireIcon}).addTo(mymap);
    marker.bindPopup("<b>Latitude: </b>"+points[i]+"<br>"+"<b>Longitude: </b>"+points[i+1]);
  }

  //get reports
  //openweather key :d3b28de32a9c8f6be547f85978142d77
  $.getJSON('api/signal', function(data){
    $.each(data, function( index, value ) {
      addReports(value, index);
    })
  });

  setInterval(function(){getReports()}, 20000);
});

function addReports (item, index){
  console.log(item)
  var marker = L.marker([ parseInt(item['latitude']), parseInt(item['longitude'])], {icon: reportIcon}).addTo(mymap);


   $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat="+item['latitude']+"&lon="+item['longitude']+"&appid=d3b28de32a9c8f6be547f85978142d77", function(data){
     marker.bindPopup("<b>Latitude: </b>"+item['latitude']+"<br>"+"<b>Longitude: </b>"+item['longitude']+"<br>"+
                      "<b>Weather: </b>"+data['weather'][0]['main']+"<br>"+"<b>Temp °K: </b>"+data['main']['temp']+"<br>"+
                      "<b>Humidity %: </b>"+data['main']['humidity']+"<br>"+"<b>Wind kts: </b>"+data['wind']['speed']);
   });


}

function getReports(){
  $.getJSON('api/signal', function(data){
    $.each(data, function( index, value ) {
      addReports(value, index);
    })
  });
}
