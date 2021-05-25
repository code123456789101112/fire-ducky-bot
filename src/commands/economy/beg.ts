import { CurrencyInstance } from "../../interfaces/dbInterfaces.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
	name: "beg",
	cooldown: 15,
	description: "Currency command which raises balance by random number.",
	async execute(client: Client, message: Message): Promise<unknown> {
		const userMoney: CurrencyInstance | null = await client.Currency.findOne({ where: { id: message.author.id } });

		if (!userMoney) return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");

		const random: number = client.randomInt(5, 400);
		await userMoney.increment("bal", { by: random });

		message.channel.send(`You begged and received ${random} coins!`);
	}
});