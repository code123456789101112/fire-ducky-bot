import { CurrencyInstance } from "../../interfaces/dbInterfaces.js";
import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
    name: "withdraw",
    aliases: ["with"],
    usage: "amount",
    description: "Currency command which withdraws money from your bank.",
    async execute(client: Client, message: Message, args: string[]): Promise<unknown> {
        const userMoney: CurrencyInstance | null = await client.Currency.findOne({ where: { id: message.author.id } });

        if (!userMoney) message.channel.send("You haven't started using currency yet. Use `=start` to get started.");

        if (!args[0] || isNaN(parseInt(args[0]))) return message.channel.send("Either you didn't say how much to withdraw or that is not a valid amount.");

        const amount: number = parseInt(args[0]);
        if (userMoney?.bank as number < amount) return message.channel.send("You don't have enough money in your bank for this.");
        
        await userMoney?.increment("bal", { by: amount });
        await userMoney?.decrement("bank", { by: amount });

        message.channel.send(`You successfully withdrew ${amount} coins!`);
    }
});