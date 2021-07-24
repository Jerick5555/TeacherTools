const User = require('../models/user');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const Class = require('../models/class');
module.exports = {
    name: "balance",
    description: "Shows the amount of currency a player has",
    syntax: "",
    category: "Economy",
    async execute(message, args) {
        User.findOne({ userID: message.author.id }, (err, user) => {
            if (err) console.log(err);
            if (user == null) {
                message.channel.send("Join or create a class or room to create user!");
                return;
            }

            Class.findOne({ Code: user.currentClassCode }, (err, aClass) => {
                if (aClass == null) {
                    message.channel.send("You do not have a valid class");
                    return;
                }
                if (aClass.Teacher == message.author.id){
                    message.channel.send("You are the Teacher of this class! You cannot have money here!");
                    return;
                }
                else {
                    student = aClass.Students.find(Student => Object.keys(Student)[0] == message.author.id );
                    console.log(student)
                    let name = message.member.user.tag.toString();
                    name = name.split("#", name.length - 4);
                    name = name[0];
                    const embed = new Discord.MessageEmbed()
                        .setTitle(name + 's Balance')
                        .setColor('#000000')
                        .addField(student[message.author.id].currency + ":moneybag:", "​");
                    message.channel.send(embed);
                }
            });
        })
    }
}