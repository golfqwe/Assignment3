"use strict";
let express = require("express");
let geoJSON = require("express").Router(); // create a new route
let pg = require("pg"); // the code to connect to PostgreSQL
let fs = require("fs"); // code to read the database connection details file
const pool = require("../postGISConnection"); // the pool of connections

geoJSON.route("/testGeoJSON").get(function (req, res) {
  res.json({ message: req.originalUrl });
});

geoJSON.get("/postgistest", function (req, res) {
  // create a new connection in the pool
  // the connection will return err if it failes
  // if it works, the connection will return a client called client - which can be
  // used to run some SQL
  // done is the name of the function to be called once the SQL has
  // returned a value - this closes the connection so that it can be
  // reused
  pool.connect((err) => {
    if (err) {
      return res
        .status(400)
        .send("not able to get connection " + err)
        .end();
    }
    // the SQL that we want to run
    let query = "select * from information_schema.columns";

    // pass the SQL to the client from the pool
    // will return err if it fails
    // result will hold any values returned by the SQL
    pool.query(query, function (err, result) {
      pool.end();
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      // send to send the result back to the browser
      // result.rows will give an array of all the rows
      // in the result
      res.status(200).send(result.rows);
    });
  });
});

geoJSON.get("/asset_information", (req, res) => {
  pool.connect((err) => {
    if (err) {
      console.log("not able to get connection " + err);
      return res.status(400).send(err.toString()).end();
    }
    let querystring =
      " SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features  FROM ";
    querystring =
      querystring +
      "(SELECT 'Feature' As type     , ST_AsGeoJSON(st_transform(lg.location,4326))::json As geometry, ";
    querystring =
      querystring +
      "row_to_json((SELECT l FROM (SELECT id, asset_name, installation_date, user_id, timestamp) As l      )) As properties";
    querystring =
      querystring +
      "   FROM cege0043.asset_information  As lg order by id limit 100  ) As f";
    console.log(querystring);
    pool.query(querystring, function (err, result) {
      pool.end();
      if (err) {
        console.log(err);
        res.status(400).send(err);
      } else {
        res.status(200).send(result.rows);
      }
    });
  });
});

geoJSON.get(
  "/geojson/:schemaname/:tablename/:idcolumn/:geomcolumn",
  (req, res) => {
    pool.connect((err, client, done) => {
      if (err) {
        console.log("not able to get connection " + err);
        return res.status(400).send(err.toString()).end();
      }

      let colnames = "";

      // first get a list of the columns that are in the table
      // use string_agg to generate a comma separated list that can then be pasted into the next query
      let tablename = req.params.tablename;
      let schema = req.params.schemaname;
      let idcolumn = req.params.idcolumn;
      let geomcolumn = req.params.geomcolumn;
      let querystring =
        "select string_agg(colname,',') from ( select column_name as colname ";
      querystring =
        querystring + " FROM information_schema.columns as colname ";
      querystring = querystring + " where table_name   =$1";
      querystring =
        querystring +
        " and column_name <> $2 and table_schema = $3 and data_type <> 'USER-DEFINED') as cols ";
      console.log(querystring);

      // now run the query
      pool.query(
        querystring,
        [tablename, geomcolumn, schema],
        function (err, result) {
          if (err) {
            console.log(err);
            return res.status(400).send(err.toString());
          } else {
            let thecolnames = result.rows[0].string_agg;
            colnames = thecolnames;
            console.log("the colnames " + thecolnames);

            let cols = colnames.split(",");
            let colString = "";
            for (let i = 0; i < cols.length; i++) {
              console.log(cols[i]);
              colString = colString + JSON.stringify(cols[i]) + ",";
            }
            console.log(colString);

            //remove the extra comma
            colString = colString.substring(0, colString.length - 1);

            // now use the inbuilt geoJSON functionality
            // and create the required geoJSON format using a query adapted from here:
            // http://www.postgresonline.com/journal/archives/267-Creating-GeoJSON-Feature-Collections-with-JSON-and-PostGIS-functions.html, accessed 4th January 2018
            // note that query needs to be a single string with no line breaks so built it up bit by bit

            // to overcome the polyhedral surface issue, convert them to simple geometries
            // assume that all tables have an id field for now - to do add the name of the id field as a parameter
            querystring =
              "SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features  FROM ";
            querystring +=
              "(select 'Feature' as type, x.properties,st_asgeojson(y.geometry)::json as geometry from ";
            querystring +=
              " (select " +
              idcolumn +
              ", row_to_json((SELECT l FROM (SELECT " +
              colString +
              ") As l )) as properties   FROM " +
              schema +
              "." +
              JSON.stringify(tablename) +
              " ";

            querystring += " ) x";
            querystring +=
              " inner join (SELECT " + idcolumn + ", c.geom as geometry";

            querystring +=
              " FROM ( SELECT " +
              idcolumn +
              ", (ST_Dump(st_transform(" +
              JSON.stringify(geomcolumn) +
              ",4326))).geom AS geom ";

            querystring +=
              " FROM " +
              schema +
              "." +
              JSON.stringify(tablename) +
              ") c) y  on y." +
              idcolumn +
              " = x." +
              idcolumn +
              ") f";
            console.log(querystring);

            // run the second query
            pool.query(querystring, function (err, result) {
              //call `done()` to release the client back to the pool
              // pool.end();
              if (err) {
                console.log(err);
                res.status(400).send(err);
              } else {
                console.log(result.rows);
                // the data from PostGIS is surrounded by [ ] which doesn't work in QGIS, so remove
                // so we need to convert the JSON into a string temporarily
                // remove the brackets and then convert it back when we send
                // the result to the browser
                let geoJSONData = JSON.stringify(result.rows);
                geoJSONData = geoJSONData.substring(1);
                geoJSONData = geoJSONData.substring(0, geoJSONData.length - 1);
                console.log(geoJSONData);
                res.status(200).send(JSON.parse(geoJSONData));
              }
            });
          } // end error check from client
        }
      );
    });
  }
);

module.exports = geoJSON;
