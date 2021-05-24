import { GuildMember } from "discord.js";

import Client from "../structs/client.js";
import Message from "../structs/message.js";

export default async (client: Client, message: Message): Promise<void> => {

	const inviteRegex = /discord(?:(?:app)?\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/i;
	if (inviteRegex.test(message.content) && !(message.member as GuildMember).permissions.has("ADMINISTRATOR")) {
		message.delete();
		message.reply("no invite links please");
	}

	message.command(client);
};