require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.login(process.env.DISCORD_BOT_TOKEN);
console.log('logged in');
