const { ownerID } = require("../../config.json");

const Client = require("../../client.js");
const Message = require("../../message.js");

module.exports = {
    name: "setbal",
    usage: "user bal",
    description: "sets a user's balance",
    /**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
    async execute(client, message, args) {
        if (message.author.id !== ownerID) return;

        const { bal } = client;

        const user = message.mentions.users.first();
        let userBal = await bal.get(user.id);

        if (userBal === undefined) {
            bal.set(user.id, 0);
            userBal = await bal.get(user.id);
        }

        bal.set(user.id, parseInt(args[1]));
        message.channel.send("You set the balance.");
    }
};