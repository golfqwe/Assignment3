"use strict";

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
