const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USERNAME, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: '0',
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  dialectOptions: {
    socketPath: dbConfig.HOST
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.persons = require("./persons.model.js")(sequelize, Sequelize);

module.exports = db;