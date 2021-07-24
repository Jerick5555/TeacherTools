const User = require('../models/user');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const Class = require('../models/class');
module.exports = {
    name: "currency",
    description: "Shows the amount of currency a player has",
    syntax: "",
    category: "Economy",
    async execute(message, args) {
        queryCurrentRoomCode = await User.findOne({ userID: message.author.id }, (err, enemy) => {
        });
        if(queryCurrentRoomCode == null) return message.channel.send("It seems like that you do not have a curreny room code");
        console.log(queryCurrentRoomCode)
        User.findOne({ userID: message.author.id }, (err, user) => {
            if (user == null) {
                message.channel.send("You have not set up a player yet! Do !start to start.");
            }
            
            Class.findOne({ Code: queryCurrentRoomCode.currentClassCode }, (err, target) => {
                if (target == null) {
                    message.channel.send("You do not have a valid class");
                }
                else {
                    let name = message.member.user.tag.toString();
                    name = name.split("#", name.length - 4);
                    name = name[0];
                    const embed = new Discord.MessageEmbed()
                        .setTitle(name + 's Balance')
                        .setColor('#000000')
                        .addField(target.Students[0][transferTargetID].currency + ":moneybag:", "​");
                    message.channel.send(embed);
                }
            });
        })
    }
}