import ms from "parse-ms";
import { CooldownInstance, CurrencyInstance } from "../../db/dbInterfaces.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
    name: "daily",
    description: "Currency command that can be used to get coins once every day.",
    async execute(client: Client, message: Message): Promise<unknown> {
        const reward = 10000;
        const timeout = 86400000;

        const userMoney: CurrencyInstance | null = await client.Currency.findOne({ where: { id: message.author.id } });
        let userCD: CooldownInstance | null = await client.Cooldowns.findOne({ where: { id: message.author.id + this.name } });

        if (!userMoney) return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");

        if (!userCD) {
            userCD = await client.Cooldowns.create({
                id: message.author.id + this.name,
                cooldown: Date.now()
            });

            await userMoney.increment("bal", { by: reward });
            return message.channel.send("You collected your daily reward of 10,000 coins!");
        } else if (timeout - (Date.now() - userCD.cooldown) > 0) {
            interface msObj {
                days: number,
                hours: number,
                minutes: number,
                seconds: number,
                milliseconds: number,
                nanoseconds: number
            }

            const time: msObj = ms(timeout - (Date.now() - userCD.cooldown));
            return message.channel.send(`You already collected your daily reward! Collect again in ${time.hours}h ${time.minutes}m ${time.seconds}s`);
        } else {
            await userMoney.increment("bal", { by: reward });
            await client.Cooldowns.update({ cooldown: Date.now() }, { where: { id: message.author.id + this.name } });

            return message.channel.send("You collected your daily reward of 10,000 coins!");
        }
    }
});