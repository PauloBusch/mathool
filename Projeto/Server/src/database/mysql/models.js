const sequelize = require('./');
const userSchema = require('../../schemas/mysql/user');
const questionSchema = require('../../schemas/mysql/question');
const variableSchema = require('../../schemas/mysql/variable');
const answerSchema = require('../../schemas/mysql/answer');
const logSchema = require('../../schemas/mysql/log');
const operationSchema = require('../../schemas/mysql/operation');
const questionOperationSchema = require('../../schemas/mysql/question-operations');

const models = {
    User: userSchema(sequelize),
    Question: questionSchema(sequelize),
    Variable: variableSchema(sequelize),
    Answer: answerSchema(sequelize),
    Operation: operationSchema(sequelize),
    QuestionOperations: questionOperationSchema(sequelize),
    Log: logSchema(sequelize)
};

models.Operation.hasMany(models.QuestionOperations, { foreignKey: 'operationId', as: 'OperationsQuestion' });
models.QuestionOperations.belongsTo(models.Operation, { foreignKey: 'operationId', as: 'OperationsQuestion' });

models.Question.hasMany(models.QuestionOperations, { foreignKey: 'questionId', as: 'QuestionOperations' });
models.QuestionOperations.belongsTo(models.Question, { foreignKey: 'questionId', as: 'QuestionOperations' });

module.exports = models;