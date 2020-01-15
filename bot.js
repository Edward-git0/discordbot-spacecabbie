const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token, version } = require('./config.json');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.modules = new Discord.Collection();
const moduleFiles = fs.readdirSync('./modules').filter(file => file.endsWith('js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

for (const file of moduleFiles) {
    const module1 = require(`./modules/${file}`);
    client.modules.set(module1.name, module1);
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
            const embedDetails = {
                "setTitle": "Title",
                "setDescription": "Description"
            }
            const embed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTitle('Some title')
            .setURL('https://discord.js.org/')
            .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            .setDescription('Some description here')
            .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addField('Regular field title', 'Some value here')
            .addBlankField()
            .addField('Inline field title', 'Some value here', true)
            .addField('Inline field title', 'Some value here', true)
            .addField('Inline field title', 'Some value here', true)
            .setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
            client.channels.get('667088501895856178').send({embed});
            client.commands.get('ping').execute(message, args);
        break;
        case "avatar":
            client.commands.get('avatar').execute(message, args);
        break;
        case "test": message.channel.send("Alive"); break;
    }
});

 

client.login(token);//BOT_TOKEN is the Client Secret
