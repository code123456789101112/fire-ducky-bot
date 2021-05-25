import Message from "../../structs/message.js";
import Client from "../../structs/client.js";

import Command from "../../structs/command.js";
import { ApplicationCommandData } from "discord.js";

export default new Command({
    name: "deploy",
    description: "Registers slash commands.",
    devOnly: true,
    async execute(client: Client, message: Message) {
        if (!client.application?.owner) await client.application?.fetch();

        const commandData: ApplicationCommandData[] = client.slashCommands.map(command => command.data);
        await message.guild?.commands.set(commandData);

        message.reply("done");
    }
});