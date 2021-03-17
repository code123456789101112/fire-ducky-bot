const fs = require("fs");
const money = require("../../jsons/money.json");
const { ownerID } = require("../../jsons/config.json");

module.exports = {
    name: "setbal",
    usage: "user bal",
    description: "sets a user's balance",
    execute(client, message, args) {
        if (message.author.id !== ownerID) return;

        const user = message.mentions.users.first();
        const newBal = args[1];

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

        money[user.id].money = parseInt(newBal);
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if (err) console.log(err);
        });
    }
};