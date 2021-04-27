const { ownerID } = require("../../config.json");

const Client = require("../../structs/client.js");
const Message = require("../../structs/message.js");

module.exports = {
    name: "stop",
    description: "Stops the bot.",
    /**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
    execute(client, message, args) {
        if (message.author.id !== ownerID) return message.channel.send(`Only the owner of the bot (${client.users.cache.get(ownerID).tag}) can use this command.`);
        client.destroy();
    }
};