const { Pool } = require("pg");

module.exports = new Pool({
    user: 'postgres',
    password: "12",
    host: "localhost",
    port: 5432,
    database: "foodfy"
});