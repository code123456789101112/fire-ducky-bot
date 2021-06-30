import { MessageActionRow, MessageButton, MessageComponentInteraction, TextChannel } from "discord.js";
import MessageEmbed from "../structs/embed.js";

import Client from "../structs/client.js";
import Message from "../structs/message.js";

export default async (client: Client, message: Message): Promise<void> => {
    if (message.channel.type === "dm" && !message.author.bot) {
        const row = new MessageActionRow().addComponents(
            new MessageButton().setCustomID("ticket-yes").setStyle("SUCCESS").setLabel("Yes!"),
            new MessageButton().setCustomID("ticket-no").setStyle("DANGER").setLabel("No!")
        );

        const msg = await message.channel.send({
            content: `Would you like to open a ticket with topic: \`${message.content}\`?`,
            components: [row]
        });

        const filter = (interaction: MessageComponentInteraction) => interaction.user.id === message.author.id;
        const collector = msg.createMessageComponentInteractionCollector(filter, {
            max: 1,
            time: 30000
        });

        collector.on("collect", async (interaction: MessageComponentInteraction) => {
            if (interaction.customID === "ticket-no") return interaction.reply("Ok, no ticket today then.");

            await interaction.reply("Opening ticket...");
            const openingMsg = await interaction.fetchReply();

            const channel = await client.guilds.cache
                .get("824272560761733121")
                ?.channels.create(`ticket-${interaction.user.username}`, {
                    type: "text",
                    permissionOverwrites: [
                        {
                            id: "824272560761733121",
                            deny: "VIEW_CHANNEL"
                        },
                        {
                            id: interaction.user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS", "EMBED_LINKS", "ATTACH_FILES"]
                        }
                    ]
                });

            const closeRow = new MessageActionRow().addComponents(
                new MessageButton().setCustomID("close-ticket").setStyle("DANGER").setEmoji("🔒")
            );

            const embeds = [
                new MessageEmbed(interaction.user)
                    .setTitle(`${interaction.user.username}'s ticket`)
                    .addField("Ticket Topic:", message.content)
                    .setFooter("An admin will be with you soon!")
                    .setColor(client.config.themeColor)
            ];
            channel?.send({
                content: "<@&824272561009328147>",
                embeds,
                components: [closeRow]
            });
            (openingMsg as Message).edit(`Ticket open at <#${channel?.id}>!`);

            await client.Tickets.create({
                _id: channel?.id,
                name: `ticket-${message.author.tag}-${message.createdTimestamp}`,
                conversation: "\n",
                user: message.author.username
            });
        });
    } else if ((message.channel as TextChannel).name?.startsWith("ticket") && message.author.id !== client.user?.id) {
        const ticket = await client.Tickets.findById(message.channel.id);
        if (!ticket) return;

        ticket.conversation = `${ticket.conversation.length ? `${ticket.conversation}\n` : ""}${
            message.author.username
        }: ${message.content}`;
        await ticket.save();
    }

    message.command(client);
};
