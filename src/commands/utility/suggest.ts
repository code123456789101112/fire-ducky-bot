import { Guild, GuildChannel, MessageEmbed, TextChannel } from "discord.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
	name: "suggest",
    description: "Makes a suggestion.",
    usage: "suggestion",
    cooldown: 60,
	execute(client: Client, message: Message): unknown {
        if (message.content.length <= 8) {
            return message.channel.send("You didn't say what to suggest.");
        }

        const suggestion: string = message.content.slice(8);
        const suggestionChannel: GuildChannel = (message.guild as Guild).channels.cache.get(client.config.ids.channels.suggest as `${bigint}`) as GuildChannel;

        const embed = new MessageEmbed()
            .setTitle(`${message.author.username}'s Suggestion:`)
            .setDescription(suggestion)
            .setColor(client.config.themeColor);
        (suggestionChannel as TextChannel).send({ embeds: [embed] }).then(m => {
            m.react("⬆️").then(() => m.react("⬇️"));
        });
	},
});