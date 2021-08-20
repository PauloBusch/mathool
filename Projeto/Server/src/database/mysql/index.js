const Sequelize = require('sequelize');
const { DB_MYSQL_NAME, DB_MYSQL_USER, DB_MYSQL_PASS, DB_MYSQL_HOST, DB_MYSQL_PORT } = process.env;

const sequelize = new Sequelize(
  DB_MYSQL_NAME,
  DB_MYSQL_USER,
  DB_MYSQL_PASS, 
  {
    logging: true,
    host: DB_MYSQL_HOST,
    port: DB_MYSQL_PORT,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      freezeTableName: true
    }
  }
);

module.exports = sequelize;