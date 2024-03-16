"use strict";

/**
 * ethernetLayer
 *
 * a global variable to store the ethernet layer once it has been added to the map
 * global as will need to be referened by the ethernet remove functionality
 *
 */
let ethernetLayer;

function showEthernetStyled() {
  let style1 = {
    color: "#ea3008",
    weight: 10,
    opacity: 0.65,
  };
  let style2 = {
    color: "pink",
    weight: 10,
    opacity: 0.65,
  };
  let style3 = {
    color: "#0811EA",
    weight: 10,
    opacity: 0.65,
  };

  // the onEachFeature command loops through every featulre in the GeoJSON dataset and creates the popup and style for each one
  ethernetCables = L.geoJson(result, {
    onEachFeature: function (f, l) {
      l.bindPopup(
        "<pre>" +
          JSON.stringify(f.properties, null, " ").replace(/[\{\}"]/g, "") +
          "</pre>"
      );
      switch (f.properties.criticality) {
        case 2:
          l.setStyle(style1);
          break;
        case 3:
          l.setStyle(style2);
          break;
        default:
          l.setStyle(style2);
      }
    },
  }).addTo(mymap);

  // change the map zoom so that all the data is shown
  mymap.fitBounds(ethernetCables.getBounds());
}

function removeEthernet() {
  // we use a try / catch statement here - this means that if the layer has not yet been added we won't get an error message
  try {
    mymap.removeLayer(ethernetLayer);
  } catch (err) {}
}
