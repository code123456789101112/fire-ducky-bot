const Client = require("../../client.js");
const Message = require("../../message.js");

module.exports = {
	name: "ping",
	description: "Shows the bot's ping.",
	cooldown: 10,
	/** 
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
	execute(client, message, args) {
		message.channel.send("Pinging...").then(m =>{
			const ping = m.createdTimestamp - message.createdTimestamp;
			m.edit(`Pong! \`${ping}ms\``);
		});
	}
};