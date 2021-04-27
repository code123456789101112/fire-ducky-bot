const locations = ["39.291348, -71.410505", "38.565648, -66.241900", "32.107739, -49.607154"];

const Client = require("../../structs/client.js");
const Message = require("../../structs/message.js");

module.exports = {
    name: "hack",
    description: "Hacks the pinged user. (not real)",
    guildOnly: true,
    usage: "user",
    /**
	 * 
	 * @param {Client} client 
	 * @param {Message} message 
	 * @param {String[]} args 
	 */
    async execute(client, message, args) {
        const hackedUser = message.mentions.members.first();
        const hackedUsername = message.mentions.users.first().username;

        if (message.mentions.users.first().id === client.user.id) return message.channel.send("Why would I hack myself?");
        if (message.mentions.users.first().bot) return message.channel.send("I can't hack my own kind.");

        await message.channel.send(`Commencing totally real hacking operation on ${hackedUser}`).then(async m => {
            await m.edit(`Commencing totally real hacking operation on ${hackedUser} .`);
            await m.edit(`Commencing totally real hacking operation on ${hackedUser} . .`);
            await m.edit(`Commencing totally real hacking operation on ${hackedUser} . . .`);
            await m.delete();
        });
        await message.channel.send("Finding login info").then(async m => {
            await m.edit("Finding login info .");
            await m.edit("Finding login info . .");
            await m.edit("Finding login info . . .");
            await m.delete();
        });
        await message.channel.send(`Email: ${hackedUsername}IsAwesome@gmail.com, Password: ${hackedUsername}1234`);
        await message.channel.send("Finding login info").then(async m => {
            await m.edit("Finding location .");
            await m.edit("Finding location . .");
            await m.edit("Finding location . . .");
            await m.delete();
        });
        await message.channel.send(`Location found: ${locations[client.randomInt(0, 2)]}`);
        await message.channel.send("Totally real and not fake at all hack complete.");
    }
};