import { MessageEmbed } from "discord.js";
import { CurrencyInstance } from "../../interfaces/dbInterfaces.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
    name: "bet",
    aliases: ["gamble"],
    usage: "<amount>",
    description: "gamble command",
    cooldown: 6,
    async execute(client: Client, message: Message, args: string[]): Promise<unknown> {
        const userMoney: CurrencyInstance | null = await client.Currency.findOne({ where: { id: message.author.id } });

        const bet = parseInt(args[0]);

        if (!userMoney) return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");
        else if (!args[0] || isNaN(parseInt(args[0]))) return message.channel.send("You didn't say how much to bet!");
        else if (bet < 500) return message.channel.send("You can't bet less than 500.");
        else if (bet > 100000) return message.channel.send("You can't bet more than 100,000.");
        else if (bet > userMoney.bal) return message.channel.send("You don't have enough money in your wallet for that!");

        const userRoll: number = client.randomInt(0, 10);
        const botRoll: number = client.randomInt(0, 10);

        const embed: MessageEmbed = new MessageEmbed()
            .setTitle(`${message.author.username}'s gambling game`)
            .addFields([
                { name: "You Roll", value: userRoll },
                { name: "Bot's Roll", value: botRoll }
            ]);
        if (userRoll > botRoll) {
            embed.setColor("#05ed43");
            embed.setDescription("You Won!!");

            const winAmount = client.randomInt(bet * 0.1, bet * 2);
            await userMoney.increment("bal", { by: winAmount });

            message.channel.send(`You won ${winAmount}!!`, { embed });
        } else if (userRoll === botRoll) {
            embed.setColor("#ebcf00");
            embed.setDescription("It's a tie!");

            message.channel.send("You didn't win or lose anything!", { embed });
        } else {
            embed.setColor("#ff0000");
            embed.setDescription("You lost!!");

            await userMoney.decrement("bal", { by: bet });
            message.channel.send("You lost your entire bet!", { embed });
        }
    }
});