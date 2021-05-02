import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
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
    async execute(client: Client, message: Message, args: string[]) {
        const { bal, bank } = client;
        const userBal: number = await bal.get(message.author.id);
        const userBank: number = await bank.get(message.author.id);

        if (userBal === undefined) message.channel.send("You haven't started using currency yet. Use `=start` to get started.");

        if (!args[0] || isNaN(parseInt(args[0]))) return message.channel.send("Either you didn't say how much to withdraw or that is not a valid amount.");

        const amount: number = parseInt(args[0]);
        if (userBank < amount) return message.channel.send("You don't have enough money in your bank for this.");
        
        bal.set(message.author.id, userBal + amount);
        bank.set(message.author.id, userBank - amount);

        message.channel.send(`You successfully withdrew ${amount} coins!`);
    }
};