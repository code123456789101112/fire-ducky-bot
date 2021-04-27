const Client = require("../../structs/client.js");
const Message = require("../../structs/message.js");

module.exports = {
    name: "deposit",
    aliases: ["dep"],
    usage: "amount",
    description: "Currency command which deposits money into your bank.",
    /**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
    async execute(client, message, args) {
        const { bal, bank, bankSpace } = client;
        const userBal = await bal.get(message.author.id);
        const userBank = await bank.get(message.author.id);
        const userBankSpace = await bankSpace.get(message.author.id);

        if (userBal === undefined) message.channel.send("You haven't started using currency yet. Use `=start` to get started.");

        if (!args[0] || isNaN(args[0])) return message.channel.send("Either you didn't say how much to deposit or that is not a valid amount.");

        const amount = parseInt(args[0]);
        if (userBal < amount) return message.channel.send("You don't have enough money for this.");
        else if (amount + userBank > userBankSpace) return message.channel.send("Your bank isn't big enough for this");
        
        bal.set(message.author.id, userBal - amount);
        bank.set(message.author.id, userBank + amount);

        message.channel.send(`You successfully deposited ${amount} coins!`);
    }
};