import { Interaction } from "discord.js";
import Client from "../structs/client.js";

export default async (client: Client, interaction: Interaction): Promise<void> => {
    if (!interaction.isCommand()) return;

    const commandName = client.commands.get(interaction.commandName);
    if (!commandName) return;

    const type = interaction.options[0]?.value as string;

    if (type && /ws/i.test(type)) {
        await interaction.reply(`Pong! \`${client.ws.ping}ms\``);
    } else if (type && /rtp/i.test(type)) {
        const ping = Date.now() - interaction.createdTimestamp;
        await interaction.reply("Pong!");

        await interaction.editReply(`Pong! \`${ping}ms\``);
    } else await interaction.reply("Pong!");
};