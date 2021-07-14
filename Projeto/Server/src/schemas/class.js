const { Schema } = require('mongoose');
const { Types } = Schema;

module.exports = new Schema({
    name: { type: String, required: true, maxLength: 150 },
    serie: { type: Number, required: true, min: 1, max: 10 },
    class: { type: String, required: true, length: 1 },
    code: { type: String, required: true, unique: true }
});
