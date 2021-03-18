const fs = require("fs");
const money = require("../../jsons/money.json");
const Discord = require("discord.js");

module.exports = {
	name: "balance",
	aliases: ["bal", "money"],
	cooldown: 3,
	description: "Currency command that shows the user's balance.",
	usage: "user",
	execute(client, message, args) {
		const user = message.mentions.users.first() || message.author;

		if (!money[user.id] && user == message.author) {
			return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");
		} else if (!money[user.id] && user != message.author) {
			money[user.id] = {
				name: user.tag,
				money: 0,
				bank: 0,
				bankSpace: 25000
			};
            
			fs.writeFile("./money.json", JSON.stringify(money), (err) => {
				if (err) console.log(err);
			});
		}
		if (!money[user.id].bank) {
			money[user.id].bank = 0;
			money[user.id].bankSpace = 25000;
		}
		fs.writeFile("./money.json", JSON.stringify(money), (err) => {
			if (err) console.log(err);
		});

		const embed = new Discord.MessageEmbed()
			.setTitle(`${user.username}'s balance:`)
			.setColor("#ff0000")
			.setDescription(`Wallet: ${money[user.id].money} coins\nBank: ${money[user.id].bank} coins out of ${money[user.id].bankSpace}`);
		message.channel.send(embed);
	}
};