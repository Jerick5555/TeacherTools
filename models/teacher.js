const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    teachers: Array,
});

module.exports = mongoose.model('teacher', userSchema, 'teachers');