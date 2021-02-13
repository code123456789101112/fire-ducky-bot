const fs = require("fs");
const money = require("../money.json");

module.exports = {
    name: "balance",
    aliases: ["bal", "money"],
    cooldown: 3,
    description: "Currency command that shows the user's balance.",
    usage: "user",
    execute(client, message, args) {
        const user = message.mentions.users.first() || message.author;

        if (!money[user.id]) {
            return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");
        }

        message.channel.send(`${user.username} has ${money[user.id].money} coins.`);
    }
};