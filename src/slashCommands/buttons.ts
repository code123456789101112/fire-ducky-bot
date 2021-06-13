import { CommandInteraction, MessageActionRow, MessageButton } from "discord.js";
import Client from "../structs/client.js";
import { SlashCommand } from "../structs/command.js";

export default new SlashCommand({
    data: {
        name: "buttons",
        description: "Buttons!"
    },
    async execute(_client: Client, interaction: CommandInteraction) {
        const row: MessageActionRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomID("test-1")
                    .setLabel("Primary!")
                    .setStyle("PRIMARY"),
                new MessageButton()
                    .setCustomID("test-2")
                    .setLabel("Secondary!")
                    .setStyle("SECONDARY"),
                new MessageButton()
                    .setCustomID("test-3")
                    .setLabel("Success!")
                    .setStyle("SUCCESS"),
                new MessageButton()
                    .setCustomID("test-4")
                    .setLabel("Danger!")
                    .setStyle("DANGER"),
                new MessageButton()
                    .setLabel("Link!")
                    .setStyle("LINK")
                    .setURL("https://sites.google.com/view/stellar-dankers/home")
            );

        await interaction.reply({ content: "Buttons!", components: [row] });
    }
});