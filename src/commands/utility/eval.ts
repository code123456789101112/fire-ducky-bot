import { inspect } from "util";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
    name: "eval",
    description: "Runs bot code through Discord.",
    usage: "code",
    devOnly: true,
    execute(client: Client, message: Message): void {
        function clean(text: unknown) {
            if (typeof text === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;
        }
        
        try {
            const code: string = message.content.slice(5);
            let evaled: unknown = eval(code);
        
            if (typeof evaled !== "string")
                evaled = inspect(evaled);
        
            message.channel.send(clean(evaled), { code:"xl" });
        } catch (err) {
            message.author.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
});