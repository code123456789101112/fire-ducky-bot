const Client = require("../../client.js");
const Message = require("../../message.js");

module.exports = {
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
    execute(client, message, args) {
        if (!message.mentions.users.size) {
            return message.channel.send("You didn't say who to kick");
        }

        const member = message.mentions.members.first();
        if (args[1]) {
            member.user.send(args[1]);
        }

        member.kick().catch(error => {
            console.error(error);
            message.channel.send(`There was an error kicking ${member.user.username}`);
        });
    }
};