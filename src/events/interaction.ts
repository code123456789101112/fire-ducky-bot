import { Interaction } from "discord.js";

import Client from "../structs/client.js";
import { SlashCommand } from "../structs/command.js";

export default async (client: Client, interaction: Interaction): Promise<void> => {
    if (!interaction.isCommand()) return;

    const args = interaction.options || [];
    const { commandName } = interaction;

    const command: SlashCommand = client.slashCommands.get(commandName) as SlashCommand;

    if (!command) return;

    command.execute(client, interaction, args);
};