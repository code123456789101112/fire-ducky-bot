import { MessageEmbed } from "discord.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
	name: "announce",
	description: "Announces with embed.",
	permissions: ["ADMINISTRATOR"],
	guildOnly: true,
	usage: "/ title here / description here / ping here (optional)",
	execute(client: Client, message: Message, args: string[]): unknown {
		const announceArgs = args.join(" ").split(" / ");
		let ping: string;
		
		if (!announceArgs[2]) {
			message.delete();
			const embed: MessageEmbed = new MessageEmbed()
				.setTitle(announceArgs[0])
				.setColor(client.config.themeColor)
				.setDescription(announceArgs[1]);
			message.channel.send({ embeds: [embed] });
		} else {
			if (announceArgs[3] === "announce") {
				ping = `<@&${client.config.ids.roles.announce}>`;
			} else if (announceArgs[2] === "everyone") {
				ping = "@everyone";
			} else if (announceArgs[2] === "here") {
				ping = "@here";
			} else if (announceArgs[2] === "misc") {
				ping = `<@&${client.config.ids.roles.misc}>`;
			} else if (announceArgs[2] === "update") {
				ping = `<@&${client.config.ids.roles.update}>`;
			} else return message.channel.send("That's not a valid ping.");

			message.delete();
			message.channel.send(ping);
			
			const embed: MessageEmbed = new MessageEmbed()
				.setTitle(announceArgs[0])
				.setColor(client.config.themeColor)
				.setDescription(announceArgs[1]);
			message.channel.send({ embeds: [embed] });
		}
	}
});