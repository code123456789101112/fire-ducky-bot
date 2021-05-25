import ms from "parse-ms";

import { MessageEmbed } from "discord.js";
import { CurrencyInstance, JobInstance, CooldownInstance } from "../../interfaces/dbInterfaces.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

export default new Command({
    name: "work",
    description: "Currency command that can be used every hour.",
    async execute(client: Client, message: Message, args: string[]): Promise<unknown> {
        const timeout = 3600000;
        
        const userMoney: CurrencyInstance | null = await client.Currency.findOne({ where: { id: message.author.id } });
        const userJobs: JobInstance | null = await client.Jobs.findOne({ where: { id: message.author.id } });
        let userCD: CooldownInstance | null = await client.Cooldowns.findOne({ where: { id: message.author.id + this.name } });

        if (!userMoney) return message.channel.send("You haven't started using currency yet. Use `=start` to get started."); 
        
        if (!args[0]) {
            if (!userJobs) {
                return message.channel.send("You don't have a job yet, use `=work list` to find one.");
            } else if (!userCD) {
                userCD = await client.Cooldowns.create({
                    id: message.author.id + this.name,
                    cooldown: Date.now()
                });
                
                await userMoney.increment("bal", { by: userJobs.salary });
                await userMoney.increment("bankSpace", { by: 500 });

                message.channel.send(`You worked as a ${userJobs.job} and earned ${userJobs.salary}!`);
            } else if (timeout - (Date.now() - userCD.cooldown) > 0) {
                const time = ms(timeout - (Date.now() - userCD.cooldown));
    
                return message.channel.send(`You already collected your work reward! Collect again in ${time.hours}h ${time.minutes}m ${time.seconds}s`);
            } else {
                await client.Cooldowns.update({ cooldown: Date.now() }, { where: { id: message.author.id + this.name } });
                
                await userMoney.increment("bal", { by: userJobs.salary });
                await userMoney.increment("bankSpace", { by: 500 });

                message.channel.send(`You worked as a ${userJobs} and earned ${userJobs.salary}!`);
            }
        } else if (args[0] === "list") {
            const embed: MessageEmbed = new MessageEmbed()
                .setTitle("Jobs Available")
                .addFields({
                    name: "Teacher",
                    value: "This job has a low salary and isn't that good."
                }, {
                    name: "Police",
                    value: "This job has an okay salary but still isn't that good."
                }, {
                    name: "Lawyer",
                    value: "This job is respectable and has a pretty good salary."
                }, {
                    name: "President",
                    value: "This is the best job with the best salary!"
                })
                .setDescription("Use `=work <job name>` to start working!")
                .setColor("#ff0000");
            return message.channel.send(embed);
        } else if (args[0].toLowerCase() === "teacher") {
            if (!userJobs) {
                await client.Jobs.create({
                    id: message.author.id,
                    job: "teacher",
                    salary: 650
                });
            } else await client.Jobs.update({ job: "teacher", salary: 650 }, { where: { id: message.author.id } });

            return message.channel.send("You now work as a teacher and earn 650 coins an hour! You can start working by using `=work`.");
        } else if (args[0].toLowerCase() === "police") {
            if (userMoney.bal < 10000) return message.channel.send("You need 10,000 coins to be able to sign up for this job");
            
            if (!userJobs) {
                await client.Jobs.create({
                    id: message.author.id,
                    job: "police",
                    salary: 1000
                });
            } else await client.Jobs.update({ job: "police", salary: 1000 }, { where: { id: message.author.id } });
            
            return message.channel.send("You now work as a police officer and earn 1,000 coins an hour! You can start working by using `=work`.");
        } else if (args[0].toLowerCase() === "lawyer") {
            if (userMoney.bal < 25000) return message.channel.send("You need 25,000 coins to be able to sign up for this job");
            
            if (!userJobs) {
                await client.Jobs.create({
                    id: message.author.id,
                    job: "lawyer",
                    salary: 5000
                });
            } else await client.Jobs.update({ job: "lawyer", salary: 5000 }, { where: { id: message.author.id } });
            
            return message.channel.send("You now work as a lawyer and earn 5,000 coins an hour! You can start working by using `=work`.");
        } else if (args[0].toLowerCase() === "president") {
            if (userMoney.bal < 50000) return message.channel.send("You need 50,000 coins to be able to sign up for this job");
            
            if (!userJobs) {
                await client.Jobs.create({
                    id: message.author.id,
                    job: "president",
                    salary: 10000
                });
            } else await client.Jobs.update({ job: "president", salary: 10000 }, { where: { id: message.author.id } });
            
            return message.channel.send("You now work as the president and earn 10,000 coins an hour! You can start working by using `=work`.");
        }
    }
});