const Room = require('../models/room');
const Class = require('../models/class');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const room = require('../models/room');
const User = require('../models/user');

module.exports = {
    name: "changename",
    description: "Lets you change a room/class name",
    syntax: "{room/class} {code} {new name}",
    category: "Main",
    execute(message, args) {
        if (args[0]) {
            let newName;
            if(args[2]){
                let array = args.slice(2)
                newName = array.join(' ')
            }
            else{
                message.channel.send('Plese enter a new name for the class or room.')
            }

            if (args[0].toLowerCase() == "room") {
                Room.findOne({ Code: args[1] }, (err, room) => {
                    if (err) console.log(err);
                    if (room != null) {
                        if (message.author.id == room.Owner) {
                            room.Name = newName;
                                room.save()
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));
                                message.channel.send(`You have successfully changed the room name to ${room.Name}!`);
                        }
                        else {
                            message.channel.send('Only the room owner can change the room name!')
                        }
                    }
                    else {
                        message.channel.send("Invaild code!");
                    }
                });
            }
            else if (args[0].toLowerCase() == "class") { 
                Class.findOne({ Code: args[1] }, (err, classroom) => {
                if (err) console.log(err);
                if (room != null) {
                    if (message.author.id == classroom.Teacher) {
                        classroom.Name = newName;
                            classroom.save()
                                .then(result => console.log(result))
                                .catch(err => console.error(err));
                            message.channel.send(`You have successfully changed the class name to ${classroom.Name}!`);
                    }
                    else {
                        message.channel.send('Only the class owner can change the class name!')
                    }
                }
                else {
                    message.channel.send("Invaild code!");
                }
            });
        }
        }
        
        else {
            message.channel.send('Please specify what to join.')
        }
    }
};