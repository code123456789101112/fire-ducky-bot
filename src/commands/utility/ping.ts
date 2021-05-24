import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
	name: "ping",
	description: "Shows the bot's ping.",
	cooldown: 10,
	execute(_client: Client, message: Message): void {
		message.channel.send("Pinging...").then(m => {
			const ping = m.createdTimestamp - message.createdTimestamp;
			m.edit(`Pong! \`${ping}ms\``);
		});
	}
});