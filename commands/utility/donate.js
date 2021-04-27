const Discord = require("discord.js");

const Client = require("../../client.js");
const Message = require("../../message.js");

module.exports = {
    name: "donate",
    description: "Donate to giveaway or heist!",
    cooldown: 10,
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute(client, message, args) {
        let gawtype;
        let amount;
       
        message.channel.send("Do you want to donate to a giveaway or a heist?");
        message.channel.awaitMessages(m => m.author.id == message.author.id,
            { max: 1, time: 30000 }).then(collected => {
                if (collected.first().content.toLowerCase() === "giveaway") {
                    gawtype = "giveaway";
                    message.channel.send("What is your giveaway for? Explain everything including amount, time, amount of winners, etc.");
                    message.channel.awaitMessages(m => m.author.id == message.author.id,
                        { max: 1, time: 60000 }).then(messages => {
                            amount = messages.first().content;
                            const embed = new Discord.MessageEmbed()
                                .setTitle(`${message.author.username}'s donation`)
                                .setDescription(`${message.author} wants to donate to a ${gawtype}: ${amount}!`)
                                .setColor("#ff0000")
                                .setThumbnail("https://media.discordapp.net/attachments/781155105063043082/801151243987714058/fire_breathing_rubber_duckies.jpg?width=412&height=412");
                            message.channel.send(`<@&801147084732497971> - <@${message.author.id}>`);
                            return message.channel.send(embed);
                        }).catch(() => {
                            return message.channel.send("You have not responded, cancelling donation.");
                        });
                } else if (collected.first().content.toLowerCase() === "heist") {
                    gawtype = "heist";
                    message.channel.send("How much should the heist be? It can't be too much because of limited bank space and can't be too little because then it's not fun.");
                    message.channel.awaitMessages(m => m.author.id == message.author.id,
                        { max: 1, time: 60000 }).then(messages => {
                            amount = messages.first().content;
                            const embed = new Discord.MessageEmbed()
                                .setTitle(`${message.author.username}'s donation`)
                                .setDescription(`${message.author} wants to donate to a ${gawtype}: ${amount}!`)
                                .setColor("#ff0000")
                                .setThumbnail("https://media.discordapp.net/attachments/781155105063043082/801151243987714058/fire_breathing_rubber_duckies.jpg?width=412&height=412");
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