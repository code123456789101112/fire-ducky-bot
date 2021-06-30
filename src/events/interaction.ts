import { Collection, Interaction, MessageAttachment, TextChannel } from "discord.js";
import MessageEmbed from "../structs/embed.js";

import ms from "parse-ms";
import fs from "fs";

import Client from "../structs/client.js";
import { SlashCommand } from "../structs/command.js";

const toProperCase = (string: string) => {
    return string.toLowerCase().replace(/(\b\w)/gi, match => match.toUpperCase());
};

export default async (client: Client, interaction: Interaction): Promise<void> => {
    if (interaction.isCommand()) {
        const { options: args, commandName } = interaction;

        const command: SlashCommand = client.slashCommands.get(commandName) as SlashCommand;

        if (!command) return;

        const { cooldowns } = client;

        if (!cooldowns.has((command.data.name as string) + "/"))
            cooldowns.set((command.data.name as string) + "/", new Collection());

        const now: number = Date.now();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const timestamps: any = cooldowns.get((command.data.name as string) + "/");
        const cooldownAmount: number = (command.cooldown as number) * 1000;

        if (timestamps?.has(interaction.user.id)) {
            const expirationTime: number = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = ms(expirationTime - now);
                return interaction.reply({
                    content: `Please wait ${timeLeft.minutes}m ${timeLeft.seconds}s before reusing the \`${command.data.name}\` command.`,
                    ephemeral: true
                });
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

        command.execute(client, interaction, args);
    } else if (interaction.isMessageComponent() && interaction.componentType === "BUTTON") {
        if (/^test/.test(interaction.customID)) {
            await interaction
                .reply({
                    content: `${interaction.user}, you pressed my button!`,
                    ephemeral: true
                })
                .catch(console.error);
        } else if (/^close-ticket$/.test(interaction.customID)) {
            const ticket = await client.Tickets.findById(interaction.channelID);
            if (!ticket) return;

            if (!interaction.channel) await client.channels.fetch(interaction.channelID as `${bigint}`);

            const buffer = Buffer.from(ticket.conversation, "utf-8");
            (client.channels.cache.get("824291113619292231") as TextChannel).send({
                content: `Ticket conversation for ${ticket.user}`,
                files: [new MessageAttachment(buffer, `${ticket.name}.txt`)]
            });

            interaction.channel?.delete();
        } else if (/^help/.test(interaction.customID)) {
            const {
                config: { prefix }
            } = client;

            const category = interaction.customID.split("-")[1];
            const categoryCommands = fs
                .readdirSync(`./dist/src/commands/${category}`)
                .map(command => command.split(".")[0]);

            const cmdList = categoryCommands.join("`, `");

            const categoryEmbed = new MessageEmbed(interaction.user)
                .setTitle(`${toProperCase(category)} Commands:`)
                .setDescription(`\`${cmdList}\``)
                .setColor(client.config.themeColor)
                .setThumbnail(interaction.guild?.iconURL({ dynamic: true }) as string)
                .setFooter(`You can do ${prefix}help <command> to get info on a specific command!`);
            interaction.update({ embeds: [categoryEmbed] });
        }
    }
};
