const Room = require('../models/room');
const Class = require('../models/class');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const room = require('../models/room');

module.exports = {
    name: "close",
    description: "Closes your created room/class",
    syntax: "{room/class}",
    category: "Main",
    execute(message, args) {
        if (args[0]) {
            if (args[0].toLowerCase() == "room") {
                Room.findOne({ Owner: message.author.id }, async (err, room) => {
                    if (err) console.log(err);
                    if (room != null) {
                        Room.deleteOne({ Owner: message.author.id }).exec();
                        message.channel.send("You successfully closed your room!");
                    }
                    else {
                        message.channel.send("You do not have a room");
                    }
                });
            }
            else if (args[0].toLowerCase() == "class") {
                Class.findOne({ Teacher: message.author.id }, async (err, aClass) => {
                    if (err) console.log(err);
                    if (aClass != null) {
                        Class.deleteOne({ Teacher: message.author.id }).exec();
                        message.channel.send("You successfully closed your class!");
                    }
                    else {
                        message.channel.send("You do not have a class");
                    }
                });
            }
            else {
                message.channel.send("Specify room or class");
            }
        }
        else {
            message.channel.send('Please specify what to close.')
        }

    }
};