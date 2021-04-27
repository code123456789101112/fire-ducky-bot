const Client = require("../structs/client.js");
const { GuildMember } = require("discord.js");
/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 */
module.exports = (client, member) => {
    const leavingChannel = member.guild.channels.cache.get("801125577644834913");
	leavingChannel.send(`${member} has just left the server. :(`);
};