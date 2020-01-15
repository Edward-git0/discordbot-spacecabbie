module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
		message.reply(client.modules.get('embed').execute(message, args));
	},
};