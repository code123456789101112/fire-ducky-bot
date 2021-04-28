const Client = require("../../structs/client.js");
const Message = require("../../structs/message.js");

module.exports = {
    name: "afk",
    description: "afk command",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute(client, message, args) {
        const { afk } = client;
        const reason = args.join(" ");

        afk.set(message.author.id, reason);
        message.member.setNickname(`[AFK] ${message.member.displayName}`).catch(() => message.channel.send("I couldn't change your nickname because of permissions."));

        message.reply(`I set your AFK: ${reason}`);
    }
};