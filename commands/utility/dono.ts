import { User } from "discord.js";
import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
    name: "dono",
    description: "tracks donations (dank memer)",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message
     * @param {String[]} args
     */
    async execute(client: Client, message: Message, args: string[]) {
        const { dono } = client;

        if (/^add$/i.test(args[0])) {
            if (!message.member?.roles.cache.has("832632548671881227")) return message.channel.send("You can't do this!");
            const user: User = message.mentions.users.first() || await client.users.fetch(args[1]);
            if (!user) return message.channel.send("You didn't say who to add to!");

            let userDono: number | undefined = await dono.get(user.id);

            if (!userDono) {
                await dono.set(user.id, 0);
                userDono = await dono.get(user.id);
            }


            dono.set(user.id, (userDono as number) + parseInt(args[2]));
            message.channel.send(`Added ${args[2]} to ${user.username}'s total donations!`);
        } else if (/^(remove)|(delete)$/i.test(args[0])) {
            if (!message.member?.roles.cache.has("832632548671881227")) return message.channel.send("You can't do this!");
            const user: User = message.mentions.users.first() || await client.users.fetch(args[1]);
            if (!user) return message.channel.send("You didn't say who to remove from!");

            let userDono: number | undefined = await dono.get(user.id);

            if (!userDono) return message.channel.send("This person doesn't have any donations!");

            if (userDono - parseInt(args[2]) <= 0) {
                await dono.set(user.id, 0)
                userDono = await dono.get(user.id);
            } else {
                await dono.set(user.id, userDono - parseInt(args[2]));
                userDono = await dono.get(user.id);
            }

            message.channel.send(`Success! ${user.username}'s total donation amount is now ${userDono}`);
        } else if (/^(view)|(show)$/i.test(args[0])) {
            const user = message.mentions.users.first() || await client.users.fetch(args[1]);
            if (!user) return message.channel.send("You didn't say who to remove from! use =dono <me or my> if you want to check yourself");

            const userDono = await dono.get(user.id) || 0;

            message.channel.send(`${user.username}'s total donation amount: ${userDono}`);
        } else if (/^(me)|(my)$/i.test(args[0])) {
            const userDono = await dono.get(message.author.id) || 0;
            message.channel.send(`${message.author.username}'s total donation amount: ${userDono}`);
        }
    }
}