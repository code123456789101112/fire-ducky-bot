const money = require("../money.json");
const fs = require("fs");

module.exports = {
    name: "beg",
    cooldown: 15,
    description: "Currency command which raises balance by random number.",
    execute(client, message, args) {
        if (!money[message.author.id]) {
            return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");
        }

        const random = Math.round(Math.random() * 400);
        money[message.author.id].money += random;
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if (err) console.log(err);
        });

        message.channel.send(`You begged and received ${random} coins`);
    }
};