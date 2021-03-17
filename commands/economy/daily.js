const fs = require("fs");
const money = require("../../money.json");
const cooldowns = require("../../cooldowns.json");
const ms = require("parse-ms");

module.exports = {
    name: "daily",
    description: "Currency command that can be used to get coins once every day.",
    execute(client, message, args) {
        const reward = 10000;
        const timeout = 86400000;
        
        if (!money[message.author.id]) {
            return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");
        }

        if (!cooldowns[message.author.id] || !cooldowns[message.author.id].daily) {
            if (!cooldowns[message.author.id]) {
                cooldowns[message.author.id] = {
                    name: message.author.tag
                };
            }
            if (!cooldowns[message.author.id].daily) {
                cooldowns[message.author.id].daily = Date.now();
            }
            
            fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
                if (err) console.log(err);
            });

            money[message.author.id].money += reward;
            fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                if (err) console.log(err);
            });

            return message.channel.send("You collected your daily reward of 10,000 coins!");
        } else if (timeout - (Date.now() - cooldowns[message.author.id].daily) > 0) {
            const time = ms(timeout - (Date.now() - cooldowns[message.author.id].daily));
            console.log(time);

            return message.channel.send(`You already collected your daily reward! Collect again in ${time.hours}h ${time.minutes}m ${time.seconds}s`);
        } else {
            money[message.author.id].money += reward;
            fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                if (err) console.log(err);
            });

            cooldowns[message.author.id].daily = Date.now();
            fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
                if (err) console.log(err);
            });
            
            return message.channel.send("You collected your daily reward of 10,000 coins!");
        }
    }
};