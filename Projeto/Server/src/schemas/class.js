const { Schema } = require('mongoose');

module.exports = new Schema({
    name: { type: String, required: true, maxLength: 150 },
    serie: { type: Number, required: true, min: 1, max: 10 },
    class: { type: String, required: true, length: 1 },
    professor_id: { type: String, required: true, maxLength: 150 },
    year: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    active_class: { type: Boolean, required: true}
});
