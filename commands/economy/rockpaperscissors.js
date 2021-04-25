module.exports = {
    name: "rockpaperscissors",
    aliases: ["rps", "rockpaper", "paperscissors", "rockscissors"],
    description: "gamble command",
    usage: "<amount>",
    cooldown: 7,
    async execute(client, message, args) {
        const { bal } = client;
        const userBal = await bal.get(message.author.id);

        const bet = parseInt(args[0]);

        if (userBal === undefined) return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");
        else if (!args[0] || isNaN(args[0])) return message.channel.send("You didn't say how much to bet!");
        else if (bet < 500) return message.channel.send("You can't bet less than 500.");
        else if (bet > 100000) return message.channel.send("You can't bet more than 100,000.");
        else if (bet > userBal) return message.channel.send("You don't have enough money in your wallet for that!");

        const choices = ["rock", "paper", "scissors"];
        const botChoice = choices[client.randomInt(0, 2)];

        const checkWin = (choice) => {
            if (botChoice === choice) return { msg: "It's a tie!", win: null };
            else if (botChoice === "rock") {
                if (choice === "paper") return { msg: "You won!", win: true };
                else return { msg: "You lost!", win: false };
            } else if (botChoice === "paper") {
                if (choice === "rock") return { msg: "You lost!", win: false };
                else return { msg: "You won!", win: true };
            } else if (botChoice === "scissors") {

            }
        };

        const filter = m => m.author.id === message.author.id && m.content.match(/^(r|p|s)/i);
        message.channel.awaitMessages(filter, { max: 1, time: 15000 }).then(collected => {
            const content = collected.first().content.toLowerCase();

            if (content.startsWith("r")) {
                if (botChoice === "rock") {
                    
                } else if (botChoice === "paper") {
                    
                } else {

                }
            } else if (content.startsWith("p")) {
                if (botChoice === "rock") {

                } else if (botChoice === "paper") {
                    
                } else {

                }
            } else if (content.startsWith("s")) {
                if (botChoice === "rock") {

                } else if (botChoice === "paper") {
                    
                } else {

                }
            } else return message.channel.send("You ended the game.");
        }).catch(() => message.channel.send("You didn't answer, ending the game"));
    }
};