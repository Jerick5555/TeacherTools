const Room = require('../models/room');
const Class = require('../models/class');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const room = require('../models/room');
const User = require('../models/user');

module.exports = {
    name: "leave",
    description: "Lets you leave a room or class",
    syntax: "{room/class} {code/name (code default)} {actual code or name}",
    category: "Main",
    execute(message, args) {
        if (args[0]) {

            if (args[0].toLowerCase() == "room") {
                if(args.length < 3){
                    let type = { Code: args[2] }
                    if(args[1].toLowerCase() == 'name'){
                        type = { Name: args[2] }
                    }
                }
                else{
                    let type = { Code: args[1] }
                    if(args[1].toLowerCase() == 'name'){
                        type = { Name: args[1] }
                    }
                }
                
                console.log(type)
                Room.findOne(type, (err, room) => {
                    if (err) console.log(err);
                    if (room != null) {
                        if (message.author.id != room.Owner) {
                            let index = room.People.indexOf(message.author.id);
                            if (index != -1) {
                                room.People.splice(index, 1);
                
                                room.save()
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));
                                message.channel.send(`You have successfully left the room ${room.Name}!`);
                            }
                            else {
                                message.channel.send(`You are not in the room ${room.Name}.`)
                            }
                        }
                        else {
                            message.channel.send('Room Owner cannot leave the room, to close room use close command!')
                        }
                    }
                    else {
                        message.channel.send("Invaild code or name!");
                    }
                });
            }
            else if (args[0].toLowerCase() == "class") {
                if(args.length < 3){
                    let type = { Code: args[2] }
                    if(args[1].toLowerCase() == 'name'){
                        type = { Name: args[2] }
                    }
                }
                else{
                    let type = { Code: args[1] }
                    if(args[1].toLowerCase() == 'name'){
                        type = { Name: args[1] }
                    }
                }
                
                console.log(type)
                Class.findOne(type, (err, aClass) => {
                    if (err) console.log(err);
                    if (aClass != null) {
                        if (message.author.id != aClass.Teacher) {
                            // Checks if Student is already in the class
                            let index = aClass.Student.indexOf(message.author.id);
                            if (index != -1) {
                                aClass.Student.splice(index, 1);

                                aClass.save()
                                    .then(result => console.log(result))
                                    .catch(err => console.error(err));
                                message.channel.send(`You have successfully left the class ${aclass.Name}!`);
                            }
                            else {
                                message.channel.send(`You are not in the class ${aclass.Name}.`)
                            }
                        }
                        else {
                            message.channel.send('Class Owner cannot leave the class, to close class use close command!')
                        }
                    }
                    else {
                        message.channel.send("Invaild code!");
                    }
                });
            }
            else {
                message.channel.send("Specify room or class");
            }
        }
        else {
            message.channel.send('Please specify what to join.')
        }
    }
};