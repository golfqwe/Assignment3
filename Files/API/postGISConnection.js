// now convert the configruation file into the correct format -i.e. a name/value pair array
// this means looping through the file looking for commas
// each comma indicates a new line, a new piece of information
// we then take the information and convert it into a configuration
// for the PostgreSQL connection
let pg = require("pg");

let pool = new pg.Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;
