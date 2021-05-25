import { CurrencyInstance } from "../../interfaces/dbInterfaces.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
    name: "start",
    description: "Starts currency.",
    async execute(client: Client, message: Message): Promise<unknown> {
        const userMoney: CurrencyInstance | null = await client.Currency.findOne({ where: { id: message.author.id } });

        if (userMoney) return;

        await client.Currency.create({
            id: message.author.id,
            bal: 0,
            bank: 0,
            bankSpace: 1000
        });

        message.author.send("Welcome to the currency system! There are many commands, so use `=help` to see them all!");
    }
});