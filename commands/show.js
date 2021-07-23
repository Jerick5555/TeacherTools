const Room = require('../models/room');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const room = require('../models/room');
const Client = require('../index').client;

module.exports = {
    name: "show",
    description: "Shows people in the room.",
    syntax: "{room code}",
    category: "Main",
    execute(message, args) {
    if(args[0]){
        Room.findOne({ Name: args[0]}, (err, room) => {
            if (err) console.log(err);
                if (room != null) {
                    const embed = new Discord.MessageEmbed()
                    //can be formatted better
                    .setTitle(`Room Code: ${args[0]}`)
                    .setColor('#000000')
                    //access the new db here future matthew..
                    .addField("Owner: ", room.Owner, true)
                    .addField('Participants: ',(room.__v != 0) ? room.People.join('\n') : 'Room Empty')
                    
                    message.channel.send(embed);
                }
                
            else {
                message.channel.send("Invaild code!");
            }
        });
    }
    else{
        message.channel.send("Please specify the room.");
    }
    }
};