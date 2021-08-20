const sequelize = require('./');
const userSchema = require('../../schemas/mysql/user');
const questionSchema = require('../../schemas/mysql/question');
const variableSchema = require('../../schemas/mysql/variable');
const answerSchema = require('../../schemas/mysql/answer');
const logSchema = require('../../schemas/mysql/log');
const operationSchema = require('../../schemas/mysql/operation');
const questionOperationSchema = require('../../schemas/mysql/question-operations');

questionOperationSchema(sequelize);

module.exports = {
    User: userSchema(sequelize),
    Question: questionSchema(sequelize),
    Variable: variableSchema(sequelize),
    Answer: answerSchema(sequelize),
    Operation: operationSchema(sequelize),
    Log: logSchema(sequelize)
};