const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "secret", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
