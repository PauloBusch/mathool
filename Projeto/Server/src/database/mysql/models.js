const sequelize = require('./');
const userSchema = require('../../schemas/mysql/user');

module.exports = {
    User: userSchema(sequelize)
};