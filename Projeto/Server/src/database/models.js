const { model } = require('mongoose');
const classSchema = require('../schemas/class');
const userSchema = require('../schemas/user');

module.exports = {
    User: model('users', userSchema),
    Class: model('classes', classSchema)
}