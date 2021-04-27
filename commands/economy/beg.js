const Client = require("../../client.js");
const Message = require("../../message.js");

module.exports = {
	name: "beg",
	cooldown: 15,
	description: "Currency command which raises balance by random number.",
	/**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
	async execute(client, message, args) {
		const { bal } = client;
		const userBal = await bal.get(message.author.id);

		if (userBal === undefined) return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");

		const random = Math.round(Math.random() * 400);
		bal.set(message.author.id, userBal + random);

		message.channel.send(`You begged and received ${random} coins!`);
	}
};