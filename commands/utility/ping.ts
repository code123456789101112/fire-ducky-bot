import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
	name: "ping",
	description: "Shows the bot's ping.",
	cooldown: 10,
	/** 
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
	execute(client: Client, message: Message, args: string[]) {
		message.channel.send("Pinging...").then(m => {
			const ping = m.createdTimestamp - message.createdTimestamp;
			m.edit(`Pong! \`${ping}ms\``);
		});
	}
};