const fs = require("fs");
const money = require("../money.json");
const { ownerID } = require("../config.json");

module.exports = {
    name: "setbal",
    usage: "user bal",
    description: "sets a user's balance",
    execute(client, message, args) {
        if (message.author.id !== ownerID) return;

        const user = message.mentions.users.first();
        let newBal = args[1];

        if (!money[user.id]) return;

        money[user.id] = parseInt(newBal);
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if (err) console.log(err);
        });
    }
};