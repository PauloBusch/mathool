const restful = require('node-restful');
const { Schema } = restful.mongoose;

const userSchema = new Schema({
    name: { type: String, required: true, maxLength: 150 },
    email: { type: String, required: true, unique: true, maxLength: 100 },
    password: { type: String, required: true },
    type: { type: String, required: true, enum: ['Aluno', 'Professor'] },
    classCode: { type: String }
});

module.exports = restful.model('users', userSchema);