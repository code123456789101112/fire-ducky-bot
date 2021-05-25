import { CommandInteraction, CommandInteractionOption, MessageEmbed } from "discord.js";
import { SlashCommand } from "../structs/command.js";

import Client from "../structs/client.js";

export default new SlashCommand({
    data: {
        name: "donate",
        description: "Donation command.",
        options: [{
            name: "giveaway",
            description: "Donate to a giveaway.",
            type: "SUB_COMMAND",
            options: [{
                name: "time",
                description: "The duration of the giveaway.",
                type: "STRING",
                required: true
            }, {
                name: "amount-of-winners",
                description: "The amount of people that will win.",
                type: "INTEGER",
                required: true
            }, {
                name: "req",
                description: "The requirement(s)/request(s) for the giveaway.",
                type: "STRING",
                required: true
            }, {
                name: "prize",
                description: "The prize of course.",
                type: "STRING",
                required: true
            }, {
                name: "message",
                description: "Your message for the giveaway.",
                type: "STRING",
                required: false
            }]
        }, {
            name: "heist",
            description: "Donate to a heist.",
            type: "SUB_COMMAND",
            options: [{
                name: "amount",
                description: "The amount the heist should be.",
                type: "INTEGER",
                required: true
            }, {
                name: "message",
                description: "Your message for the heist.",
                type: "STRING",
                required: false
            }]
        }, {
            name: "event",
            description: "Donate to an event.",
            type: "SUB_COMMAND",
            options: [{
                name: "type",
                description: "The type of event to donate to.",
                type: "STRING",
                required: true
            }, {
                name: "message",
                description: "Your message for the event.",
                type: "STRING",
                required: false
            }]
        }]
    },
    cooldown: 600,
    async execute(client: Client, interaction: CommandInteraction, args: CommandInteractionOption[]) {
        if (args[0].name === "giveaway") {
            const options = args[0].options as CommandInteractionOption[];

            const embed: MessageEmbed = new MessageEmbed()
                .setTitle(`${interaction.user.tag} wants to donate to a giveaway!!`)
                .addFields({
                    name: "Time",
                    value: options[0].value as string
                }, {
                    name: "Amount Of Winners:",
                    value: options[1].value as string
                }, {
                    name: "Requirement(s):",
                    value: options[2].value as string
                }, {
                    name: "Prize:",
                    value: options[3].value as string
                })
                .setColor("#00ff00")
                .setFooter("Thank you for your kind donation!!");
            if (options[4]?.value) embed.addField("Message:", options[4].value as string);
                
            await interaction.reply(`<@&${client.config.ids.roles.giveaway}>`, {
                embeds: [embed],
                allowedMentions: { parse: ["roles", "users", "everyone"] }
            });
        } else if (args[0].name === "heist") {
            const options = args[0].options as CommandInteractionOption[];

            const embed: MessageEmbed = new MessageEmbed()
                .setTitle(`${interaction.user.tag} wants to donate to a heist!!`)
                .addField("Amount", options[0].value as string)
                .setColor("#00ff00")
                .setFooter("Thank you for your kind donation!!");
            if (options[1]?.value) embed.addField("Message:", options[1].value as string);

            await interaction.reply("<@&824272561009328140>", {
                embeds: [embed],
                allowedMentions: { parse: ["roles", "users", "everyone"] }
            });
        } else {
            const options = args[0].options as CommandInteractionOption[];

            const embed: MessageEmbed = new MessageEmbed()
                .setTitle(`${interaction.user.tag} wants to donate to an event!!`)
                .addField("Type", options[0].value as string)
                .setColor("#00ff00")
                .setFooter("Thank you for your kind donation!!");
            if (options[1]?.value) embed.addField("Message:", options[1].value as string);

            await interaction.reply("<@&824272561009328147>", {
                embeds: [embed],
                allowedMentions: { parse: ["roles", "users", "everyone"] }
            });
        }
    }   
});