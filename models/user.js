const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
});

module.exports = mongoose.model('User', userSchema, 'users');