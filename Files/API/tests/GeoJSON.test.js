"use strict";
const supertest = require("supertest");
const request = supertest("http://localhost:4480");
const fs = require("fs");

// we use readFileSync here so that the system waits
// until the full file is loaded
// an asychronous approach would mean that the code would try and run
// the next line of text before the file is loaded
//  the ./  means look in the same directory as this file
// we use JSON.parse to convert the data into JSON for comparison
let asset_information = JSON.parse(
  fs.readFileSync("./js/asset_information.geojson")
);
expect(JSON.parse(response.text)).toEqual(asset_information);

test("is valid JSON", async () => {
  const response = await request.get(
    "/geoJSON/getGeoJSON/cege0043/asset_information/id/location"
  );
  expect(response.status).toBe(200);
  let isJSON = false;
  try {
    JSON.parse(response.text);
    isJSON = true;
  } catch (e) {
    isJSON = false;
  }
  expect(isJSON).toEqual(true);
});

test("is geoJSON", async () => {
  const response = await request.get(
    "/geoJSON/getGeoJSON/cege0043/asset_information/id/location"
  );
  expect(response.status).toBe(200);

  let isGeoJSON = false;
  let geoJSON = JSON.parse(response.text);
  isGeoJSON = testForValidGeoJSON(geoJSON);
  expect(isGeoJSON).toEqual(true);
});

test("colNames correct", async () => {
  const response = await request.get(
    "/geoJSON/getGeoJSON/cege0043/asset_information/id/location"
  );
  const infoCols = await request.get("/geoJSON/postgistest");
  let colNamesCorrect = false;
  let geoJSON = JSON.parse(response.text);
  let colNames = extractColNames(geoJSON);
  let colNamesInformationSchema = extractColNamesInformationSchema(
    infoCols.text,
    "cege0043",
    "asset_information"
  );
  colNamesCorrect = compareColNames(colNames, colNamesInformationSchema);
  expect(colNamesCorrect).toEqual(true);
});
