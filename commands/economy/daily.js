const ms = require("parse-ms");

module.exports = {
    name: "daily",
    description: "Currency command that can be used to get coins once every day.",
    async execute(client, message, args) {
        const reward = 10000;
        const timeout = 86400000;

        const { bal, cd } = client;
        const userBal = await bal.get(message.author.id);
        let userCD = await cd.get(`${message.author.id}-${this.name}`);

        if (userBal === undefined) return message.channel.send("You haven't started using currency yet. Use `=start` to get started.");

        if (!userCD) {
            cd.set(`${message.author.id}-${this.name}`, Date.now());
            userCD = await cd.get(`${message.author.id}-${this.name}`);

            bal.set(message.author.id, userBal + reward);
            return message.channel.send("You collected your daily reward of 10,000 coins!");
        } else if (timeout - (Date.now() - userCD) > 0) {
            const time = ms(timeout - (Date.now() - userCD));
            return message.channel.send(`You already collected your daily reward! Collect again in ${time.hours}h ${time.minutes}m ${time.seconds}s`);
        } else {
            bal.set(message.author.id, userBal + reward);
            cd.set(`${message.author.id}-${this.name}`, Date.now());

            return message.channel.send("You collected your daily reward of 10,000 coins!");
        }
    }
};