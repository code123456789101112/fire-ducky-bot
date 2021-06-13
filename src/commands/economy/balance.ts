import { MessageEmbed, User } from "discord.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
	name: "balance",
	aliases: ["bal", "money"],
	description: "Currency command that shows the user's balance.",
	usage: "user",
	async execute(client: Client, message: Message): Promise<void> {
		const user: User = message.mentions.users.first() || message.author;
		
        const userMoney = await client.Currency.findByIdOrCreate(user.id, {
			_id: user.id,
			bal: 0,
			bank: 0,
			bankSpace: 1000
		});

		const embed: MessageEmbed = new MessageEmbed()
			.setTitle(`${user.username}'s balance:`)
			.setColor(client.config.themeColor)
			.addFields([
				{ name: "Wallet:", value: `${userMoney.bal}` },
				{ name: "Bank:", value: `${userMoney.bank}/${userMoney.bankSpace}` }
			])
			.setFooter("wow look at all that cash");
		message.channel.send({ embeds: [embed] });
	}
});