const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, version } = require('./config.json');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log("Update");
    client.channels.get('667088501895856178').send("Updated!");
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split('/ +/');
    const command = args.shift().toLowerCase();

    switch(command) {
        case "ping":
            client.commands.get('ping').execute(message, client.ping);
        break;
        case "avatar":
            client.commands.get('avatar').execute(message, args);
        break;
        case "version":
            message.channel.send("Version: " + version);
        break;
        case "status": 
            message.channel.send("Alive"); 
        break;
        case "bot":
            const embed = new Discord.RichEmbed()
            embed.setColor("#0fe22b");
            embed.setTitle("Space Caddie");
            embed.setDescription("Bot Details");
            embed.addField("Uptime: ", client.uptime);
            embed.addField("Ping: ", client.ping);
            embed.setThumbnail("https://cdn.discordapp.com/avatars/667074896089579532/d8bc04cecf328a8f5516378e04d96e62.webp");
            embed.setFooter("Space Cabbie made by Edward", "https://cdn.discordapp.com/avatars/667074896089579532/d8bc04cecf328a8f5516378e04d96e62.webp");

            message.channel.send({embed});
        break;
    }
});

 

client.login(token);
