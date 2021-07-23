const mongoose = require('mongoose');
const roomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: String,
    People: Array,
    Owner: String
});

module.exports = mongoose.model('Room', dataSchema, 'Rooms');