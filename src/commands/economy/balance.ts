import { MessageEmbed, User } from "discord.js";
import { CurrencyInstance } from "../../interfaces/dbInterfaces.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
	name: "balance",
	aliases: ["bal", "money"],
	description: "Currency command that shows the user's balance.",
	usage: "user",
	async execute(client: Client, message: Message): Promise<unknown> {
		const user: User = message.mentions.users.first() || message.author;

        let userMoney: CurrencyInstance | null = await client.Currency.findOne({ where: { id: user.id } });

		if (!userMoney && user.id === message.author.id) return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");
		else if (!userMoney && user.id !== message.author.id) {
			userMoney = await client.Currency.create({
				id: user.id,
				bal: 0,
				bank: 0,
				bankSpace: 1000
			});
		} 

		const embed: MessageEmbed = new MessageEmbed()
			.setTitle(`${user.username}'s balance:`)
			.setColor(client.config.themeColor)
			.addFields([
				{ name: "Wallet:", value: userMoney?.bal },
				{ name: "Bank:", value: `${userMoney?.bank}/${userMoney?.bankSpace}` }
			])
			.setFooter("wow look at all that cash");
		message.channel.send(embed);
	}
});