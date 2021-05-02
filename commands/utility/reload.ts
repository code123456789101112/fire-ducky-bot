import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

export default {
	name: "reload",
	description: "Reloads a command.",
	permissions: ["ADMINISTRATOR"],
	usage: "command",
	/**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
	execute(client: Client, message: Message, args: string[]) {
		const commandName: string = args[0].toLowerCase();
		const command: any = client.commands.get(commandName) || client.commands.find((cmd: any) => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand: any = require(`./${command.name}.js`);
			client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Command \`${command.name}\` was reloaded!`);
		} catch (error) {
			console.error(error);
			message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};