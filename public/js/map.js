$( document ).ready(function() {
  var mymap = L.map('mapid').setView([45, 10], 5);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGNvbGxpbmkiLCJhIjoiY2puaGw5ZTU0MDJtcjN3bWpsc2UyZWoyZyJ9.rhC2MyJ3u9gHr44__RmPfA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);

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

});
