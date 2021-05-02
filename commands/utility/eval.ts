import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import { inspect } from "util";

export default {
    name: "eval",
    description: "Runs bot code through Discord.",
    usage: "code",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute(client: Client, message: Message, args: string[]) {
        function clean(text: any) {
            if (typeof text === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;
        }
        
        if (message.author.id !== client.config.ownerID) return message.channel.send(`Only the owner of the bot can use this command.`);
        
        try {
            const code: string = message.content.slice(5);
            let evaled: any = eval(code);
        
            if (typeof evaled !== "string")
                evaled = inspect(evaled);
        
            message.channel.send(clean(evaled), { code:"xl" });
        } catch (err) {
            message.author.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
};