const fs = require("fs");
const { Client, Collection } = require("discord.js");

const client = new Client();
client.commands = new Collection();
client.cooldowns = new Collection();

const commandFolders = fs.readdirSync("./commands").filter(folder => !folder.includes("economy"));

for (const folder of commandFolders) {
	fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js")).forEach(file => {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	});
}

fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		const eventName = file.split(".")[0];
		client.on(eventName, event.bind(null, client));
	});
});

client.unabbrNum = function(num) {
	if (typeof num !== "string") return;
	
	let n;
	if (num.endsWith("k")) {
		n = 1000;
	} else if (num.endsWith("m")) {
		n = 1000000;
	} else return;

	const newNum = parseInt(num.slice(0, -1)) * n;
	return newNum;
};

client.login("ODAxMTUwODk2NDA2Mzk2OTM2.YAcf6g.exyRXeIqUJ6srm7W8kAsnJXiUYE");