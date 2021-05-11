import { MessageEmbed } from "discord.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
	name: "announce",
	description: "Announces with embed.",
	permissions: ["ADMINISTRATOR"],
	guildOnly: true,
	usage: "/ title here / description here / ping here (optional)",
	/**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
	execute(client: Client, message: Message, args: string[]) {
		const announceArgs = args.join(" ").split(" / ");
		let ping: any;
		
		if (!announceArgs[2]) {
			message.delete();
			const embed: MessageEmbed = new MessageEmbed()
				.setTitle(announceArgs[0])
				.setColor(client.config.themeColor)
				.setDescription(announceArgs[1]);
			message.channel.send(embed);
		} else {
			if (announceArgs[3] === "announce") {
				ping = "<@&801459490804727839>";
			} else if (announceArgs[2] === "everyone") {
				ping = "@everyone";
			} else if (announceArgs[2] === "here") {
				ping = "@here";
			} else if (announceArgs[2] === "misc") {
				ping = "<@&801459718965952624>";
			} else if (announceArgs[2] === "event") {
				ping = "<@&801459617196408863>";
			} else return message.channel.send("That's not a valid ping.");

			message.delete();
			message.channel.send(ping);
			
			const embed: MessageEmbed = new MessageEmbed()
				.setTitle(announceArgs[0])
				.setColor(client.config.themeColor)
				.setDescription(announceArgs[1]);
			message.channel.send(embed);
		}
	}
};