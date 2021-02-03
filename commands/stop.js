const { ownerID } = require("../config.json");

module.exports = {
    name: "stop",
    description: "Stops the bot.",
    execute(client, message, args) {
        if (message.author.id !== ownerID) return message.channel.send(`Only the owner of the bot (id = ${ownerID}) can use this command.`);
        client.destroy();
    }
};