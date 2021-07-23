const Room = require('../models/room');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const room = require('../models/room');
const Client = require('../index').client;

module.exports = {
    name: "random",
    description: "Randomly chooses one person from the room.",
    syntax: "{room code}",
    category: "Main",
    execute(message, args) {
        Room.findOne({ Name: args[0]}, (err, room) => {
            if (err) console.log(err);
                if (room != null) {
                    if(message.author.username == room.Owner){
                        let index = Math.floor(Math.random() * room.__v)
                        message.channel.send(`The lucky person is ${room.People[index]}!! :clap:`)
                    }
                    else{
                        message.channel.send('Only the room owner can get random names.')
                    }
                }
                
            else {
                message.channel.send("Invaild code!");
            }
        });
    }
};