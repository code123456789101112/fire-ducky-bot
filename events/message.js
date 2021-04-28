const Client = require("../structs/client.js");
const Message = require("../structs/message.js");
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = async (client, message) => {
	const { afk } = client;
	const userAFK = await afk.get(message.author.id);
	if (userAFK) {
		afk.delete(message.author.id);
		if (message.member.nickname) {
			message.member.setNickname(message.member.nickname.split("AFK] ")[1]).catch(() => message.channel.send("I can't change your nickname because of permissions."));
		} else {
			message.channel.send("You don't have a nickname so I can't reset it");
		}

		message.reply("Welcome back! I removed your AFK");
	}

	if (message.mentions.users.size > 0) {
		message.mentions.users.each(async user => {
			const mentionAFK = await afk.get(user.id);
			if (mentionAFK) message.reply(`${user.username} is AFK: ${mentionAFK}`);
		});
	}

	const inviteRegex = /discord(?:(?:app)?\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/i;
	if (inviteRegex.test(message.content) && message.channel.id !== "801151006699290635" && !message.member.permissions.has("MANAGE_MESSAGES")) {
		message.delete();
		message.reply("post invite links only in <#801151006699290635>");
	}

	message.command();
};