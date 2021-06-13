import { MessageEmbed } from "discord.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

const rule: string[] = ["placeholder"];

export default new Command({
	name: "rules",
	description: "Shows server rules.",
    usage: "rule",
    aliases: ["r"],
	execute(_client: Client, message: Message, args: string[]): void {
        if (!args[0]) {
            const embed: MessageEmbed = new MessageEmbed()
                .setTitle("Server Rules")
                .setColor("#00ffdb")
                .setDescription(rule.join("\n"));
            message.channel.send({ embeds: [embed] });
        } else {
            const num: number = parseInt(args[0]) - 1;
            message.channel.send(rule[num]);
        }
	}
});