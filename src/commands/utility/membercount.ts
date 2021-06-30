import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";
import { MessageEmbed } from "discord.js";

export default new Command({
    name: "membercount",
    aliases: ["m", "mc", "members", "memberscount", "countmembers", "countmember"],
    description: "Shows the server's member count",
    execute(client: Client, message: Message) {
        message.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`${client.config.serverName} Member Count`)
                    .setColor(client.config.themeColor)
                    .setThumbnail(message.guild?.iconURL({ dynamic: true }) as string)
                    .addFields(
                        { name: "Total:", value: `${message.guild?.memberCount}` },
                        {
                            name: "Humans:",
                            value: `${(message.guild?.memberCount as number) - client.botCount}`
                        },
                        { name: "Bots:", value: `${client.botCount}` }
                    )
            ]
        });
    }
});
