const Room = require('../models/room');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const room = require('../models/room');
const Client = require('../index').client;

module.exports = {
    name: "show",
    description: "Shows people in the room.",
    syntax: "show {room code}",
    category: "Main",
    execute(message, args) {
        Room.findOne({ Name: args[0]}, (err, room) => {
            if (err) console.log(err);
                if (room != null) {
                    console.log('helllooooooo')
                    console.log(room)

                    const embed = new Discord.MessageEmbed()
                    //can be formatted better
                    .setTitle(`Room Code: ${args[0]}`)
                    .setColor('#000000')
                    //access the new db here future matthew..
                    .addField("Owner: ", Client.users.fetch(room.Owner), true)
                    .addField('Participants: ', Client.users.fetch(room.People).join('/n'), true)

                    message.channel.send(embed);
                }
                
            else {
                message.channel.send("Invaild code!");
            }
        });
    }
};