import { Guild, MessageEmbed, TextChannel } from "discord.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
	name: "suggest",
    description: "Makes a suggestion.",
    usage: "suggestion",
    cooldown: 60,
    /**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
	execute(client: Client, message: Message, args: string[]) {
        if (message.content.length <= 8) {
            return message.channel.send("You didn't say what to suggest.");
        }

        const suggestion: string = message.content.slice(8);
        const suggestionChannel: any = (message.guild as Guild).channels.cache.get("801818388565196850");

        const embed = new MessageEmbed()
            .setTitle(`${message.author.username}'s Suggestion:`)
            .setDescription(suggestion)
            .setColor(client.config.themeColor);
        (suggestionChannel as TextChannel).send(embed).then(m => {
            m.react("⬆️").then(() => m.react("⬇️"));
        });
	},
};