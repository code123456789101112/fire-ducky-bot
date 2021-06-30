import { Collection, CommandInteraction, CommandInteractionOption } from "discord.js";
import MessageEmbed from "../structs/embed.js";

import { SlashCommand } from "../structs/command.js";
import Client from "../structs/client.js";

export default new SlashCommand({
    data: {
        name: "donate",
        description: "Donation command.",
        options: [
            {
                name: "giveaway",
                description: "Donate to a giveaway.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "time",
                        description: "The duration of the giveaway.",
                        type: "STRING",
                        required: true
                    },
                    {
                        name: "amount-of-winners",
                        description: "The amount of people that will win.",
                        type: "INTEGER",
                        required: true
                    },
                    {
                        name: "req",
                        description: "The requirement(s)/request(s) for the giveaway.",
                        type: "STRING",
                        required: true
                    },
                    {
                        name: "prize",
                        description: "The prize of course.",
                        type: "STRING",
                        required: true
                    },
                    {
                        name: "message",
                        description: "Your message for the giveaway.",
                        type: "STRING",
                        required: false
                    }
                ]
            },
            {
                name: "heist",
                description: "Donate to a heist.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "amount",
                        description: "The amount the heist should be.",
                        type: "INTEGER",
                        required: true
                    },
                    {
                        name: "message",
                        description: "Your message for the heist.",
                        type: "STRING",
                        required: false
                    }
                ]
            },
            {
                name: "event",
                description: "Donate to an event.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "type",
                        description: "The type of event to donate to.",
                        type: "STRING",
                        required: true
                    },
                    {
                        name: "prize",
                        description: "The prize for the event.",
                        type: "STRING",
                        required: true
                    },
                    {
                        name: "message",
                        description: "Your message for the event.",
                        type: "STRING",
                        required: false
                    }
                ]
            }
        ]
    },
    cooldown: 600,
    async execute(client: Client, interaction: CommandInteraction, args: Collection<string, CommandInteractionOption>) {
        if (args.get("giveaway")) {
            const options = args.get("giveaway")?.options as Collection<string, CommandInteractionOption>;
            const embed: MessageEmbed = new MessageEmbed(interaction.user)
                .setTitle(`${interaction.user.tag} wants to donate to a giveaway!!`)
                .addFields(
                    {
                        name: "Time",
                        value: options.get("time")?.value as string
                    },
                    {
                        name: "Amount Of Winners:",
                        value: `${options.get("amount-of-winners")?.value}`
                    },
                    {
                        name: "Requirement(s):",
                        value: options.get("req")?.value as string
                    },
                    {
                        name: "Prize:",
                        value: options.get("prize")?.value as string
                    }
                )
                .setColor("#00ff00")
                .setFooter("Thank you for your kind donation!!");
            if (options.get("message"))
                embed.addField("Message:", (options.get("message")?.value as string) ?? "no message");

            await interaction.reply({
                content: `<@&${client.config.ids.roles.giveaway}>`,
                embeds: [embed],
                allowedMentions: { parse: ["roles", "users", "everyone"] }
            });
        } else if (args.get("heist")) {
            const options = args.get("heist")?.options as Collection<string, CommandInteractionOption>;

            const embed: MessageEmbed = new MessageEmbed(interaction.user)
                .setTitle(`${interaction.user.tag} wants to donate to a heist!!`)
                .addField("Amount", `${options.get("amount")?.value}`)
                .setColor("#00ff00")
                .setFooter("Thank you for your kind donation!!");
            if (options.get("message")) embed.addField("Message:", options.get("message")?.value as string);

            await interaction.reply({
                content: "<@&824272561009328140>",
                embeds: [embed],
                allowedMentions: { parse: ["roles", "users", "everyone"] }
            });
        } else {
            const options = args.get("event")?.options as Collection<string, CommandInteractionOption>;

            const embed: MessageEmbed = new MessageEmbed(interaction.user)
                .setTitle(`${interaction.user.tag} wants to donate to an event!!`)
                .addFields(
                    { name: "Type", value: options.get("type")?.value as string },
                    { name: "Prize", value: options.get("prize")?.value as string }
                )
                .setColor("#00ff00")
                .setFooter("Thank you for your kind donation!!");
            if (options.get("message")) embed.addField("Message:", options.get("message")?.value as string);

            await interaction.reply({
                content: "<@&824272561009328147>",
                embeds: [embed],
                allowedMentions: { parse: ["roles", "users", "everyone"] }
            });
        }
    }
});
