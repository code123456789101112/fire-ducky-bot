const Discord = require("discord.js");
module.exports = {
    name: "bet",
    aliases: ["gamble"],
    uage: "<amount>",
    description: "gamble command",
    cooldown: 6,
    async execute(client, message, args) {
        const { bal } = client;
        const userBal = await bal.get(message.author.id);

        const bet = parseInt(args[0]);

        if (userBal === undefined) return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");
        else if (!args[0] || isNaN(args[0])) return message.channel.send("You didn't say how much to bet!");
        else if (bet < 500) return message.channel.send("You can't bet less than 500.");
        else if (bet > 100000) return message.channel.send("You can't bet more than 100,000.");
        else if (bet > userBal) return message.channel.send("You don't have enough money in your wallet for that!");

        const userRoll = client.randomInt(0, 10);
        const botRoll = client.randomInt(0, 10);

        const embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.username}'s gambling game`)
            .addFields([
                { name: "You Roll", value: userRoll },
                { name: "Bot's Roll", value: botRoll }
            ]);
        if (userRoll > botRoll) {
            embed.setColor("#05ed43");
            embed.setDescription("You Won!!");

            const winAmount = client.randomInt(bet * 0.1, bet * 2);
            bal.set(message.author.id, userBal + winAmount);

            message.channel.send(`You won ${winAmount}!!`, { embed });
        } else if (userRoll === botRoll) {
            embed.setColor("#ebcf00");
            embed.setDescription("It's a tie!");

            message.channel.send("You didn't win or lose anything!", { embed });
        } else {
            embed.setColor("#ff0000");
            embed.setDescription("You lost!!");

            bal.set(message.author.id, userBal - bet);
            message.channel.send("You lost your entire bet!", { embed });
        }
    }
};