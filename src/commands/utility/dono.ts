import { User } from "discord.js";
import { DonationInstance } from "../../interfaces/dbInterfaces.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
    name: "dono",
    description: "tracks donations (dank memer)",
    async execute(client: Client, message: Message, args: string[]): Promise<unknown> {
        if (/^(add)|(increment)|(raise)|(up)$/i.test(args[0])) {
            if (!message.member?.roles.cache.has("832632548671881227")) return message.channel.send("You can't do this!");

            const user: User = message.mentions.users.first() || await client.users.fetch(args[1]);
            if (!user) return message.channel.send("You didn't say who to add to!");

            let userDono: DonationInstance | null = await client.Donations.findOne({ where: { id: user.id } });

            if (!userDono) {
                userDono = await client.Donations.create({
                    id: user.id,
                    amount: 0
                });
            }

            await userDono.increment("amount", { by: parseInt(args[2]) });
            message.channel.send(`Added ${args[2]} to ${user.username}'s total donations!`);
        } else if (/^(remove)|(delete)$/i.test(args[0])) {
            if (!message.member?.roles.cache.has("832632548671881227")) return message.channel.send("You can't do this!");

            const user: User = message.mentions.users.first() || await client.users.fetch(args[1]);
            if (!user) return message.channel.send("You didn't say who to remove from!");

            let userDono: DonationInstance | null = await client.Donations.findOne({ where: { id: user.id } });

            if (!userDono) return message.channel.send("This person doesn't have any donations!");

            if (userDono.amount - parseInt(args[2]) <= 0) {
                await client.Donations.update({ amount: 0 }, { where: { id: user.id } });
                userDono = await client.Donations.findOne({ where: { id: user.id } });
            } else {
                await userDono.decrement("amount", { by: parseInt(args[2]) });
                userDono = await client.Donations.findOne({ where: { id: user.id } });
            }

            message.channel.send(`Success! ${user.username}'s total donation amount is now ${userDono?.amount}`);
        } else if (/^(view)|(show)$/i.test(args[0])) {
            const user = message.mentions.users.first() || await client.users.fetch(args[1]);
            if (!user) return message.channel.send("You didn't say who to view! use =dono <me or my> if you want to check yourself");

            const userDono: DonationInstance | null = await client.Donations.findOne({ where: { id: user.id } });

            message.channel.send(`${user.username}'s total donation amount: ${userDono?.amount || 0}`);
        } else if (/^(me)|(my)$/i.test(args[0])) {
            const userDono: DonationInstance | null = await client.Donations.findOne({ where: { id: message.author.id } });
            message.channel.send(`${message.author.username}'s total donation amount: ${userDono?.amount || 0}`);
        }
    }
});