/* eslint-disable @typescript-eslint/no-explicit-any */

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
	name: "help",
	description: "List all of the commands or info about a specific command.",
	aliases: ["commands"],
	async execute(client: Client, message: Message, args: string[]): Promise<unknown> {
		const data = [];

		if (!args.length) {
			data.push("Here's a list of all my commands:");
			data.push(client.commands.map((command: any) => command.name).join(", "));
			data.push(`\nYou can send \`${client.config.prefix}help [command name]\` (without the brackets obviously) to get info on a specific command!`);

			try {
				await message.author.send(data, { split: true });
				if (message.channel.type === "dm") return;
				message.reply("I've sent you a DM with all my commands!");
			} catch (error) {
				console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
				message.reply("it seems like I can't DM you!");
			}
		}
   
		const name: string = args[0]?.toLowerCase();
		if (name) {
			const command: Command = client.commands.get(name as string) as Command || client.commands.find((c: any) => c.aliases?.includes(name as string)) as Command;

			if (!command) return message.reply("that's not a valid command!");

			data.push(`**Name:** ${command.name}`);

			if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(", ")}`);
			if (command.description) data.push(`**Description:** ${command.description}`);
			if (command.usage) data.push(`**Usage:** ${client.config.prefix + command.name} ${command.usage}`);
			if (command.cooldown) data.push(`**Cooldown:** ${command.cooldown} seconds`);

			message.channel.send(data, { split: true });
		}
	},
});