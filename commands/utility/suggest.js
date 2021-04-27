const Discord = require("discord.js");

const Client = require("../../client.js");
const Message = require("../../message.js");

module.exports = {
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
	execute(client, message, args) {
        if (message.content.length <= 8) {
            return message.channel.send("You didn't say what to suggest.");
        }

        const suggestion = message.content.slice(8);
        const suggestionChannel = message.guild.channels.cache.get("801818388565196850");

        const embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.username}'s Suggestion:`)
            .setDescription(suggestion)
            .setColor("#ff0000")
            .setThumbnail("https://media.discordapp.net/attachments/781155105063043082/801151243987714058/fire_breathing_rubber_duckies.jpg?width=412&height=412");
        suggestionChannel.send(embed).then(m => {
            m.react("⬆️")
            .then(() => m.react("⬇️"));
        });
	},
};