import { ClientUser, User } from "discord.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

const locations: string[] = ["39.291348, -71.410505", "38.565648, -66.241900", "32.107739, -49.607154"];

export default new Command({
    name: "hack",
    description: "Hacks the pinged user. (not real)",
    guildOnly: true,
    usage: "user",
    async execute(client: Client, message: Message): Promise<unknown> {
        const hackedUser: User = message.mentions.users.first() as User;
        const hackedUsername: User["username"] = hackedUser.username;

        if (hackedUser.id === (client.user as ClientUser).id) return message.channel.send("Why would I hack myself?");
        if (hackedUser.bot) return message.channel.send("I can't hack my own kind.");

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
        await message.channel.send(`Email: ${hackedUsername.replace(/\s+/, "_")}IsAwesome@gmail.com, Password: ${hackedUsername.replace(/\s+/, "_")}1234`);
        await message.channel.send("Finding login info").then(async m => {
            await m.edit("Finding location .");
            await m.edit("Finding location . .");
            await m.edit("Finding location . . .");
            await m.delete();
        });
        await message.channel.send(`Location found: ${locations[client.randomInt(0, 2)]}`);
        await message.channel.send("Totally real and not fake at all hack complete.");
    }
});