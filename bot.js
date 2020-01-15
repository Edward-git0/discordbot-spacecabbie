const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'ping') {
       message.reply('pong');
    }
});

 

client.login(process.env.NjY3MDc0ODk2MDg5NTc5NTMy.Xh9dIQ.f9vt30qWlnyUnWu3JsmhX0d4r3I
);//where BOT_TOKEN is the token of our bot
