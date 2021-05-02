import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
    name: "give",
    usage: "user money",
    description: "Gives money to someone else.",
    /**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
    async execute(client: Client, message: Message, args: string[]) {
        const { bal, bank, bankSpace } = client;
        const authorBal: number = await bal.get(message.author.id);
        if (authorBal === undefined) return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");
        
        const user: any = message.mentions.users.first() || client.users.cache.get(args[0]);
        let userBal: number = await bal.get(user.id);
        if (userBal === undefined) {
            bal.set(user.id, 0);
            bank.set(user.id, 0);
            bankSpace.set(user.id, 0);
            userBal = await bal.get(user.id);
        }

        if (isNaN(parseInt(args[1]))) return message.channel.send("That's not a valid amount");

        const amount: number = parseInt(args[1]);
        if (amount > authorBal) return message.channel.send("You don't have enough for this.");

        bal.set(message.author.id, authorBal - amount);
        bal.set(user.id, userBal + amount);

        message.channel.send(`You successfully gave ${amount} to ${user.username}!`);
    }
};