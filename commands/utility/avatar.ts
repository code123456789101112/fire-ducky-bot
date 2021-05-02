import { User } from "discord.js";
import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
	name: "avatar",
	description: "Shows the user's pfp.",
	aliases: ["av", "icon", "pfp", "profilepicture", "profilepic"],
	usage: "user",
	/**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
	execute(client: Client, message: Message, args: string[]) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
		}

		const avatarList: string[] = message.mentions.users.map((user: User) => {
			return `${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`;
		});

		message.channel.send(avatarList);
	}
};