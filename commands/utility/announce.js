const Discord = require("discord.js");

module.exports = {
	name: "announce",
	description: "Announces with embed.",
	permissions: ["ADMINISTRATOR"],
	guildOnly: true,
	usage: "/ title here / description here / ping here (optional)",
	execute(_client, message, args) {
		const announceArgs = message.content.split(" / ");
		let ping;
		
		if (!announceArgs[3]) {
			message.delete();
			const embed = new Discord.MessageEmbed()
				.setTitle(announceArgs[1])
				.setThumbnail("https://media.discordapp.net/attachments/781155105063043082/801151243987714058/fire_breathing_rubber_duckies.jpg?width=412&height=412")
				.setColor("#ff0000")
				.setDescription(announceArgs[2]);
			message.channel.send(embed);
		} else {
			if (announceArgs[3] === "announce") {
				ping = "<@&801459490804727839>";
			} else if (announceArgs[3] === "everyone") {
				ping = "@everyone";
			} else if (announceArgs[3] === "here") {
				ping = "@here";
			} else if (announceArgs[3] === "misc") {
				ping = "<@&801459718965952624>";
			} else if (announceArgs[3] === "event") {
				ping = "<@&801459617196408863>";
			} else return message.channel.send("That's not a valid ping.");

			message.delete();
			message.channel.send(ping);
			
			const embed = new Discord.MessageEmbed()
				.setTitle(announceArgs[1])
				.setThumbnail("https://media.discordapp.net/attachments/781155105063043082/801151243987714058/fire_breathing_rubber_duckies.jpg?width=412&height=412")
				.setColor("#ff0000")
				.setDescription(announceArgs[2]);
			message.channel.send(embed);
		}
	}
};