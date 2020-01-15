module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args, embed) {
		message.send(embed);
	},
};