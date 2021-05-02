import { GuildMember } from "discord.js";
import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
    name: "afk",
    description: "afk command",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute(client: Client, message: Message, args: string[]) {
        const { afk } = client;
        const reason: string = args.join(" ");

        afk.set(message.author.id, reason);
        (message.member as GuildMember).setNickname(`[AFK] ${(message.member as GuildMember).displayName}`).catch(() => message.channel.send("I couldn't change your nickname because of permissions."));

        message.reply(`I set your AFK: ${reason}`);
    }
};