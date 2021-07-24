const mongoose = require('mongoose');
const roomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: String,
    Code: String,
    Students: Array,
    Teacher: String
});

module.exports = mongoose.model('class', roomSchema, 'class');