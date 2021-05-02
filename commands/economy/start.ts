import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
    name: "start",
    description: "Starts currency.",
    /**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
    async execute(client: Client, message: Message, args: string[]) {
        const { bal, bank, bankSpace } = client;
        const userBal: number = await bal.get(message.author.id);

        if (!isNaN(userBal)) return;

        bal.set(message.author.id, 0);
        bank.set(message.author.id, 0);
        bankSpace.set(message.author.id, 0);

        message.author.send("Welcome to the currency system! There are many commands, so use `=help` to see them all!");
    }
};