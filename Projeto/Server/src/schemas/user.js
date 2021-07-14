const { Schema } = require('mongoose');
const { Types } = Schema;
const roles = require('../utils/enums/roles');

module.exports = new Schema({
    name: { type: String, required: true, maxLength: 150 },
    email: { type: String, required: true, unique: true, maxLength: 100 },
    password: { type: String, required: true },
    type: { type: String, required: true, enum: [roles.Teacher, roles.Student] },
    classCode: { type: String }
});