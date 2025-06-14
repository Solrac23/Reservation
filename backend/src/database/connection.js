import knex from "knex";
import configuration from "../../knexfile.js";

const config = process.env.NODE_ENV === "test" ? configuration.test : configuration.development;
const connection = knex(config);

export default connection;
