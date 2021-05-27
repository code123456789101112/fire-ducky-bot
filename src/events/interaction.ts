import { Collection, Interaction } from "discord.js";

import ms, { Parsed } from "parse-ms";

import Client from "../structs/client.js";
import { SlashCommand } from "../structs/command.js";

export default async (client: Client, interaction: Interaction): Promise<void> => {
    if (!interaction.isCommand()) return;

    const { options: args, commandName } = interaction;

    const command: SlashCommand = client.slashCommands.get(commandName) as SlashCommand;

    if (!command) return;

    const { cooldowns } = client;

    if (!cooldowns.has((command.data.name as string) + "/")) cooldowns.set((command.data.name as string) + "/", new Collection());

    const now: number = Date.now();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const timestamps: any = cooldowns.get((command.data.name as string) + "/");
    const cooldownAmount: number = (command.cooldown as number) * 1000;

    if (timestamps?.has(interaction.user.id)) {
      const expirationTime: number = timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft: Parsed = ms(expirationTime - now);
        return interaction.reply(`Please wait ${timeLeft.minutes}m ${timeLeft.seconds}s before reusing the \`${command.data.name}\` command.`, { ephemeral: true });
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);


    command.execute(client, interaction, args || []);
};