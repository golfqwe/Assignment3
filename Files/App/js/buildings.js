"use strict";

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
