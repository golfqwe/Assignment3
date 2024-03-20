"use strict";
/**
 * Price Queue Layer
 *
 * a global variable to store the room layer layer once it has been added to the map
 * global as will need to be referened by the room layer remove functionality
 *
 */
let priceQueueLayer = [];
let myFeatureGroup;
let userId = 1;
let priceUserId = 1;
const baseUrlCRUD = document.location.origin + "/api/crud24/testCRUD"; //"http://localhost:4480/crud24/testCRUD";
/**
 * function onMapClick - creates a pop up when the user clicks on the map
 *
 * @params e  - the click event - this holds information about where the user has actually clicked
 */

function processMapClick(e) {
  // create a new Leaflet pop up
  let popup = L.popup();

  // add some values to the pop up to show the coordinates
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mymap);
}

/**
 * function onMapClickDiv - takes the results of the location where the use clicks and adds it to a DIV
 *
 * @params e  - the click event - this holds information about where the user has actually clicked
 */

function onMapClickDiv(e) {
  // document.getElementById("clickCoordinates").innerHTML =
  //   "Clicked on Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng;

  // $("#priceQueue").modal("show");

  // let testMarkerGreen = L.AwesomeMarkers.icon({
  //   icon: "gas-pump",
  //   markerColor: "blue",
  //   prefix: "fa",
  // });

  // // create a point and use the markers
  // let geoJSONFeature = {
  //   type: "Feature",
  //   properties: {
  //     name: "Pink",
  //     popupContent: "This marker should be pink.",
  //   },
  //   geometry: {
  //     type: "Point",
  //     coordinates: [e.latlng.lng, e.latlng.lat],
  //   },
  // };
  // // load the geoJSON layer
  // let petrolLayer = L.geoJson(geoJSONFeature, {
  //   // use point to layer to create the points
  //   pointToLayer: function (feature, latlng) {
  //     // look at the GeoJSON file - specifically at the properties - to see the earthquake magnitude and use a different marker depending on this value
  //     // also include a pop-up that shows the place value of the earthquakes
  //     // we also just use the place in the pop up icon

  //     return L.marker(latlng, { icon: testMarkerGreen });
  //   },
  // })
  //   .addTo(mymap)
  //   .bindPopup(
  //     "<b>" +
  //       geoJSONFeature.properties.name +
  //       " " +
  //       geoJSONFeature.properties.popupContent +
  //       "<b>"
  //   );
  // // zoom to the layer
  // mymap.fitBounds(petrolLayer.getBounds());
  const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  };

  const width = $(window).width();
  if (width >= breakpoints.md) {
    $("#latitude").val(e.latlng.lat);
    $("#longtitude").val(e.latlng.lng);
    $("#petrolStation").modal("show");
  }
}

/**
 * function zoomToExtents - zoom to the extent of all the data when the user clicks on the ctrl-e key if they are hovering over the map
 *
 * @params e  - the click event - this holds information about where the user has actually clicked
 */

function keyPressZoomToPoint(e) {
  if (e.originalEvent.ctrlKey && e.originalEvent.key === "e") {
    mymap.flyTo([51.508, -0.11], 12);

    // we don't want this specific event to propagate
    // event propagation is when the event is sent to the browser once it has completed on the map
    // we stop propagation by
    e.originalEvent.preventDefault();
  }
}

/**
 * function to set default coordinates price/queue to the map being loaded
 *
 */
function addPriceQueue() {
  // create a second point and use a different markers
  var coordinates = [
    ["P0001", "Petrol Station 1", 51.50015, -0.12624],
    ["P0002", "Petrol Station 2", 51.500333, -0.127502],
    ["P0003", "Petrol Station 3", 51.501075, -0.127481],
  ];

  let markers = [];
  let tem = [];
  for (var i = 0; i < coordinates.length; i++) {
    // add a point
    tem = L.marker([coordinates[i][2], coordinates[i][3]], {
      title: coordinates[i][1],
      code: coordinates[i][0],
    });
    priceQueueLayer.push(tem);
    markers.push([coordinates[i][2], coordinates[i][3]]);
  }
  myFeatureGroup = L.featureGroup(priceQueueLayer)
    .on("click", (e) => {
      $("#pricePetrolStationName").val(e.layer.options.title);
      $("#petrolStationId").val(e.layer.options.code);
      $("#platitude").val(e.latlng.lat);
      $("#plongtitude").val(e.latlng.lng);
      $("#priceQueue").modal("show");
    })
    .addTo(mymap);
  // fly to the markers
  // note that GeoJSON uses lng lat and leaflet uses lat lng so we have to reverse the order

  mymap.flyToBounds(markers, 18);
}

/**
 * function to remove all coordinates price/queue to the map being loaded
 *
 */
function removePriceQueue() {
  priceQueueLayer.forEach((element) => {
    element.remove();
  });
}

/**
 * function to submit the form and add the petrol station to the map
 *
 */
function submitPetrolStationForm() {
  // first we need to get the ID (code) that uniquely identifies the earthquake
  // that way we know which earthquake to associate with the damaage report when we save it in the database
  let tempuserId = `U` + userId.toString().padStart(4, "0");
  $("#userId").val(tempuserId);

  let petrolStationName = document.getElementById("petrolStationName").value;
  let lastInspected = document.getElementById("lastInspected").value;
  let latitude = document.getElementById("latitude").value;
  let longtitude = document.getElementById("longtitude").value;

  let queryString =
    "?userId=" +
    tempuserId +
    "&petrolStationName=" +
    petrolStationName +
    "&lastInspected=" +
    lastInspected +
    "&latitude=" +
    latitude +
    "&longtitude=" +
    longtitude;

  $.ajax({
    url: baseUrlCRUD + queryString,
    crossDomain: true,
    success: function (result) {
      document.getElementById("petrolStationForm").reset();
      $("#petrolStation").modal("hide");
      userId++;
      alert(decodeURI(JSON.stringify(result)));
    }, // end of the inner function
  }); // end of the ajax request
}
/**
 * function to submit the price queue form
 *
 */
function submitPriceQueueForm() {
  // first we need to get the ID (code) that uniquely identifies the earthquake
  // that way we know which earthquake to associate with the damaage report when we save it in the database
  let pricePetrolStationName = document.getElementById(
    "pricePetrolStationName"
  ).value;
  let petrolStationId = document.getElementById("petrolStationId").value;

  let tempPriceUserId = `U` + priceUserId.toString().padStart(4, "0");
  $("#priceUserId").val(tempPriceUserId);

  let inspectionDate = document.getElementById("priceInspectionDate").value;
  let queue = $("input[name=queue]:checked").val();
  let price = document.getElementById("price").value;
  let latitude = document.getElementById("platitude").value;
  let longtitude = document.getElementById("plongtitude").value;

  let queryString =
    "?petrolStationName=" +
    pricePetrolStationName +
    "&petrolStationId=" +
    petrolStationId +
    "&userId=" +
    tempPriceUserId +
    "&inspectionDate=" +
    inspectionDate +
    "&queue=" +
    queue +
    "&price=" +
    price +
    "&latitude=" +
    latitude +
    "&longtitude=" +
    longtitude;

  $.ajax({
    url: baseUrlCRUD + queryString,
    crossDomain: true,
    success: function (result) {
      document.getElementById("priceQueueForm").reset();
      $("#priceQueue").modal("hide");
      priceUserId++;
      alert(decodeURI(JSON.stringify(result)));
    }, // end of the inner function
  }); // end of the ajax request
}

/**
 * function to get value from event click naviation bar
 *
 */
function checkEventsNavber() {
  $(".nav a").on("click", function () {
    $(this).addClass("active");
    $(this).parent().children("a").not(this).removeClass("active");
    let val = $(this).data("title");
    alert('"Functionality to do "' + val + " will go here");
  });
}
