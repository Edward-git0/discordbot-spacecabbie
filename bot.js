const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');

client.on('ready', () => {
    console.log("Ready");
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split('/ +/');
    const command = args.shift().toLowerCase();

    switch(command) {
        case "ping":
            return message.reply("Pong!");
        break;
        case "avatar":
            if (!message.mentions.users.size) {
                return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
            }
        break;
    }
});

 

client.login(token);//BOT_TOKEN is the Client Secret
