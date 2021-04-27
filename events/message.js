const Client = require("../structs/client.js");
const Message = require("../structs/message.js");
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
	const inviteRegex = /discord(?:(?:app)?\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/i;
	if (inviteRegex.test(message.content) && message.channel.id !== "801151006699290635" && !message.member.permissions.has("MANAGE_MESSAGES")) {
		message.delete();
		message.reply("post invite links only in <#801151006699290635>");
	}

	message.command();
};