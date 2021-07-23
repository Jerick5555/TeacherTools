const Room = require('../models/room');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const room = require('../models/room');

module.exports = {
    name: "create",
    description: "Sets up a new room",
    syntax: "",
    execute(message, args) {
        Room.findOne({ Owner: message.author.id }, (err, owner) => {
            if (err) console.log(err);
            if (owner == null) {
                function generatePassword() {
                    while (true) {
                        var length = 8,
                        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                        retVal = "";
                        for (var i = 0, n = charset.length; i < length; ++i) {
                            retVal += charset.charAt(Math.floor(Math.random() * n));
                        }

                        room = Room.findOne({ Name: retVal }).exec();
                        if (!room) {
                            return retVal;
                        }
                    }
                }

                code = generatePassword()

                room = new Room({
                    _id: mongoose.Types.ObjectId(),
                    Name: code,
                    People: [],
                    Owner: message.author.id
                })

                room.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
                message.channel.send(`You have been successfully made a room! Code is ${code}`);
            }
            else {
                message.channel.send("You have already made a room");
            }
        });
    }
};