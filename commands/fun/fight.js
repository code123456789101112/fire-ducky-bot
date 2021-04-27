const Client = require("../../structs/client.js");
const Message = require("../../structs/message.js");

module.exports = {
    name: "fight",
    description: "Starts a fight against the pinged user.",
    guildOnly: true,
    usage: "user",
    /**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
    execute(client, message, args) {
        const p1 = message.author;
        const p2 = message.mentions.users.first();
        const p1hp = 15;
        const p2hp = 15;

        if (p2.bot) return message.channel.send("no");
        if (!message.mentions.users) return message.channel.send("You didn't mention anyone.");

        message.channel.send(`Okay, starting a fight between ${p1.username} and ${p2.username}`);

        function p1turn() {
            if (p1hp <= 0) return message.channel.send(`${p2}, you won!!!`);
            
            message.channel.send(`${p1.username}, what do you want to do? \`punch\`, \`defend\`, or \`quit\`?`);
            message.channel.awaitMessages(m => m.author.id == p1.id && m.content == "punch" || m.content == "defend" || m.content == "quit",
                { max: 1, time: 20000 }).then(collected => {
                    if (collected.first().content == "punch") {
                        p2hp -= Math.round(Math.random() * 4);
                        message.channel.send(`You punched and left ${p2.username} with ${p2hp} health!`);
                        p2turn();
                    } else if (collected.first().content == "defend") {
                        p1hp += Math.round(Math.random() * 4);
                        message.channel.send(`${p1.username}, You defended and now you have ${p1hp} health!`);
                        p2turn();
                    } else if (collected.first().content == "quit") {
                        return message.channel.send("You ended the fight.");
                    }
                
                }).catch(() => {
                        message.channel.send("You have not made a valid decision in the last 10 seconds, ending the game.");
                    }   
                );     
        }
        function p2turn() {
            if (p2hp <= 0) return message.channel.send(`${p1}, you won!!!`);
            
            message.channel.send(`${p2.username}, what do you want to do? \`punch\`, \`defend\`, or \`quit\`?`);
            message.channel.awaitMessages(m => m.author.id == p2.id && m.content == "punch" || m.content == "defend" || m.content == "quit",
                { max: 1, time: 20000 }).then(collected => {
                    if (collected.first().content == "punch") {
                        p1hp -= Math.round(Math.random() * 4);
                        message.channel.send(`You punched and left ${p1.username} with ${p1hp} health!`);
                        p1turn();
                    } else if (collected.first().content == "defend") {
                        p2hp += Math.round(Math.random() * 4);
                        message.channel.send(`${p2.username}, You defended and now you have ${p2hp} health!`);
                        p1turn();
                    } else if (collected.first().content == "quit") {
                        return message.channel.send("You ended the fight.");
                    }
                
                }).catch(() => {
                        message.channel.send("You have not made a valid decision in the last 20 seconds, ending the game.");
                    }   
                );     
        }

        p1turn();
    }
};