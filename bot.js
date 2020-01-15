const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    client.user.setActivity('https://git.io/d.js-heroku', {type: 'WATCHING'});
});

client.on('message', message => {
    if (message.content === 'ping') {
       message.reply('pong');
    }
});

 

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
