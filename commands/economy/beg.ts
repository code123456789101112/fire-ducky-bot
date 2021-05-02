import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
	name: "beg",
	cooldown: 15,
	description: "Currency command which raises balance by random number.",
	/**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
	async execute(client: Client, message: Message, args: string[]) {
		const { bal } = client;
		const userBal: number = await bal.get(message.author.id);

		if (userBal === undefined) return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");

		const random: number = client.randomInt(5, 400);
		bal.set(message.author.id, userBal + random);

		message.channel.send(`You begged and received ${random} coins!`);
	}
};