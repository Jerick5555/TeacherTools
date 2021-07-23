const Room = require('../models/room');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const room = require('../models/room');

module.exports = {
    name: "join",
    description: "Lets you join a room",
    syntax: "",
    category: "Main",
    execute(message, args) {
        Room.findOne({ Name: args[0]}, (err, room) => {
            if (err) console.log(err);
            if (room != null) {
                room.People.push(message.author.id);

                room.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
                message.channel.send(`You have successfully joined the room!`);
            }
            else {
                message.channel.send("Invaild code!");
            }
        });
    }
};