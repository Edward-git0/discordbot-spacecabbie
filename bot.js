const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.modules = new Discord.Collection();
const moduleFiles = fs.readdirSync('./modules').filter(file => file.endsWith('js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

for (const file of moduleFiles) {
    const module = require(`./modules/${file}`);
    client.modules.set(module.name, module);
}

client.on('ready', () => {
    console.log("Ready");
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split('/ +/');
    const command = args.shift().toLowerCase();

    switch(command) {
        case "ping":
            const embedDetails = {
                "setColor": "#0099ff",
                "setTitle": "Title",
                "setDescription": "Description"
            };
            client.commands.get('ping').execute(message, args, client.modules.get('embed').execute(embedDetails));
        break;
        case "avatar":
            client.commands.get('avatar').execute(message, args);
        break;
    }
});

 

client.login(token);//BOT_TOKEN is the Client Secret
