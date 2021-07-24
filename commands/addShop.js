const Room = require('../models/room');
const Class = require('../models/class');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const room = require('../models/room');
const User = require('../models/user');

module.exports = {
    name: "addShop",
    description: "Lets teacher add an item to class shop",
    syntax: "{item name} {cost}",
    category: "Main",
    execute(message, args) {
        user = User.findOne({ UserID: message.author.id }).exec();
        if (user == null){
            message.channel.send("Join or create a class or room to create user!");
            return;
        }

        Class.findOne({ Code: user.currentClassCode }, (err, aClass) => {
            if (err) console.log(err);
            if (aClass != null) {
                if (message.author.id == aClass.Teacher) {
                    if(!args[1].isInteger()){
                        message.channel.send("Cost of item must be a number");
                        return;
                    }
                    obj = {};
                    obj[args[0]] = args[1];
                    aClass.Shop.push(obj);
                    
                    aClass.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
                }
                else {
                    message.channel.send(`You are not the Teacher of this class (${aClass.Name})`)
                }
            }
            else {
                message.channel.send("Invaild code! Enter a class using !enter to use this command.");
            }
        });
    }
};