import Message from "../../structs/message.js";
import Client from "../../structs/client.js";

import Command from "../../structs/command.js";

export default new Command({
    name: "deploy",
    description: "registers slash commands",
    devOnly: true,
    async execute(client: Client, message: Message) {
        if (!client.application?.owner) await client.application?.fetch();

        const commandInfo = client.slashCommands.map(command => command.data);
        await client.application?.commands.set(commandInfo);

        message.reply("done");
    }
});