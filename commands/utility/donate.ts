import { MessageEmbed } from "discord.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
    name: "donate",
    description: "Donate to giveaway or heist!",
    cooldown: 10,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute(client: Client, message: Message, args: string[]) {
        let gawtype: string;
        let amount: string;
       
        message.channel.send("Do you want to donate to a giveaway or a heist?");
        message.channel.awaitMessages((m: Message) => m.author.id === message.author.id,
            { max: 1, time: 30000 }).then((collected: any) => {
                if (collected.first().content.toLowerCase() === "giveaway") {
                    gawtype = "giveaway";
                    message.channel.send("What is your giveaway for? Explain everything including amount, time, amount of winners, etc.");
                    message.channel.awaitMessages((m: Message) => m.author.id == message.author.id,
                        { max: 1, time: 60000 }).then((messages: any) => {
                            amount = messages.first().content;
                            const embed: MessageEmbed = new MessageEmbed()
                                .setTitle(`${message.author.username}'s donation`)
                                .setDescription(`${message.author} wants to donate to a ${gawtype}: ${amount}!`)
                                .setColor("#00ffdb");
                            message.channel.send(`<@&801147084732497971> - <@${message.author.id}>`);
                            return message.channel.send(embed);
                        }).catch(() => {
                            return message.channel.send("You have not responded, cancelling donation.");
                        });
                } else if (collected.first().content.toLowerCase() === "heist") {
                    gawtype = "heist";
                    message.channel.send("How much should the heist be? It can't be too much because of limited bank space and can't be too little because then it's not fun.");
                    message.channel.awaitMessages((m: Message) => m.author.id == message.author.id,
                        { max: 1, time: 60000 }).then((messages: any) => {
                            amount = messages.first().content;
                            const embed: MessageEmbed = new MessageEmbed()
                                .setTitle(`${message.author.username}'s donation`)
                                .setDescription(`${message.author} wants to donate to a ${gawtype}: ${amount}!`)
                                .setColor("#00ffdb")
                            message.channel.send(`<@&801147084732497971> - <@${message.author.id}>`);
                            return message.channel.send(embed);
                        }).catch(() => {
                            return message.channel.send("You have not responded, cancelling donation.");
                        });
                } else {
                    return message.channel.send("That's not a valid donation type, cancelling donation.");
                }
            
            }).catch(() => {
                return message.channel.send("You have not responded, cancelling donation.");
            });
    }
};