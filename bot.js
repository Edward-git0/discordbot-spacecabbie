const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '.';

client.on('ready', () => {
    client.user.setActivity('https://git.io/d.js-heroku', {type: 'WATCHING'});
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    
    if(command == "ping") {
        message.reply("Pong!");   
    }
});

 

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
