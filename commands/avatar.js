const Discord = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Shows the user's pfp.",
    aliases: ["av", "icon", "pfp", "profilepicture", "profilepic"],
    usage: "user",
    execute(client, message, args) {
        if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`;
		});

		message.channel.send(avatarList);
    }
};