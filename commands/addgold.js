const User = require('../models/user');
const Class = require('../models/class');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const teachers = require('../models/teacher');
module.exports = {
    name: "addgold",
    description: "Give someone money from the void",
    syntax: "{Player giving money to} {Amount of money}",
    cooldown: 5,
    aliases: [''],
    category: "Admin",
    async execute(message, args) {
        queryCurrentRoomCode = await User.findOne({ userID: message.author.id }, (err, enemy) => {
        });
        //Find the default class so that the user
        console.log(queryCurrentRoomCode.currentClassCode);
        if (queryCurrentRoomCode == null) return message.channel.send("Looks like you have not created an account. Please create a class!");
        const transferAmount = parseInt(args.find(arg => !/<@!?\d+>/g.test(arg)));
        const transferTarget = message.mentions.users.first();
        if (true != false) {
            User.findOne({ userID: message.author.id }, (err, user) => {
                if (user == null) {
                    message.channel.send("You have not set up a player yet! Do !start to start.");
                }
                else {
                    if (!transferAmount || isNaN(transferAmount)) {
                        message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
                        return;
                    }
                    if (transferAmount <= 0) {
                        message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);
                        return;
                    }
                }
                if (transferTarget == undefined) {
                    message.channel.send("invalid id");
                    return;
                }
                Class.findOne({ Code: queryCurrentRoomCode.currentClassCode }, (err, target) => {
                    if (target == null) {
                        message.channel.send("The person you are trying to give money to has not set up a player yet! Do =start to start.");
                    }
                    else {
                        let transferTargetID = transferTarget.id

                        target.Students[0][transferTargetID].currency += transferAmount;
                        user.save()
                            .then(result => console.log(result))
                            .catch(err => console.error(err));
                        target.markModified('Students');
                        target.save()
                            .then(result => console.log(result))
                            .catch(err => console.error(err));
                        message.channel.send(`Successfully added ${transferAmount}<:cash_24:751784973488357457> to ${transferTarget.tag}. Their current balance is ${target.Students[0][transferTargetID].currency}<:cash_24:751784973488357457>`);
                    }
                });
            })
        } else {
            message.channel.send("You have to be a teacher to use this command")
        }
    }
}