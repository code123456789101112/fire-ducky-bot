const talkedRecently = new Set();

module.exports = {
	name: 'ping',
	description: 'Shows the bot\'s ping.',
	cooldown: "10",
	execute(client, message, args) {
		if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait 10 seconds before getting typing this again. - " + message.author.username);
		} else {
			message.channel.send("Pinging...").then(m =>{
				var ping = m.createdTimestamp - message.createdTimestamp;
				m.edit(`Pong! \`${ping}ms\``);
			});

			talkedRecently.add(message.author.id);
			setTimeout(() => {

			talkedRecently.delete(message.author.id);
			}, 10000);
		}
	},
};