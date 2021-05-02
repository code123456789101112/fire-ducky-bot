import { Guild, TextChannel, VoiceChannel } from "discord.js";
import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
    name: "l2l",
    description: "Starts last to leave VC event.",
    permissions: ["ADMINISTRATOR"],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute(client: Client, message: Message, args: string[]) {
        message.delete();
        client.l2l = true;

        (message.guild as Guild).channels.create("last 2 leave VC WAITING ROOM", { type: "voice" }).then((ch: VoiceChannel)  => {
            ch.setParent("838124927470796850");
            setTimeout(() => {
                ch.delete(); 
                delete client.wr; 
            }, 900000);
            client.wr = ch;
        });

        (message.guild as Guild).channels.create("last 2 leave VC", { type: "voice" }).then(async (ch: VoiceChannel) => {
            await ch.setParent("838124927470796850");
            client.ch = ch;
            await ch.updateOverwrite((message.guild as Guild).roles.everyone, { CONNECT: false, SPEAK: false });
        });

        (message.guild as Guild).channels.create("last 2 leave VC LOGS", { type: "text" }).then(async (ch: TextChannel) => {
            await ch.setParent("838124927470796850");
            client.chlogs = ch;
            await ch.updateOverwrite((message.guild as Guild).roles.everyone, { VIEW_CHANNEL: false });
        });
        
        message.channel.send("Successfully created Last To Leave VC Channels");
    }
};