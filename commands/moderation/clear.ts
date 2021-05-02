import { TextChannel } from "discord.js";
import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
	name: "clear",
	usage: "number-of-messages",
	permissions: "ADMINISTRATOR",
	aliases: ["purge", "c"],
	description: "Clears specified number of messages in a channel.",
	/**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
	async execute(client: Client, message: Message, args: string[]) {
		if (isNaN(parseInt(args[0]))) return message.channel.send("You didn't say how many messages to delete!");

		await message.channel.messages.fetch({ limit: parseInt(args[0]) }).then(messages => {
			(message.channel as TextChannel).bulkDelete(messages);
		});
	}
};