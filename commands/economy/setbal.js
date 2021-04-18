const { ownerID } = require("../../jsons/config.json");

module.exports = {
    name: "setbal",
    usage: "user bal",
    description: "sets a user's balance",
    async execute(client, message, args) {
        if (message.author.id !== ownerID) return;

        const { bal } = client;

        const user = message.mentions.users.first();
        let userBal = await bal.get(user.id);

        if (userBal === undefined) {
            bal.set(user.id, 0);
            userBal = await bal.get(user.id);
        }

        bal.set(user.id, parseInt(args[1]));
        message.channel.send("You set the balance.");
    }
};