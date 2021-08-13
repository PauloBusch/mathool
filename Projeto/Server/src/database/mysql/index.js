const Sequelize = require('sequelize');
const { DB_MYSQL_NAME, DB_MYSQL_USER, DB_MYSQL_PASS, DB_MYSQL_HOST, DB_MYSQL_PORT } = process.env;


function getHost() {
  if (!DB_MYSQL_PORT) return DB_MYSQL_HOST;

  return `${DB_MYSQL_HOST}:${DB_MYSQL_PORT}`;
}

const sequelize = new Sequelize(
  DB_MYSQL_NAME,
  DB_MYSQL_USER,
  DB_MYSQL_PASS, 
  {
    logging: false,
    host: getHost(),
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