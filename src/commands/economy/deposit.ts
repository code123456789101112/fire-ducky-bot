import { CurrencyInstance } from "../../db/dbInterfaces.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
    name: "deposit",
    aliases: ["dep"],
    usage: "amount",
    description: "Currency command which deposits money into your bank.",
    async execute(client: Client, message: Message, args: string[]): Promise<unknown> {
        const userMoney: CurrencyInstance | null = await client.Currency.findOne({ where: { id: message.author.id } });


        if (!userMoney) message.channel.send("You haven't started using currency yet. Use `=start` to get started.");

        if (!args[0] || isNaN(parseInt(args[0]))) return message.channel.send("Either you didn't say how much to deposit or that is not a valid amount.");

        const amount: number = parseInt(args[0]);
        if (userMoney?.bal as number < amount) return message.channel.send("You don't have enough money for this.");
        else if (amount + (userMoney?.bank as number) > (userMoney?.bankSpace as number)) return message.channel.send("Your bank isn't big enough for this");
        
        await userMoney?.decrement("bal", { by: amount });
        await userMoney?.increment("bank", { by: amount });

        message.channel.send(`You successfully deposited ${amount} coins!`);
    }
});