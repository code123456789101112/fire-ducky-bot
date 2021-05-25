import { CommandInteraction, CommandInteractionOption, MessageEmbed } from "discord.js";
import { SlashCommand } from "../structs/command.js";

import Client from "../structs/client.js";

export default new SlashCommand({
    data: {
        name: "donate",
        description: "Donation command.",
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

    },
    async execute(client: Client, interaction: CommandInteraction, args: CommandInteractionOption[]) {
        const embed: MessageEmbed = new MessageEmbed()
            .setTitle(`${interaction.user.tag} wants to donate to a giveaway!!`)
            .addFields({
                name: "Time",
                value: args[0].value as string
            }, {
                name: "Amount Of Winners:",
                value: args[1].value as string
            }, {
                name: "Requirement(s):",
                value: args[2].value as string
            }, {
                name: "Prize:",
                value: args[3].value as string
            })
            .setColor("#00ff00")
            .setFooter("Thank you for your kind donation!!");
        if (args[4]?.value) embed.addField("Message:", args[4].value as string);
            
        await interaction.reply(`<@&${client.config.ids.roles.giveaway}>`, { embeds: [embed] });
    }   
});