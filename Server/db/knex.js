const environment = "development";
const config = require("../knexfile");
const knex = require("knex");
const environmentConfig = config[environment];

const connection = knex(environmentConfig);

module.exports = connection;
