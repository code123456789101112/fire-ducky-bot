import { User } from "discord.js";
import { CurrencyInstance } from "../../db/dbInterfaces.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
    name: "give",
    usage: "user money",
    description: "Gives money to someone else.",
    async execute(client: Client, message: Message, args: string[]): Promise<unknown> {
        const authorBal: CurrencyInstance | null = await client.Currency.findOne({ where: { id: message.author.id } });
        if (!authorBal) return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");
        
        const user: User = message.mentions.users.first() || await client.users.fetch(args[0]);
        if (!user) return message.channel.send("You didn't say who to give money to!");

        let userBal: CurrencyInstance | null = await client.Currency.findOne({ where: { id: user.id } });
        if (!userBal) {
            userBal = await client.Currency.create({
                id: user.id,
                bal: 0,
                bank: 0,
                bankSpace: 1000
            });
        }

        if (isNaN(parseInt(args[1]))) return message.channel.send("That's not a valid amount");

        const amount: number = parseInt(args[1]);
        if (amount > authorBal.bal) return message.channel.send("You don't have enough for this.");

        await authorBal.decrement("bal", { by: amount });
        await userBal.increment("bal", { by: amount });

        message.channel.send(`You successfully gave ${amount} to ${user.username}!`);
    }
});