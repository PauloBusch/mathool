const { model } = require('mongoose');
const classSchema = require('../../schemas/mongo/class');
const userSchema = require('../../schemas/mongo/user');

module.exports = {
    User: model('users', userSchema),
    Class: model('classes', classSchema)
}