import Message from "../../structs/message.js";
import Client from "../../structs/client.js";

import Command from "../../structs/command.js";
import { ApplicationCommandData } from "discord.js";

export default new Command({
    name: "deploy",
    description: "registers slash commands",
    devOnly: true,
    async execute(client: Client, message: Message) {
        if (!client.application?.owner) await client.application?.fetch();

        const data: ApplicationCommandData = {
            name: (await import("./ping.js")).default.name,
            description: (await import("./ping.js")).default.description,
            options: [{
                name: "type",
                type: "STRING",
                description: "The type of ping to show.",
                choices: [{
                    name: "Webscocket Heartbeat",
                    value: "ws"
                }, {
                    name: "Roundtrip Latency",
                    value: "rtp"
                }],
                required: false
            }]
        };

        const command = await client.application?.commands.create(data);
        console.log(command);

        message.channel.send("done");
    }
});