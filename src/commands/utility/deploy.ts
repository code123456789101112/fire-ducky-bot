import Message from "../../structs/message.js";
import Client from "../../structs/client.js";

import Command from "../../structs/command.js";
import { ApplicationCommand, ApplicationCommandData, ApplicationCommandPermissionData } from "discord.js";

export default new Command({
    name: "deploy",
    description: "Registers slash commands.",
    devOnly: true,
    guildOnly: true,
    async execute(client: Client, message: Message) {
        if (!client.application?.owner) await client.application?.fetch();

        const commandData: ApplicationCommandData[] = client.slashCommands.map(command => command.data);
        await message.guild?.commands.set(commandData);

        const permissionCommands = client.slashCommands.filter(command => !!command.permissions);
        if (permissionCommands.size) {
            const permissionData = permissionCommands.map(command => {
                const { id } = message.guild?.commands.cache.find(c => c.name === command.data.name) as ApplicationCommand;
                const permissions = command.permissions as ApplicationCommandPermissionData[];

                return { id, permissions };
            });

            message.guild?.commands.setPermissions(permissionData);
        }

        message.reply("done");
    }
});