// now convert the configruation file into the correct format -i.e. a name/value pair array
// this means looping through the file looking for commas
// each comma indicates a new line, a new piece of information
// we then take the information and convert it into a configuration
// for the PostgreSQL connection
let pg = require("pg");
const os = require("os");
const fs = require("fs");

if (process.env.PGHOST) {
  config = {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  };
} else {
  // we need to get the user's name from the login used
  // to connect to the server
  // that way we can work out the correct path for the connection file
  //  /code/<<username>>/certs/

  const username = os.userInfo().username; // locate the database login details

  // oad the database login details file
  let configtext =
    "" + fs.readFileSync("/home/" + username + "/certs/postGISConnection.js"); // locate the database login details

  // now convert the configruation file into the correct format -i.e. a name/value pair array
  // this means looping through the file looking for commas
  // each comma indicates a new line, a new piece of information
  // we then take the information and convert it into a configuration
  // for the PostgreSQL connection
  let configarray = configtext.split(",");
  let config = {};

  for (let i = 0; i < configarray.length; i++) {
    let split = configarray[i].split(":"); //split = split one text string into two
    config[split[0].trim()] = split[1].trim(); //trim = remove any spaces before or after the text
  }
}

// create a new connection pool
let pool = new pg.Pool(config);

module.exports = pool;
