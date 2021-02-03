module.exports = {
    name: "guessthenumber",
    description: "Starts a guess the number game.",
    aliases: ["gtn"],
    guildOnly: true,
    execute(client, message, args) {
        let firstTime;
        let firstt;

        message.channel.send("I'm thinking of a number between 1 and 500, guess it in the chat below.").then(first => {
            firstt = first;
        });
        
        const num = Math.round(Math.random() * 500);
        let guessedNum;
        console.log(num);

        function guessTheNumber(client, message, args, num, guessedNum, firstTime) {
            message.channel.awaitMessages(m => m.author.id == message.author.id,
                {max: 1, time: 60000}).then(collected => {
                    guessedNum = parseInt(collected.first().content);

                    if (guessedNum == num) {
                        message.channel.send(`The number was ${num}!! <@${message.author.id}>, you took ${(collected.first().createdTimestamp - firstt.createdTimestamp) / 1000} seconds!`);
                        return;
                    } else
                        if (guessedNum < num) {
                            message.channel.send(`${message.author.username} too low, guess another number.`);
                            guessTheNumber(client, message, args, num, guessedNum, firstTime);
                        } else {
                            message.channel.send(`${message.author.username} too high, guess another number.`);
                            guessTheNumber(client, message, args, num, guessedNum, firstTime);
                        }   
                    }).catch(() => {
                        message.reply("You have not guessed a number in the last 30 seconds, ending the game.");
                    }   
                );     
        }
        guessTheNumber(client, message, args, num, guessedNum, firstTime);
    }
}