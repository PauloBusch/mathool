const restful = require('node-restful');
const { Schema } = restful.mongoose;

const classSchema = new Schema({
    name: { type: String, required: true, maxLength: 150 },
    code: { type: String, required: true, unique: true }
});

module.exports = restful.model('classes', classSchema);