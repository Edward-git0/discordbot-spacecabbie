const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, version, guild_id } = require('./config.json');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log("Update");
    client.channels.get('667088501895856178').send("Updated!");

    try {
        const mongoose = require('mongoose.js');
        const dbOptions = {
            useNewUrlParser: true,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };
        mongoose.connect("mongodb://space_cabbie:Cabbie111222@ds259207.mlab.com:59207/heroku_sf7429h4", dbOptions);
        mongoose.set("useFindAndModify", false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on("connected", () => {
            console.log("Connected");
            client.channels.get('667088501895856178').send("Connected!");
        })
    } catch(err) {
        client.channels.get('667088501895856178').send(err);
    }
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
            let uptime = client.uptime / 1000;
            if(uptime > 60) {
                uptime = Math.round(uptime / 60);
                if(uptime > 60) {
                    uptime = Math.round(uptime / 60);
                    uptime = uptime.toString()+" Hours";
                } else { if(uptime == 1) { uptime = uptime.toString()+" Minute"; } else { uptime = uptime.toString()+" Minutes"; }}
            } else { uptime = uptime.toString()+" Seconds"; }
            const embed = new Discord.RichEmbed()
            embed.setColor("#0fe22b");
            embed.setTitle("Space Caddie");
            embed.setDescription("Bot Details");
            embed.addField("Uptime: ", uptime);
            embed.addField("Ping: ", client.ping+"ms");
            embed.addField("Status", "Alive");
            embed.setThumbnail("https://cdn.discordapp.com/avatars/667074896089579532/d8bc04cecf328a8f5516378e04d96e62.webp");
            embed.setFooter("Space Cabbie made by Edward", "https://cdn.discordapp.com/avatars/667074896089579532/d8bc04cecf328a8f5516378e04d96e62.webp");

            message.channel.send({embed});
        break;
    }
});

 

client.login(token);
