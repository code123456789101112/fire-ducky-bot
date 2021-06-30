import { User } from "discord.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
    name: "dono",
    description: "tracks donations (dank memer)",
    async execute(client: Client, message: Message, args: string[]): Promise<unknown> {
        if (/^(add)|(increment)|(raise)|(up)$/i.test(args[0])) {
            if (!message.member?.roles.cache.has("832632548671881227"))
                return message.channel.send("You can't do this!");

            const user: User = message.mentions.users.first() || (await client.users.fetch(args[1] as `${bigint}`));
            if (!user) return message.channel.send("You didn't say who to add to!");

            const userDono = await client.Donations.findByIdOrCreate(user.id, {
                _id: user.id,
                amount: 0
            });

            userDono.amount += parseInt(args[2]);
            await userDono.save();

            message.channel.send(`Added ${parseInt(args[2]).toLocaleString()} to ${user.username}'s total donations!`);
        } else if (/^(remove)|(delete)$/i.test(args[0])) {
            if (!message.member?.roles.cache.has("832632548671881227"))
                return message.channel.send("You can't do this!");

            const user: User = message.mentions.users.first() || (await client.users.fetch(args[1] as `${bigint}`));
            if (!user) return message.channel.send("You didn't say who to remove from!");

            const userDono = await client.Donations.findByIdOrCreate(user.id, {
                _id: user.id,
                amount: 0
            });

            if (userDono.amount - parseInt(args[2]) <= 0) userDono.amount = 0;
            else userDono.amount -= parseInt(args[2]);
            await userDono.save();

            message.channel.send(
                `Success! ${user.username}'s total donation amount is now ${userDono?.amount.toLocaleString()}`
            );
        } else if (/^(view)|(show)$/i.test(args[0])) {
            const user = message.mentions.users.first() || (await client.users.fetch(args[1] as `${bigint}`));
            if (!user)
                return message.channel.send(
                    "You didn't say who to view! use =dono <me or my> if you want to check yourself"
                );

            const userDono = await client.Donations.findById(user.id);

            message.channel.send(`${user.username}'s total donation amount: ${userDono?.amount.toLocaleString() || 0}`);
        } else if (/^(me)|(my)$/i.test(args[0])) {
            const userDono = await client.Donations.findById(message.author.id);
            message.channel.send(
                `${message.author.username}'s total donation amount: ${userDono?.amount.toLocaleString() || 0}`
            );
        }
    }
});
