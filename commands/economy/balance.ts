import { MessageEmbed, User } from "discord.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
	name: "balance",
	aliases: ["bal", "money"],
	description: "Currency command that shows the user's balance.",
	usage: "user",
	/**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
	async execute(client: Client, message: Message, args: string[]) {
		const user: User = message.mentions.users.first() || message.author;

		const { bal, bank, bankSpace } = client;
        let userBal: number = await bal.get(user.id);
		let userBank: number = await bank.get(user.id);
		let userBankSpace: number = await bankSpace.get(user.id);

		if (userBal === undefined && user.id === message.author.id) return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");
		else if (userBal === undefined && user.id !== message.author.id) {
			bal.set(user.id, 0);
			bank.set(user.id, 0);
			bankSpace.set(user.id, 0);

			userBal = await bal.get(user.id);
			userBank = await bank.get(user.id);
			userBankSpace = await bankSpace.get(user.id);
		} 

		const embed: MessageEmbed = new MessageEmbed()
			.setTitle(`${user.username}'s balance:`)
			.setColor("#ff0000")
			.addFields([
				{ name: "Wallet:", value: userBal },
				{ name: "Bank:", value: `${userBank}/${userBankSpace}` }
			])
			.setFooter("wow look at all that cash");
		message.channel.send(embed);
	}
};