import { CommandInteraction, CommandInteractionOption, Collection } from "discord.js";
import { SlashCommand } from "../structs/command.js";

import Client from "../structs/client.js";

export default new SlashCommand({
    data: {
        name: "ping",
        description: "Shows the bot's ping.",
        options: [
            {
                name: "type",
                type: "STRING",
                description: "The type of ping to show.",
                choices: [
                    {
                        name: "Webscocket Heartbeat",
                        value: "ws"
                    },
                    {
                        name: "Roundtrip Latency",
                        value: "rtp"
                    }
                ],
                required: false
            }
        ]
    },
    async execute(client: Client, interaction: CommandInteraction, args: Collection<string, CommandInteractionOption>) {
        if (args.get("type") && /ws/i.test(args.get("type")?.value as string)) {
            await interaction.reply(`Pong! \`${client.ws.ping}ms\``);
        } else if (args.get("type") && /rtp/i.test(args.get("type")?.value as string)) {
            const ping = Date.now() - interaction.createdTimestamp;
            await interaction.reply("Pong!");

            await interaction.editReply(`Pong! \`${ping}ms\``);
        } else await interaction.reply("Pong!");
    }
});
