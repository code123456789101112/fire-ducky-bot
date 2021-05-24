import { Guild, TextChannel } from "discord.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
    name: "heist",
    description: "does heist thing",
    permissions: ["ADMINISTRATOR"],
    execute(_client: Client, message: Message): void {
        message.channel.send("Okay, watching for a heist in this channel.");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        message.channel.awaitMessages(((m: Message) => m.author.id === "270904126974590976" && m.content.includes("is starting a bank robbery. They're trying to break into") && m.content.includes("Join them by typing `JOIN HEIST` soon!")) as any,
            { max: 1, time: 60000 }).then(() => {
                message.channel.send("Success, unlocking channel");
                (message.channel as TextChannel).updateOverwrite((message.guild as Guild).roles.everyone, { SEND_MESSAGES: true });
                message.channel.send("Channel unlocked, go go go! Locking again in 1 minute and 30 seconds.");

                setTimeout(() => {
                    (message.channel as TextChannel).updateOverwrite((message.guild as Guild).roles.everyone, { SEND_MESSAGES: false });
                    message.channel.send("Success. Channel locked!");
                }, 90000);
            });
    }
});