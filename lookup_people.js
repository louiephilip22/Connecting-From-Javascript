//DB
const pg = require('pg');
const settings = require('./settings')

const config = {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
};

function connect(callback) {
    const client = new pg.Client(config);
    client.connect((err) => {
      if (err) {
        throw err;
      }
      callback(err, client);
    });
  }

function close(client) {
    client.end((err) => {
      if (err) {
        throw err;
      }
    });
  }

//Query
function getPersonByName(callback, name) {
    connect((err, client) => {
      client.query('SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text',
        [name], (err, results) => {
        if (err) {
          return console.error("error running query", err);
        }
        callback(results.rows, name);
        close(client);
      });
    });
  }

//Look-up
let lookUpName = process.argv.slice(2)[0];

getPersonByName((queryResults) => {
  console.log('Searching ...');
  let numbering = 1;
  queryResults.forEach((result) => {
    console.log(`Found ${queryResults.length} person(s) by the name ${lookUpName}.`);
    console.log(`- ${numbering}: ${result.first_name} ${result.last_name}, born '${result.birthdate.getUTCFullYear()}-${result.birthdate.getUTCMonth()}-${result.birthdate.getUTCDate()}'`);

    numbering += 1;
  });
},lookUpName);
