const Discord = require('discord.js');
const mongoose = require('mongoose');
const client = new Discord.Client();
const { prefix } = require('./config.json');
const fs = require('fs');
client.mongoose = require('./utils/mongoose');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    exports.client = client;
});

// Tells us how many servers have our bot
client.login(process.env.token);

client.on('message', message => {
    // Check if the message was sent by the bot
    if (message.author.bot) return;

    // Check if message starts with the prefix
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).match(/\S+/g);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) {
        message.channel.send(`Invalid command. Type ${prefix}help for commands to use.`);
    }
    else {
        command.execute(message, args);
    }
});