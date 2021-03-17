const fs = require("fs");
const money = require("../../money.json");

module.exports = {
    name: "withdraw",
    aliases: ["with"],
    usage: "amount",
    description: "Currency command which withdraws money from your bank.",
    execute(client, message, args) {
        if (!money[message.author.id]) {
            return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");
        } else if (!money[message.author.id].bank) {
            money[message.author.id].bank = 0;
            money[message.author.id].bankSpace = 25000;
        }

        if (isNaN(args[0])) return message.channel.send("Do it like this: `=with <amount>`");

        if (money[message.author.id].bank < parseInt(args[0])) return message.channel.send("You dont have enough for this.");

        money[message.author.id].money += parseInt(args[0]);
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if (err) console.log(err);
        });
        money[message.author.id].bank -= parseInt(args[0]);
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if (err) console.log(err);
        });

        message.channel.send("You withdrawed coins.");
    }
};