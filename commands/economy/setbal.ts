import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
    name: "setbal",
    usage: "user bal",
    description: "sets a user's balance",
    /**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
    async execute(client: Client, message: Message, args: string[]) {
        if (message.author.id !== client.config.ownerID) return;

        const { bal } = client;

        const user: any = message.mentions.users.first();
        let userBal: number = await bal.get(user.id);

        if (userBal === undefined) {
            bal.set(user.id, 0);
            userBal = await bal.get(user.id);
        }

        bal.set(user.id, parseInt(args[1]));
        message.channel.send("You set the balance.");
    }
};