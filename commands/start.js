const fs = require("fs");
const money = require("../money.json");

module.exports = {
    name: "start",
    description: "Starts currency.",
    async execute(client, message, args) {
        if (money[message.author.id]) return;

        money[message.author.id] = {
            name: message.author.tag,
            money: 0
        };
        
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if (err) console.log(err);
        });

        message.channel.send("You have started!");
    }
};