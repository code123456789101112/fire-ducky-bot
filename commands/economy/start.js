const Client = require("../../structs/client.js");
const Message = require("../../structs/message.js");

module.exports = {
    name: "start",
    description: "Starts currency.",
    /**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
    async execute(client, message, args) {
        const { bal, bank, bankSpace } = client;
        const userBal = await bal.get(message.author.id);

        if (!isNaN(userBal)) return;

        bal.set(message.author.id, 0);
        bank.set(message.author.id, 0);
        bankSpace.set(message.author.id, 0);

        message.author.send("Welcome to the currency system! There are many commands, so use `=help` to see them all!");
    }
};