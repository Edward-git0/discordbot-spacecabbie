const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '.';

client.on('ready', () => {
    console.log("Ready");
});

client.on('message', message => {
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    
    if(command == "ping") {
        message.reply("Pong!");   
    }
    
    if (!args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

	message.channel.send(`Command name: ${command}\nArguments: ${args}`);
});

 

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
