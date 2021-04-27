const Client = require("../client.js");
const { GuildMember } = require("discord.js");
/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 */
module.exports = (client, member) => {
    const welcomeChannel = member.guild.channels.cache.get("801125577644834913");
	welcomeChannel.send(`Please welcome <@${member.id}> to the server!`);

	if (member.user.bot) {
		const role = member.guild.roles.cache.get("801149263907258449");
		member.roles.add(role);
	} else {
		const role = member.guild.roles.cache.get("801146722717139007");
		member.roles.add(role);
	}
};