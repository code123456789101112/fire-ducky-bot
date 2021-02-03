const { ownerID } = require("../config.json");

module.exports = {
    name: "eval",
    description: "Runs bot code through Discord.",
    execute(client, message, args) {
        function clean(text) {
            if (typeof(text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }
        
        if(message.author.id !== ownerID) return message.channel.send(`Only the owner of the bot (id = ${ownerID}) can use this command.`);
        
        try {
        const code = message.content.slice(5);
        let evaled = eval(code);
    
        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
    
        message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
            message.author.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
}