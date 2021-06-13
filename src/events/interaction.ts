import { Collection, Interaction, MessageAttachment, TextChannel } from "discord.js";

import ms from "parse-ms";

import Client from "../structs/client.js";
import { SlashCommand } from "../structs/command.js";

export default async (client: Client, interaction: Interaction): Promise<void> => {
    if (interaction.isCommand()) {
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
          const timeLeft = ms(expirationTime - now);
          return interaction.reply({ content: `Please wait ${timeLeft.minutes}m ${timeLeft.seconds}s before reusing the \`${command.data.name}\` command.`, ephemeral: true });
        }
      }

      timestamps.set(interaction.user.id, now);
      setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);


      command.execute(client, interaction, args);
    } else if (interaction.isMessageComponent() && interaction.componentType === "BUTTON") {
      if (/^test/.test(interaction.customID)) {
        await interaction.reply({ content: `${interaction.user}, you pressed my button!`, ephemeral: true })
          .catch(console.error);
      } else if (/^close-ticket$/.test(interaction.customID)) {
        const ticket = await client.Tickets.findById(interaction.channelID);
        if (!ticket) return;
        
        if (!interaction.channel) await client.channels.fetch(interaction.channelID as `${bigint}`);

        const buffer = Buffer.from(ticket.conversation, "utf-8");
        (client.channels.cache.get("824291113619292231") as TextChannel).send({ content: `Ticket conversation for ${ticket.user}`, files: [new MessageAttachment(buffer, `${ticket.name}.txt`)] });

        interaction.channel?.delete();
      }
    }
};