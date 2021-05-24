import { User } from "discord.js";
import { CurrencyInstance } from "../../db/dbInterfaces.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
    name: "setbal",
    usage: "user bal",
    description: "sets a user's balance",
    devOnly: true,
    async execute(client: Client, message: Message, args: string[]): Promise<unknown> {
        const user: User = message.mentions.users.first() || await client.users.fetch(args[0]);
        if (!user) return;

        let userMoney: CurrencyInstance | null = await client.Currency.findOne({ where: { id: user.id } });

        if (!userMoney) {
            userMoney = await client.Currency.create({
                id: user.id,
                bal: 0,
                bank: 0,
                bankSpace: 1000
            });
        }

        await userMoney.increment("bal", { by: parseInt(args[1]) });
        message.channel.send("You set the balance.");
    }
});