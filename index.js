const fs = require("fs");
const { token } = require("./config.json");

const Client = require("./client.js");
const client = new Client();

const eventFiles = fs.readdirSync("./events/").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./commands/");
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	const eventName = file.split(".")[0];

	client.on(eventName, event.bind(null, client));
}

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));

	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.login(token);