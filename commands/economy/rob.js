// const fs = require("fs");
// const money = require("../../jsons/money.json");
// const cooldowns = require("../../jsons/cooldowns.json");
const ms = require("parse-ms");
const { ownerID } = require("../../jsons/config.json");

module.exports = {
    name: "rob",
    aliases: ["steal"],
    usage: "user",
    description: "Currency command which tries to rob a user for their money.",
    execute(client, message, args) {
        return message.channel.send("This command is coming soon.");
        
        const random = Math.round(Math.random() * 10);
        const user = message.mentions.users.first();
        const timeout = 43200000;

        if (!user) return message.channel.send("You didn't mention anyone");
        else if (!money[message.author.id]) {
            return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");
        } else if (!money[user.id]) {
            money[user.id] = {
                name: user.tag,
                money: 0,
                bank: 0,
                bankSpace: 25000
            };
        }

        if (!cooldowns[message.author.id] || !cooldowns[message.author.id].rob) {
            if (!cooldowns[message.author.id]) {
                cooldowns[message.author.id] = {
                    name: message.author.tag
                };
            }
            if (!cooldowns[message.author.id].rob) {
                cooldowns[message.author.id].rob = Date.now();
            }
            
            fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
                if (err) console.log(err);
            });
        } else if (timeout - (Date.now() - cooldowns[message.author.id].rob) > 0) {
                const time = ms(timeout - (Date.now() - cooldowns[message.author.id].rob));
                console.log(time);
 
                return message.channel.send(`You already tried to rob someone! Try again in ${time.hours}h ${time.minutes}m ${time.seconds}s`);
            }

        if (random <= 8) {
            return message.channel.send(`You failed to rob ${user.username}.`);
        } else if (random == 9) {
            const amount = Math.round(money[user.id].money / 2);

            money[user.id].money -= amount;
            fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                if (err) console.log(err);
            });
            money[message.author.id].money += amount;
            fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                if (err) console.log(err);
            });

            message.channel.send(`You robbed ${user.username} of half of their balance!!`);
        } else {
            const amount = money[user.id].money;

            money[user.id].money -= amount;
            fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                if (err) console.log(err);
            });
            money[message.author.id].money += amount;
            fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                if (err) console.log(err);
            });

            message.channel.send(`You robbed ${user.username} of their entire balance!!`);
        }
    }
};