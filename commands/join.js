const Room = require('../models/room');
const Class = require('../models/class');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const room = require('../models/room');
const User = require('../models/user');

module.exports = {
    name: "join",
    description: "Lets you join a room",
    syntax: "{room/class} {code}",
    category: "Main",
    execute(message, args) {
        if (args[0]) {

            if (args[0].toLowerCase() == "room") {
                Room.findOne({ Code: args[1] }, (err, room) => {
                    if (err) console.log(err);
                    if (room != null) {
                        if (message.author.id != room.Owner) {
                            if (!room.People.includes(message.author.id)) {
                                room.People.push(message.author.id);

                                room.save()
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));
                                message.channel.send(`You have successfully joined the room ${room.Name}!`);
                            }
                            else {
                                message.channel.send(`You have already joined the room ${room.Name}.`)
                            }
                        }
                        else {
                            message.channel.send('Room Owner cannot join the room!')
                        }
                    }
                    else {
                        message.channel.send("Invaild code!");
                    }
                });
            }
            else if (args[0].toLowerCase() == "class") {
                Class.findOne({ Code: args[1] }, (err, aClass) => {
                    if (err) console.log(err);
                    if (aClass != null) {
                        if (message.author.id != aClass.Teacher) {
                            // Checks if Student is already in the class
                            if (Object.keys(aClass.Students).indexOf(message.author.id) == -1) {
                                let obj = {};
                                // Sets class points
                                obj[message.author.id] = { currency: 0, inv: [] };
                                aClass.Students.push(obj);

                                aClass.save()
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));
                                message.channel.send(`You have successfully joined the room ${aClass.Name}!`);
                                User.findOne({ id: message.author.id }, (err, user) => {
                                    if (err) console.log(err);
                                    if (user != null) {
                                        user.currentClassCode = args[1];
                                    }
                                    else {
                                        // Makes user if it does not exist
                                        user = new User({
                                            _id: mongoose.Types.ObjectId(),
                                            userID: message.author.id,
                                            currentClassCode: args[1]
                                        });

                                        user.save()
                                            .then(result => console.log(result))
                                            .catch(err => console.error(err));
                                    }
                                });
                            }
                            else {
                                message.channel.send(`You have already joined the class ${aclass.Name}.`)
                            }
                        }
                        else {
                            message.channel.send('Class Owner cannot join the room!')
                        }
                    }
                    else {
                        message.channel.send("Invaild code!");
                    }
                });
            }
            else {
                message.channel.send("Specify room or class");
            }
        }
        else {
            message.channel.send('Please specify what to join.')
        }
    }
};