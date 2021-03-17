module.exports = {
	name: "clear",
	usage: "number-of-messages",
	permissions: "ADMINISTRATOR",
	aliases: ["purge", "c"],
	description: "Clears specified number of messages in a channel.",
	async execute(client, message, args) {
		if (isNaN(args[0])) return message.channel.send("You didn't say how many messages to delete!");

		await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
			message.channel.bulkDelete(messages);
		});
	}
};