import ms from "parse-ms";
import { MessageEmbed } from "discord.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
    name: "work",
    description: "Currency command that can be used every hour.",
    /**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
    async execute(client: Client, message: Message, args: string[]) {
        const timeout = 3600000;
        
        const { bal, bankSpace, cd, jobs, salary } = client;
        const userBal: number = await bal.get(message.author.id);
        const userBankSpace: number = await bankSpace.get(message.author.id);

        const userJobs: string = await jobs.get(message.author.id);
        const userSalary: number = await salary.get(message.author.id);

        let userCD: number = await cd.get(`${message.author.id}-${this.name}`);

        if (userBal === undefined) return message.channel.send("You haven't started using currency yet. Use `=start` to get started."); 
        
        if (!args[0]) {
            if (!userJobs) {
                return message.channel.send("You don't have a job yet, use `=work list` to find one.");
            } else if (!userCD) {
                cd.set(`${message.author.id}-${this.name}`, Date.now());
                userCD = await cd.get(`${message.author.id}-${this.name}`);
                
                bal.set(message.author.id, userBal + userSalary);
                bankSpace.set(message.author.id, userBankSpace + 500);

                message.channel.send(`You worked as a ${userJobs} and earned ${userSalary}!`);
            } else if (timeout - (Date.now() - userCD) > 0) {
                const time = ms(timeout - (Date.now() - userCD));
    
                return message.channel.send(`You already collected your work reward! Collect again in ${time.hours}h ${time.minutes}m ${time.seconds}s`);
            } else {
                cd.set(`${message.author.id}-${this.name}`, Date.now());
                userCD = await cd.get(`${message.author.id}-${this.name}`);
                
                bal.set(message.author.id, userBal + userSalary);
                bankSpace.set(message.author.id, userBankSpace + 500);

                message.channel.send(`You worked as a ${userJobs} and earned ${salary}!`);
            }
        } else if (args[0] === "list") {
            const embed: MessageEmbed = new MessageEmbed()
                .setTitle("Jobs Available")
                .setDescription("1. Teacher\nThis job has a low salary and isn't that good.\n\n2. Police\nThis job has okay salary but still isn't that good.\n\n3. Lawyer\nThis job has a pretty good salary.\n\n4. President\nThis is the best job with the best salary!.")
                .setFooter("Use =work <job name> to start working!")
                .setColor("#ff0000");
            return message.channel.send(embed);
        } else if (args[0] === "teacher") {
            jobs.set(message.author.id, "teacher");
            salary.set(message.author.id, 650);

            return message.channel.send("You now work as a teacher and earn 650 coins an hour! You can start working by using `=work`.");
        } else if (args[0] === "police") {
            if (userBal < 10000) return message.channel.send("You need 10,000 coins to be able to sign up for this job");
            
            jobs.set(message.author.id, "police");
            salary.set(message.author.id, 1000);

            return message.channel.send("You now work as a police officer and earn 1,000 coins an hour! You can start working by using `=work`.");
        } else if (args[0] === "lawyer") {
            if (userBal < 25000) return message.channel.send("You need 25,000 coins to be able to sign up for this job");
            
            jobs.set(message.author.id, "lawyer");
            salary.set(message.author.id, 5000);

            return message.channel.send("You now work as a lawyer and earn 5,000 coins an hour! You can start working by using `=work`.");
        } else if (args[0] === "president") {
            if (userBal < 50000) return message.channel.send("You need 50,000 coins to be able to sign up for this job");
            
            jobs.set(message.author.id, "president");
            salary.set(message.author.id, 5000);

            return message.channel.send("You now work as the president and earn 10,000 coins an hour! You can start working by using `=work`.");
        }
    }
};