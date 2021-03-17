module.exports = {
	name: "ping",
	description: "Shows the bot's ping.",
	cooldown: 10,
	execute(client, message, args) {
		message.channel.send("Pinging...").then(m =>{
			const ping = m.createdTimestamp - message.createdTimestamp;
			m.edit(`Pong! \`${ping}ms\``);
		});
	}
};