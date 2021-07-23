const Room = require('../models/room');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const room = require('../models/room');

module.exports = {
    name: "close",
    description: "Closes your created room",
    syntax: "",
    execute(message, args) {
        Room.findOne({ Owner: message.author.id }, async (err, room) => {
            if (err) console.log(err);
            if (room != null) {
                Room.deleteOne({ Owner: message.author.id }).exec();
                message.channel.send("You successfully closed your room!");
            }
            else{
                message.channel.send("You do not have a room");
            }
        });
    }
};