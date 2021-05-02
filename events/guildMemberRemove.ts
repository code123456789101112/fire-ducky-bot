import Client from "../structs/client.js";
import { GuildMember, TextChannel } from "discord.js";
/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 */
 export default (client: Client, member: GuildMember) => {
    const leavingChannel: any = member.guild.channels.cache.get("801125577644834913");
	(leavingChannel as TextChannel).send(`${member} has just left the server. :(`);
};