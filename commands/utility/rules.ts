import { MessageEmbed } from "discord.js";
const rule: string[] = ["__1.__ No spam unless it's in <#838127722478960680>\n", "__2.__ No cheating in events\n", "__3.__ If you want roles contact a higherup\n", "__4.__ Report stuff to owners\n", "__5.__ Treat everyone with respect. Absolutely no harassment, sexism, racism, or hate speech will be tolerated.\n", "__6.__ No self-promotion (server invites, advertisements, etc) without having a certain number of invites. This includes DMing fellow members.\n", "__7.__  If you see something that's against the rules or something that makes you feel unsafe, let staff know! We want this server to be a welcoming space!\n", "__8.__  No NSFW or obscene content. This includes text, images, or links featuring nudity, sex, hard violence, or other graphically disturbing content."];

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
	name: "rules",
	description: "Shows server rules.",
    usage: "rule",
    aliases: ["r"],
    /**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
	execute(client: Client, message: Message, args: string[]) {
        if (!args[0]) {
            const embed: MessageEmbed = new MessageEmbed()
                .setTitle("Server Rules")
                .setColor("#00ffdb")
                .setDescription(rule.join("\n"));
            message.channel.send(embed);
        } else {
            const num: number = parseInt(args[0]) - 1;
            message.channel.send(rule[num]);
        }
	}
};