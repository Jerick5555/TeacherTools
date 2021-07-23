const User = require('../models/user');
const mongoose = require('mongoose');
const Discord = require('discord.js');

module.exports = {
    name: "start",
    description: "Sets up a new player",
    syntax: "",
    category: "Fun",
    execute(message, args) {
        User.findOne({ userID: message.author.id }, (err, user) => {
            if (err) console.log(err);
            if (user == null) {
                let name = message.member.user.tag.toString();
                name = name.split("#", name.length - 4);
                name = name[0];
                user = new User({
                    _id: mongoose.Types.ObjectId(),
                    userID: message.author.id,
                    username: message.member.user.tag,
                    currency: 0,
                    inv: {"Welcome gift": {"quantity": 1,"emote": ":gift:","type": "fruit"}},
                });
                user.save()
                    .then(result => console.log(result))
                    .catch(err => console.error(err));
                message.channel.send('You have been successfully registered! Go FORTH and play');
            }
            else {
                message.channel.send("You have already made a player");
            }
        });
    }
};