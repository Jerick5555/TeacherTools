const Room = require('../models/room');
const Classroom = require('../models/class');
const mongoose = require('mongoose');
const Discord = require('discord.js');
const room = require('../models/room');
const Client = require('../index').client;

module.exports = {
    name: "show",
    description: "Shows people in the room.",
    syntax: "{room/class} {room code}",
    category: "Main",
    async execute(message, args) {
        if (args[0] == 'room') {
            const embed = new Discord.MessageEmbed()
                //can be formatted better
                .setTitle(`Rooms`)
                .setColor('#000000')
            function displayPeople(room) {
                if (room.People.length != 0) {
                    let pings = []
                    for (let i = 0; i < room.People.length ; i++) {
                        pings.push(`<@${room.People[i]}>`)
                    }
                    embed.addField('Participants: ', pings.join('\n'))
                }
                else {
                    embed.addField('Participants: ', 'Room Empty')
                }
            }

            await Room.findOne({ Owner: message.author.id }, (err, room) => {
                if (err) console.log(err);
                if (room != null) {
                    embed.addField("Room Name: ", `<${room.Name}>`, true);
                    embed.addField("Room Code: ", `<${room.Code}>`, true);
                    embed.addField("Owner: ", `<@${room.Owner}>`, true);
                    displayPeople(room);
                }
            });

            await Room.find({ People: message.author.id }, (err, rooms) => {
                if (err) console.log(err);
                if (rooms != null) {
                    for (let i = 0; i < rooms.length; i++) {
                        embed.addField("Room Name: ", `<${rooms[i].Name}>`, true);
                        embed.addField("Room Code: ", `<${rooms[i].Code}>`, true);
                        embed.addField("Owner: ", `<@${rooms[i].Owner}>`, true);
                        displayPeople(rooms[i]);
                    }
                }
            });
            message.channel.send(embed);
        }
        else if (args[0] == 'class') {
            const embed = new Discord.MessageEmbed()
                //can be formatted better
                .setTitle(`Classes`)
                .setColor('#000000')

            function displayStudents(classroom) {
                if (classroom.Students.length != 0) {
                    let pings = []
                    for (let i = 0; i < classroom.Students.length; i++) {
                        pings.push(`<@${Object.keys(classroom.Students[i])}>`)
                    }
                    embed.addField('Classmates: ', pings.join('\n'))
                }
                else {
                    embed.addField('Classmates: ', 'Class Empty')
                }
            }

            // Find class the user is a teacher of
            await Classroom.findOne({ Teacher: message.author.id }, (err, classroom) => {
                if (err) console.log(err);
                if (classroom != null) {
                    embed.addField("Class Name: ", `<${classroom.Name}>`, true);
                    embed.addField("Class Code: ", `<${classroom.Code}>`, true);
                    embed.addField("Teacher: ", `<@${classroom.Teacher}>`, true);
                    displayStudents(classroom);
                }
            });

            // Find class the user is a student of
            await Classroom.find({ Students: message.author.id }, (err, classrooms) => {
                if (err) console.log(err);
                if (classrooms != null) {
                    for (let i = 0; i < classrooms.length; i++) {
                        embed.addField("Class Name: ", `<${classrooms[i].Name}>`, true);
                        embed.addField("Class Code: ", `<${classrooms[i].Code}>`, true);
                        embed.addField("Teacher: ", `<@${classrooms[i].Teacher}>`, true);
                        displayStudents(classrooms[i]);
                    }
                }
            });

            message.channel.send(embed);
        }
        else {
            message.channel.send("Please specify the class/room.");
        }
    }
};