module.exports = {
    name: "kick",
    description: "kicks pinged user",
    usage: "user reason",
    cooldown: 10,
    permissions: ["ADMINISTRATOR"],
    aliases: ["boot"],
    execute(client, message, args) {
        if (!message.mentions.users.size) {
            return message.channel.send("You didn't say who to kick");
        }

        const user = message.mentions.users.first();
        if (args[1]) {
            user.send(args[1]);
        }

        user.kick().catch(error => {
            console.error(error);
            message.channel.send(`There was an error kicking ${user.username}`);
        });
    }
};