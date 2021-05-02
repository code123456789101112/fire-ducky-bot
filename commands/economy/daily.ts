import ms from "parse-ms";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
    name: "daily",
    description: "Currency command that can be used to get coins once every day.",
    /**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
    async execute(client: Client, message: Message, args: string[]) {
        const reward: number = 10000;
        const timeout: number = 86400000;

        const { bal, cd } = client;
        const userBal: number = await bal.get(message.author.id);
        let userCD: number = await cd.get(`${message.author.id}-${this.name}`);

        if (userBal === undefined) return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");

        if (!userCD) {
            cd.set(`${message.author.id}-${this.name}`, Date.now());
            userCD = await cd.get(`${message.author.id}-${this.name}`);

            bal.set(message.author.id, userBal + reward);
            return message.channel.send("You collected your daily reward of 10,000 coins!");
        } else if (timeout - (Date.now() - userCD) > 0) {
            interface msObj {
                days: number,
                hours: number,
                minutes: number,
                seconds: number,
                milliseconds: number,
                nanoseconds: number
            }

            const time: msObj = ms(timeout - (Date.now() - userCD));
            return message.channel.send(`You already collected your daily reward! Collect again in ${time.hours}h ${time.minutes}m ${time.seconds}s`);
        } else {
            bal.set(message.author.id, userBal + reward);
            cd.set(`${message.author.id}-${this.name}`, Date.now());

            return message.channel.send("You collected your daily reward of 10,000 coins!");
        }
    }
};