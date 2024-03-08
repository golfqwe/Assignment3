"use strict"

function showHardCodedData() {

// add a circle
	let myCircle=L.circle([51.508, -0.11], 250, {
		color: 'green',
		fillColor: 'green',
		fillOpacity: 0.8
	}).addTo(mymap).bindPopup("I am a circle in 2024.");

	console.log("added a circle");

	// add a polygon
	let myPolygon = L.polygon([
		[51.709, -0.10],
		[51.703, 0.07],
		[51.22, 0.07],
		[51.22, -0.057]
	],{
		color: 'blue',
		fillColor: 'blue',
		fillOpacity: 0.5
	}).addTo(mymap).bindPopup("I am a polygon in 2024.");


	// add a point
	let myMarker = L.marker([51.508, -0.10],
	{}).addTo(mymap).bindPopup("this is a point<br>with two rows");
}


function showHardCodedGeoJSON() {

// create a geoJSON feature -
	let geoJSON = {
	    "type": "Feature",
	    "properties": {
	        "name": "London",
	        "popupContent": "Is is where UCL is based?.  We have on campus and off campus activity."
	    },
	    "geometry": {
	        "type": "Point",
	        "coordinates": [37.117020, -84.061539]
	    }
	};
	// and add it to the map
	let geoJSONFeature = L.geoJSON(geoJSON);
	let geoJSONLayer = geoJSONFeature.addTo(mymap).bindPopup("<b>"+geoJSON.properties.name+" "+geoJSON.properties.popupContent+"<b>");

	// zoom to the feature
	mymap.flyToBounds(geoJSONLayer);


}

            <a class="dropdown-item" class="dropdown-item" href="#" onclick="showPointsWithIcons()";>Show Points With Icons</a>

function showPointsWithIcons() {



	// define the marker icons to be used
    let testMarkerPink = L.AwesomeMarkers.icon({
        icon: 'play',
        markerColor: 'pink'
    });

    let testMarkerOrange = L.AwesomeMarkers.icon({
        icon: 'play',
        markerColor: 'orange'
    });
	

    // create a point and use the markers
	let geoJSONFeature = {
	    "type": "Feature",
	    "properties": {
	        "name": "Pink",
	        "popupContent": "This marker should be pink."
	    },
	    "geometry": {
	        "type": "Point",
	        "coordinates": [-0.118094, 51.509833]
	    }
	};

    let feature1 =L.geoJSON(geoJSONFeature, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon:testMarkerPink});
        }
    }).addTo(mymap).bindPopup("<b>"+geoJSONFeature.properties.name+" "+geoJSONFeature.properties.popupContent+"<b>");

 

    // create a second point and use a different markers
	let geoJSONFeature1 = {
	    "type": "Feature",
	    "properties": {
	        "name": "Orange",
	        "popupContent": "This marker should be orange."
	    },
	    "geometry": {
	        "type": "Point",
	        "coordinates": [-0.118004, 51.509835]
	    }
	};

    let feature2 = L.geoJSON(geoJSONFeature1, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon:testMarkerOrange});
        }
    }).addTo(mymap).bindPopup("<b>"+geoJSONFeature1.properties.name+" "+geoJSONFeature1.properties.popupContent+"<b>");

	


    // fly to the markers
    // note that GeoJSON uses lng lat and leaflet uses lat lng so we have to reverse the order
    let coords = [];
    coords.push(geoJSONFeature1.geometry.coordinates[1]);
    coords.push(geoJSONFeature1.geometry.coordinates[0]);

    mymap.flyTo(coords,18);

}
