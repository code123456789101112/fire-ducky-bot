const { Collection } = require("discord.js");
const { prefix, ownerID } = require("../config.json");

const Client = require("../structs/client.js");
const Message = require("../structs/message.js");
/**
 * 
 * @param {Client} client 
 * @param {Message} message 
 */
module.exports = (client, message) => {
    const { cooldowns } = client;

    if (!message.content.startsWith(prefix) || message.author.bot) return;
	else if (message.channel.id === "801150859873746984" && message.author.id !== ownerID) return;

	const args = message.content.slice(prefix.length).trim().split(/\s+/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === "dm") return message.reply("I can't execute that command inside DMs!");

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) return message.reply("You can not do this!");
	}

	if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(client, message, args);
	} catch (error) {
		console.error(error);
		message.reply("There was an error trying to execute that command!");
	}
};