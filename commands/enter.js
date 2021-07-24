const Room = require('../models/room');
const Class = require('../models/class');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const room = require('../models/room');
const User = require('../models/user');

module.exports = {
    name: "enter",
    description: "Lets you set your current class",
    syntax: "{code}",
    category: "Main",
    execute(message, args) {
        Class.findOne({ Code: args[0] }, (err, aClass) => {
            if (err) console.log(err);
            if (aClass != null) {
                // Finds if user is a Student or Teacher of the class
                console.log(Object.values(aClass.Students).includes(message.author.id))
                console.log(Object.keys(Object.values(aClass.Students)))
                console.log()
                if (aClass.Students.find(o => o[message.author.id]) || message.author.id == aClass.Teacher) {
                    // Changes current class code
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
                    message.channel.send('You are not part of the class!')
                }
            }
            else {
                message.channel.send("Invaild code!");
            }
        });
    }
};