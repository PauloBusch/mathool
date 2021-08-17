const sequelize = require('./');
const userSchema = require('../../schemas/mysql/user');
const questionSchema = require('../../schemas/mysql/question');
const variableSchema = require('../../schemas/mysql/variable');
const answerSchema = require('../../schemas/mysql/answer');
const logSchema = require('../../schemas/mysql/log');

module.exports = {
    User: userSchema(sequelize),
    Question: questionSchema(sequelize),
    Variable: variableSchema(sequelize),
    Answer: answerSchema(sequelize),
    Log: logSchema(sequelize)
};