const fs = require("fs");
const money = require("../../jsons/money.json");

module.exports = {
    name: "give",
    usage: "user money",
    description: "Gives money to someone else.",
    execute(client, message, args) {
        const user = message.mentions.users.first();
        if (!user || isNaN(args[1])) return message.channel.send("You have to do the command like this: `=give <@user> <amount>` You must ping the user for it to work.");

        if (!money[message.author.id]) return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");

        if (!money[user.id]) {
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

        if (parseInt(args[1]) > money[message.author.id].money) {
            return message.channel.send("You don't have enough for this.");
        }

        money[message.author.id].money -= parseInt(args[1]);
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if (err) console.log(err);
        });
        money[user.id].money += parseInt(args[1]);
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if (err) console.log(err);
        });

        message.channel.send(`You gave ${user.username} ${args[1]} coins!`);
    }
};