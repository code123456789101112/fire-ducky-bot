import { GuildMember } from "discord.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
    name: "ban",
    description: "Bans a pinged user",
    usage: "@user reason",
    cooldown: 10,
    permissions: ["ADMINISTRATOR"],
    aliases: ["bannish", "banish"],
    execute(_client: Client, message: Message, args: string[]): unknown {
        if (!message.mentions.users.size) {
            return message.channel.send("You didn't say who to ban");
        }

        const member: GuildMember = message.mentions.members?.first() as GuildMember;
        if (args[1]) {
            member.user.send(args.join(" "));
        }

        member.ban().catch((error: Error) => {
            console.error(error);
            message.channel.send(`There was an error bannning ${member.user.username}`);
        });
    }
});
