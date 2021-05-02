import { MessageEmbed } from "discord.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
    name: "rockpaperscissors",
    aliases: ["rps", "rockpaper", "paperscissors", "rockscissors"],
    description: "gamble command",
    usage: "<amount>",
    cooldown: 7,
    /**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
    async execute(client: Client, message: Message, args: string[]) {
        const { bal } = client;
        const userBal: number = await bal.get(message.author.id);

        const bet: number = parseInt(args[0]);

        if (userBal === undefined) return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");
        else if (!args[0] || isNaN(parseInt(args[0]))) return message.channel.send("You didn't say how much to bet!");
        else if (bet < 500) return message.channel.send("You can't bet less than 500.");
        else if (bet > 100000) return message.channel.send("You can't bet more than 100,000.");
        else if (bet > userBal) return message.channel.send("You don't have enough money in your wallet for that!");

        const choices: string[] = ["rock", "paper", "scissors"];
        const botChoice: string = choices[client.randomInt(0, 2)];

        const checkWin = (choice: "rock" | "paper" | "scissors") => {
            if (botChoice === choice) return { msg: "It's a tie!", win: null };
            else if (botChoice === "rock") {
                if (choice === "paper") return { msg: "You won!", win: true };
                else return { msg: "You lost!", win: false };
            } else if (botChoice === "paper") {
                if (choice === "rock") return { msg: "You lost!", win: false };
                else return { msg: "You won!", win: true };
            } else if (botChoice === "scissors") {
                if (choice === "rock") return { msg: "You won!", win: true };
                else return { msg: "You lost!", win: false };
            }
        };

        message.channel.send("Okay, pick: rock (`r`), paper (`p`), or scissors (`s`)");

        const filter = (m: Message) => m.author.id === message.author.id && /^(r|p|s)/i.test(m.content)
        message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ["time"] }).then((collected: any) => {
            const content = collected.first().content.toLowerCase();

            let result: any;
            let choice: "rock" | "paper" | "scissors";
            if (content.startsWith("r")) {
                result = checkWin("rock");
                choice = "rock";
            } else if (content.startsWith("p")) {
                result = checkWin("paper");
                choice = "paper";
            } else if (content.startsWith("s")) {
                result = checkWin("scissors");
                choice = "scissors";
            } else return message.channel.send("You ended the game.");

            const gameEmbed: MessageEmbed = new MessageEmbed()
                .setTitle(`${message.author.username}, ${result.msg}`)
                .addFields([{ name: "Your choice", value: choice },
                    { name: "Bot's choice:", value: botChoice }]);

            const winAmount: number = client.randomInt(bet * 0.25, bet * 1.5);

            if (result.win) {
                bal.set(message.author.id, userBal + winAmount);

                gameEmbed.setColor("#00ff00");
                message.channel.send(`You won ${winAmount}!!`, { embed: gameEmbed });
            } else if (result.win === null) {
                gameEmbed.setColor("#ffff00");
                message.channel.send("It was a tie. You lost nothing", { embed: gameEmbed });
            } else {
                bal.set(message.author.id, userBal - bet);

                gameEmbed.setColor("#ff0000");
                message.channel.send("You lost your entire bet!", { embed: gameEmbed });
            }
        }).catch(() => message.channel.send("You didn't answer, ending the game"));
    }
};