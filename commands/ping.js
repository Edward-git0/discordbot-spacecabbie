module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
        message.reply('Pong!').then((msg) => {
            msg.edit(client.ping+'\n'+msg);
        })
	},
};