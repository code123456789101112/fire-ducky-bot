import { Guild, Role, TextChannel } from "discord.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
    name: "heist",
    description: "does heist thing",
    permissions: ["ADMINISTRATOR"],
    execute(_client: Client, message: Message): void {
        message.channel.send("Okay, watching for a heist in this channel. If you're joining the heist: remember to disable passive and withdraw 2,000 coins.");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filter: any = (m: Message) => m.author.id === "270904126974590976" && m.content.includes("is starting a bank robbery. They're trying to break into") && m.content.includes("Join them by typing `JOIN HEIST`");
        const messageCollector = message.channel.createMessageCollector(filter, { max: 1, time: 60000 });
        messageCollector.on("collect", () => {
            message.channel.send("Success, unlocking channel");
            (message.channel as TextChannel).updateOverwrite((message.guild as Guild).roles.everyone, { SEND_MESSAGES: true });
            message.channel.send("Channel unlocked, go go go! Locking again when time is up.");

            const collector = message.channel.createMessageCollector(m => m.author.id === "270904126974590976" && m.content.includes("Time is up to join") && m.content.includes("heist"), { max: 1, time: 240000 });
            collector.on("collect", () => {
                (message.channel as TextChannel).updateOverwrite(message.guild?.roles.everyone as Role, { SEND_MESSAGES: false });
                message.channel.send("Success! channel locked.");
                collector.stop();
            });
            messageCollector.stop();
        });
    }
});