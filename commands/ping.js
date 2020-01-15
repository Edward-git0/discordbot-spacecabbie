module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
        message.reply('Pong! ('+args.substring(1,6)+'ms)')
	},
};