const pg = require('pg');
const Pool = pg.Pool;
const config = {
  database: 'myRetail', // the name of the database
  host: 'localhost', // where is your database
  port: 5432, // the port number for your database, 5432 is the default
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

// create a new pool instance to manage our connections
const pool = new Pool(config);

// .on here looks familiar...this is how node can handle arbitrary events
// this is NOT required but it is very useful for debugging
pool.on('connect', (client) => {
  console.log('Postgesql connected');
})

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

// need to allow access to this pool instance to other code
module.exports = pool;