const Client = require("../../structs/client.js");
const Message = require("../../structs/message.js");

module.exports = {
    name: "restart",
    description: "Restarts the bot.",
    permissions: ["ADMINISTRATOR"],
    /**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
    async execute(client, message, args) {
        await client.destroy();
        client.login(require("../../config.json").token);
    }
};