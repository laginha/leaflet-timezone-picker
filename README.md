Usage
-----

```javascript
$("#mapid").timezonePicker({
  onReady: function() {
    $("#mapid").timezonePicker('selectZone', 'Europe/London');
  },
  jsonRootUrl: '/static/timezones/' // default to '/tz_json/'
  // hoverRegions: false, // defaults to true 
  onHover: { // default values
    fillOptions: {
      color: '#888888',
      opacity: 0.5,
    },
    strokeOptions: {
      color: '#444444',
      opacity: 0.7,
      width: 1
    },
    callback: null
  },
  // selectRegions: false, // defaults to true
  onSelected: { // default values
    fillOptions: {
      color: '#ffcccc',
      opacity: 0.5,
    },
    strokeOptions: {
      color: '#ff0000',
      width: 1,
      opacity: 0.7
    },
    callback: null  
  }
  // Leaflet options
  leaflet: {
    map: {
      // See http://leafletjs.com/reference.html#map-constructor
      elementId: 'mapid',
      options: {
        center: [40, -8], 
        zoom: 3,
        minZoom: 3,
        maxZoom: 3,
        zoomControl: false,
        dragging: true,
      }
    },
    tileLayer: {
      // See http://leafletjs.com/reference.html#tilelayer
      url: 'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGFnaW5oYSIsImEiOiJjaXJ6MG9zd28wMDIzMnlwZGU4OTBsY3l5In0.qe_lgiEahn-i4iOnd3ix3Q',
    }   
  }   
});
````

Run
-----

    ./run.sh
    http://localhost:8000/example.html
