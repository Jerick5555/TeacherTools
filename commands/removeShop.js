const Room = require('../models/room');
const Class = require('../models/class');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const room = require('../models/room');
const User = require('../models/user');

module.exports = {
    name: "removeShop",
    description: "Lets teacher removes an item from class shop",
    syntax: "{item name}",
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
                    itemIndex = aClass.shop.findIndex(item => item.Name === args[0])
                    if (itemIndex == -1){
                        message.channel.send("Item does not exist");
                    };
                    aClass.shop.splice(itemIndex, 1);

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