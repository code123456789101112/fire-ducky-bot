import { CommandInteraction, CommandInteractionOption } from "discord.js";
import Client from "../structs/client.js";
import { SlashCommand } from "../structs/command.js";

export default new SlashCommand({
    data: {
        name: "editdono",
        description: "Edits donation amounts",
        options: [{
            name: "increase",
            description: "Increase someone's donation amount.",
            type: "SUB_COMMAND",
            options: [{
                name: "user",
                description: "The user to increase.",
                type: "USER"
            }, {
                name: "amount",
                description: "The amount to increase by.",
                type: "INTEGER"
            }]
        }, {
            name: "decrease",
            description: "Decrease someone's donation amount.",
            type: "SUB_COMMAND",
            options: [{
                name: "user",
                description: "The user to decrease.",
                type: "USER"
            }, {
                name: "amount",
                description: "The amount to decrease by.",
                type: "INTEGER"
            }]
        }]
    },
    permissions: [{
        id: "824272561009328141",
        type: "ROLE",
        permission: true
    }],
    async execute(client: Client, interaction: CommandInteraction, args: CommandInteractionOption[]) {
        await interaction.reply("ok");
        return { client, args };
    }
});