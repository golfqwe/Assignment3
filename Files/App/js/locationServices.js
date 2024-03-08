"use strict";
/**
 * Config file
 *
 * a global variable to store the room layer layer once it has been added to the map
 * global as will need to be referened by the room layer remove functionality
 *
 */
const baseUrl = document.location.origin; //"http://localhost:4480/api/geojson24/geojson";

/**
 * Rooms Layer
 *
 * a global variable to store the room layer layer once it has been added to the map
 * global as will need to be referened by the room layer remove functionality
 *
 */
let roomsLayer;

/**
 * function showRooms
 *
 * show the room layer layer, assume that the data is stored in a data directory on the local server
 *
 */
function showRooms() {
  // as we are hosting the data on our server, we dono't need to provide the full https:// ... detail
  const URL = baseUrl + "/ucfscde/rooms/room_id/location";

  $.ajax({
    url: URL,
    crossDomain: true,
    success: function (result) {
      // load the geoJSON layer
      roomsLayer = L.geoJson(result, {
        // use point to layer to create the points
        style: function (feature) {
          return { color: "#33FF88" };
        },
      }).addTo(mymap);
      // zoom to the layer
      mymap.fitBounds(roomsLayer.getBounds());
    }, // end of the inner function
  }); // end of the ajax request
}

/**
 * function removeRooms
 *
 * show the bus roome layer, assume that the data is stored in a data directory on the local server
 *
 */

function removeRooms() {
  // we use a try / catch statement here - this means that if the layer has not yet been added we won't get an error message
  try {
    mymap.removeLayer(roomsLayer);
  } catch (err) {}
}

/**
 * Buildings Layer
 *
 * a global variable to store the room layer layer once it has been added to the map
 * global as will need to be referened by the room layer remove functionality
 *
 */
let buildingsLayer;

/**
 * function showBuildings
 *
 * show the room layer layer, assume that the data is stored in a data directory on the local server
 *
 */
function showBuildings() {
  // as we are hosting the data on our server, we dono't need to provide the full https:// ... detail
  const URL = baseUrl + "/ucfscde/buildings/building_id/location";

  $.ajax({
    url: URL,
    crossDomain: true,
    success: function (result) {
      // load the geoJSON layer
      buildingsLayer = L.geoJson(result, {
        // use point to layer to create the points
        style: function (feature) {
          return { color: "#FF8833" };
        },
      }).addTo(mymap);
      // zoom to the layer
      mymap.fitBounds(buildingsLayer.getBounds());
    }, // end of the inner function
  }); // end of the ajax request
}

/**
 * function removeBuildings
 *
 * show the bus roome layer, assume that the data is stored in a data directory on the local server
 *
 */

function removeBuildings() {
  // we use a try / catch statement here - this means that if the layer has not yet been added we won't get an error message
  try {
    mymap.removeLayer(buildingsLayer);
  } catch (err) {}
}

/**
 * Temperature Layer
 *
 * a global variable to store the room layer layer once it has been added to the map
 * global as will need to be referened by the room layer remove functionality
 *
 */
let temperatureLayer;

/**
 * function showTemperature
 *
 * show the room layer layer, assume that the data is stored in a data directory on the local server
 *
 */
function showTemperature() {
  // as we are hosting the data on our server, we dono't need to provide the full https:// ... detail
  const URL = baseUrl + "/ucfscde/temperature_sensors/sensor_id/location";

  $.ajax({
    url: URL,
    crossDomain: true,
    success: function (result) {
      // load the geoJSON layer
      temperatureLayer = L.geoJson(result, {
        // use point to layer to create the points
        style: function (feature) {
          return { color: "#FF3388" };
        },
      }).addTo(mymap);
      // zoom to the layer
      mymap.fitBounds(temperatureLayer.getBounds());
    }, // end of the inner function
  }); // end of the ajax request
}

/**
 * function removeTemperature
 *
 * show the bus roome layer, assume that the data is stored in a data directory on the local server
 *
 */

function removeTemperature() {
  // we use a try / catch statement here - this means that if the layer has not yet been added we won't get an error message
  try {
    mymap.removeLayer(temperatureLayer);
  } catch (err) {}
}

/**
 * University Layer
 *
 * a global variable to store the room layer layer once it has been added to the map
 * global as will need to be referened by the room layer remove functionality
 *
 */
let universityLayer;

/**
 * function showUniversity
 *
 * show the room layer layer, assume that the data is stored in a data directory on the local server
 *
 */
function showUniversity() {
  // as we are hosting the data on our server, we dono't need to provide the full https:// ... detail
  const URL = baseUrl + "/ucfscde/university/university_id/location";

  $.ajax({
    url: URL,
    crossDomain: true,
    success: function (result) {
      // load the geoJSON layer
      universityLayer = L.geoJson(result, {
        // use point to layer to create the points
        style: function (feature) {
          return { color: "#3388ff" };
        },
      }).addTo(mymap);
      // zoom to the layer
      mymap.fitBounds(universityLayer.getBounds());
    }, // end of the inner function
  }); // end of the ajax request
}

/**
 * function removeUniversity
 *
 * show the bus roome layer, assume that the data is stored in a data directory on the local server
 *
 */

function removeUniversity() {
  // we use a try / catch statement here - this means that if the layer has not yet been added we won't get an error message
  try {
    mymap.removeLayer(universityLayer);
  } catch (err) {}
}
