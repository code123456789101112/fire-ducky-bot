import Client from "../structs/client.js";
import { GuildMember, TextChannel } from "discord.js";
/**
 * 
 * @param {Client} client 
 * @param {GuildMember} member 
 */
export default (client: Client, member: GuildMember) => {
    const welcomeChannel: any = member.guild.channels.cache.get("801125577644834913");
	(welcomeChannel as TextChannel).send(`Please welcome <@${member.id}> to the server!`);
};