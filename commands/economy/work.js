const fs = require("fs");
const money = require("../../money.json");
const cooldowns = require("../../cooldowns.json");
const ms = require("parse-ms");
const job = require("../../job.json");
const Discord = require("discord.js");

module.exports = {
    name: "work",
    description: "Currency command that can be used every hour.",
    execute(client, message, args) {
        const timeout = 3600000;
        
        if (!money[message.author.id]) {
            return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");
        }
        
        if (!args[0]) {
            if (!job[message.author.id]) {
                return message.channel.send("You don't have a job yet, use =work list to find one");
            } else if (!cooldowns[message.author.id] || !cooldowns[message.author.id].work) {
                    if (!cooldowns[message.author.id]) {
                        cooldowns[message.author.id] = {
                            name: message.author.tag
                        };
                    }
                    if (!cooldowns[message.author.id].work) {
                        cooldowns[message.author.id].work = Date.now();
                    }
                    
                    fs.writeFile("./cooldowns.json", JSON.stringify(cooldowns), (err) => {
                        if (err) console.log(err);
                    });

                    money[message.author.id].money += job[message.author.id].salary;
                    fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                        if (err) console.log(err);
                    });
                    money[message.author.id].bankSpace += 500;
                    fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                        if (err) console.log(err);
                    });
                    message.channel.send(`You worked as a ${job[message.author.id].job} and earned ${job[message.author.id].salary} coins.`);
                } else if (timeout - (Date.now() - cooldowns[message.author.id].work) > 0) {
                        const time = ms(timeout - (Date.now() - cooldowns[message.author.id].work));
                        console.log(time);
            
                        return message.channel.send(`You already collected your work reward! Collect again in ${time.hours}h ${time.minutes}m ${time.seconds}s`);
                    } else {
                        money[message.author.id].money += job[message.author.id].salary;
                        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                            if (err) console.log(err);
                        });
                        money[message.author.id].bankSpace += 500;
                        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                            if (err) console.log(err);
                        });
                        message.channel.send(`You worked as a ${job[message.author.id].job} and earned ${job[message.author.id].salary} coins.`);
            
                        cooldowns[message.author.id].work = Date.now();
                        fs.writeFile("./cooldowns.json", JSON.stringify(money), (err) => {
                            if (err) console.log(err);
                        });
                    }
        } else if (args[0] === "list") {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Jobs Available")
                    .setDescription("1. Teacher\nThis job has a low salary and isn't that good.\n\n2. Police\nThis job has okay salary but still isn't that good.\n\n3. Lawyer\nThis job has a pretty good salary.\n\n4. President\nThis is the best job with the best salary!.")
                    .setFooter("Use =work <job name> to start working!")
                    .setColor("#ff0000");
                return message.channel.send(embed);
            } else if (args[0] === "teacher") {
                job[message.author.id] = {
                    name: message.author.tag,
                    job: "teacher",
                    salary: 650
                };
                fs.writeFile("./job.json", JSON.stringify(job), (err) => {
                    if (err) console.log(err);
                });

                return message.channel.send("You now work as a teacher and earn 650 coins an hour! You can start working by using =work.");
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
                    if (err) console.log(err);
                });

                return message.channel.send("You now work as a police officer and earn 1,000 coins an hour! You can start working by using =work.");
            } else if (args[0] === "lawyer") {
                if (money[message.author.id].money < 25000) {
                    return message.channel.send("You need 25,000 coins to be able to sign up for this job");
                }
                
                job[message.author.id] = {
                    name: message.author.tag,
                    job: "lawyer",
                    salary: 5000
                };
                fs.writeFile("./job.json", JSON.stringify(job), (err) => {
                    if (err) console.log(err);
                });

                return message.channel.send("You now work as a lawyer and earn 5,000 coins an hour! You can start working by using =work.");
            } else if (args[0] === "president") {
                if (money[message.author.id].money < 50000) {
                    return message.channel.send("You need 50,000 coins to be able to sign up for this job");
                }
                
                job[message.author.id] = {
                    name: message.author.tag,
                    job: "president",
                    salary: 10000
                };
                fs.writeFile("./job.json", JSON.stringify(job), (err) => {
                    if (err) console.log(err);
                });

                return message.channel.send("You now work as the president and earn 10,000 coins an hour! You can start working by using =work.");
            }
    }
};