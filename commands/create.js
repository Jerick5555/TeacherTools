const Room = require('../models/room');
const Class = require('../models/class');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const room = require('../models/room');

module.exports = {
    name: "create",
    description: "Sets up a new room/class",
    syntax: "",
    category: "Main",
    execute(message, args) {
        if (args[0].toLowerCase() == "room") {
            Room.findOne({ Owner: message.author.id }, async (err, room) => {
                if (err) console.log(err);
                if (room == null) {
                    async function generatePassword() {
                        while (true) {
                            var length = 8,
                                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-+=_",
                                retVal = "";
                            for (var i = 0, n = charset.length; i < length; ++i) {
                                retVal += charset.charAt(Math.floor(Math.random() * n));
                            }

                            room = await Room.findOne({ Name: retVal }).exec();
                            
                            if (!room) {
                                return retVal;
                            }
                        }
                    }

                    code = await generatePassword()

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
        else if (args[0].toLowerCase() == "class") {
            Class.findOne({ Teacher: message.author.id }, async (err, aClass) => {
                if (err) console.log(err);
                if (aClass == null) {
                    async function generatePassword() {
                        while (true) {
                            var length = 8,
                                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-+=_",
                                retVal = "";
                            for (var i = 0, n = charset.length; i < length; ++i) {
                                retVal += charset.charAt(Math.floor(Math.random() * n));
                            }

                            aClass = await Class.findOne({ Name: retVal }).exec();
                            
                            if (!aClass) {
                                return retVal;
                            }
                        }
                    }

                    code = await generatePassword()

                    aClass = new Class({
                        _id: mongoose.Types.ObjectId(),
                        Name: code,
                        Students: [],
                        Teacher: message.author.id
                    })

                    aClass.save()
                        .then(result => console.log(result))
                        .catch(err => console.error(err));
                    message.channel.send(`You have been successfully made a class! Code is ${code}`);
                }
                else {
                    message.channel.send("You have already made a Class");
                }
            });
        }
        else{
            message.channel.send("Specify room or class");
        }
    }
};