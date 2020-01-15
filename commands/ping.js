module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
        const ping = tostring(args).substring(1,6);
        message.reply('Pong! ('+ping+'ms)')
	},
};