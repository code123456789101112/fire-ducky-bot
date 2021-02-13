const fs = require("fs");
const money = require("../money.json");
const cooldowns = require("../cooldowns.json");
const ms = require("parse-ms");
const job = require("../job.json");
const Discord = require("discord.js");

module.exports = {
    name: "work",
    description: "Currency command that can be used every hour.",
    cooldown: 3600,
    execute(client, message, args) {
        if (!money[message.author.id]) {
            return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");
        }
        
        if (!args[0]) {
            if (!job[message.author.id]) {
                return message.channel.send("You don't have a job yet, use =work list to find one");
            } else {
                money[message.author.id].money += job[message.author.id].salary;
                fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                    if (err) console.log(err)
                });

                return message.channel.send(`You worked as a ${job[message.author.id].job} and earned ${job[message.author.id].salary} coins.`);
            }
        } else {
            if (args[0] === "list") {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Jobs Available")
                    .setDescription("1. Teacher\nThis job has a low salary and isn't that good.\n\n2. Police\nThis job has okay salary but still isn't that good.")
                    .setFooter("Use =work <job name> to start working!")
                    .setColor("#ff0000")
                return message.channel.send(embed);
            } else if (args[0] === "teacher") {
                job[message.author.id] = {
                    name: message.author.tag,
                    job: "teacher",
                    salary: 650
                };
                fs.writeFile("./job.json", JSON.stringify(job), (err) => {
                    if (err) console.log(err)
                });

                return message.channel.send("You now work as a teacher and earn 650 coins an hour! You can start working by using =work.")
            } else if (args[0] === "police") {
                if (money[message.author.id].money < 10000) {
                    return message.channel.send("You need 10,000 coins to be able to sign up for this job");
                }
                
                job[message.author.id] = {
                    name: message.author.tag,
                    job: "police",
                    salary: 1000
                };
                fs.writeFile("./job.json", JSON.stringify(job), (err) => {
                    if (err) console.log(err)
                });

                return message.channel.send("You now work as a police officer and earn 1,000 coins an hour! You can start working by using =work.")
            }
        }
    }
};