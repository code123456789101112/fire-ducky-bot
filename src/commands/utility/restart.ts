import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
    name: "restart",
    description: "Restarts the bot.",
    devOnly: true,
    execute(_client: Client, message: Message) {
        message.channel.send("Restarting...").then(() => process.exit(0));
    }
});