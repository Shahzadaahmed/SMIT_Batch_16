// Note: Database configuration file...!

const knex = require('knex');
const knexConfig = require('../../knexfile.js');

const db = knex(knexConfig.development);

db
    .raw('SELECT 1')
    .then((res) => {
        console.log('Knex JS connected Postgres DB successfully!');
    })
    .catch((err) => {
        console.log('Something went wrong while connecting DB: ', err);
    });

module.exports = db;