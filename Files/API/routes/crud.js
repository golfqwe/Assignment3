"use strict";
let express = require("express");
let pg = require("pg");
let crud = require("express").Router();
let fs = require("fs");

const bodyParser = require("body-parser");
crud.use(bodyParser.urlencoded({ extended: true }));

// test endpoint for GET requests (can be called from a browser URL)
crud.get("/testCRUD", function (req, res) {
  res.json({ message: req.originalUrl + " " + " GET REQUEST" });
});

module.exports = crud;
