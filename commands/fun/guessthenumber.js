const Client = require("../../client.js");
const Message = require("../../message.js");

module.exports = {
    name: "guessthenumber",
    description: "Starts a guess the number game.",
    aliases: ["gtn", "guess", "number", "guessnumber", "numberguess"],
    guildOnly: true,
    /**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
    async execute(client, message, args) {
        const first = await message.channel.send("I'm thinking of a number between 1 and 500, guess it in the chat below.");
        
        const num = Math.round(Math.random() * 500);
        let guessedNum;

        function guessTheNumber() {
            message.channel.awaitMessages(m => m.author.id == message.author.id,
                { max: 1, time: 60000 }).then(collected => {
                    if (isNaN(collected.first().content)) {
                        return message.channel.send("Bro that's not even a number, ending the game.");
                    }
                    
                    guessedNum = parseInt(collected.first().content);

                    if (guessedNum == num) {
                        message.channel.send(`The number was ${num}!! <@${message.author.id}>, you took ${(collected.first().createdTimestamp - first.createdTimestamp) / 1000} seconds!`);
                        return;
                    } else
                        if (guessedNum < num) {
                            message.channel.send(`${message.author.username} too low, guess another number.`);
                            guessTheNumber();
                        } else {
                            message.channel.send(`${message.author.username} too high, guess another number.`);
                            guessTheNumber();
                        }   
                    }).catch(() => {
                        message.reply("You have not guessed a number in the last 30 seconds, ending the game.");
                    }   
                );     
        }
        
        guessTheNumber();
    }
};