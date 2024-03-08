"use strict";

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
