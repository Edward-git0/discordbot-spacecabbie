module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
        message.reply('Pong! ('+args.sub(6)+'ms)')
	},
};