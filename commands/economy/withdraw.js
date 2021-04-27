const Client = require("../../client.js");
const Message = require("../../message.js");

module.exports = {
    name: "withdraw",
    aliases: ["with"],
    usage: "amount",
    description: "Currency command which withdraws money from your bank.",
    /**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
    async execute(client, message, args) {
        const { bal, bank } = client;
        const userBal = await bal.get(message.author.id);
        const userBank = await bank.get(message.author.id);

        if (userBal === undefined) message.channel.send("You haven't started using currency yet. Use `=start` to get started.");

        if (!args[0] || isNaN(args[0])) return message.channel.send("Either you didn't say how much to withdraw or that is not a valid amount.");

        const amount = parseInt(args[0]);
        if (userBank < amount) return message.channel.send("You don't have enough money in your bank for this.");
        
        bal.set(message.author.id, userBal + amount);
        bank.set(message.author.id, userBank - amount);

        message.channel.send(`You successfully withdrew ${amount} coins!`);
    }
};