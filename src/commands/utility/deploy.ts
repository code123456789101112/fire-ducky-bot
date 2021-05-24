import Message from "../../structs/message.js";
import Client from "../../structs/client.js";

import fs from "fs";

import Command from "../../structs/command.js";

export default new Command({
    name: "deploy",
    description: "registers slash commands",
    devOnly: true,
    async execute(client: Client, message: Message) {
        if (!client.application?.owner) await client.application?.fetch();

        const commandFiles = fs.readdirSync("./dist/src/slashCommands/");
        const commandInfo = await Promise.all(commandFiles.map(async file => (await import(`../../slashCommands/${file}`)).default.info));

        client.application?.commands.set(commandInfo);

        message.reply("done");
    }
});