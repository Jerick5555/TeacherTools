const Room = require('../models/room');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const room = require('../models/room');

module.exports = {
    name: "close",
    description: "Closes your created room",
    syntax: "",
    execute(message, args) {
        Room.deleteOne({ Owner: message.author.id }, (err, room) => {
            if (err) console.log(err);
            if (room == null) {
                message.channel.send("You do not have a room");
            }
            else {
                message.channel.send("You successfully closed your room!");
            }
        });
    }
};