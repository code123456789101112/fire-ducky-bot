import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
    name: "kick",
    description: "kicks pinged user",
    usage: "user reason",
    cooldown: 10,
    permissions: ["ADMINISTRATOR"],
    aliases: ["boot"],
    /**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
    execute(client: Client, message: Message, args: string[]) {
        if (!message.mentions.users.size) {
            return message.channel.send("You didn't say who to kick");
        }

        const member: any = message.mentions.members?.first();
        if (args[1]) {
            member.user.send(args.join(" "));
        }

        member.kick().catch((error: any) => {
            console.error(error);
            message.channel.send(`There was an error kicking ${member.user.username}`);
        });
    }
};