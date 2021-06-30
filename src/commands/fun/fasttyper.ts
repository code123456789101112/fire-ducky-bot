import Discord, { Collection } from "discord.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

const phrase: string[] = [
    "A journey of a thousand miles begins with a single step",
    "A rose by any other name would smell as sweet",
    "Absolute power corrupts absolutely",
    "All things come to those who wait",
    "Ask a silly question and you'll get a silly answer",
    "Attack is the best form of defense",
    "See a pin and pick it up, all the day you'll have good luck; see a pin and let it lie, bad luck you'll have all day",
    "Smallest room in the house",
    "DAKSH IS THE BEST SO GIVE HIM ALL YOUR COOKIES AND DIE IN A HOLE",
    "thecoolguy17 built this bot, so if hes playing, just let him win for petes sake"
];
const photoPhrase: string[] = [
    "https://media.discordapp.net/attachments/799385516512509954/802259317247442974/unknown.png?width=597&height=40",
    "https://media.discordapp.net/attachments/799385516512509954/802259391138758686/unknown.png?width=505&height=37",
    "https://media.discordapp.net/attachments/799385516512509954/802259442376769587/unknown.png?width=375&height=37",
    "https://media.discordapp.net/attachments/799385516512509954/802259495283195954/unknown.png?width=367&height=35",
    "https://media.discordapp.net/attachments/799385516512509954/802259584034930759/unknown.png?width=495&height=35",
    "https://media.discordapp.net/attachments/799385516512509954/802259731074908220/unknown.png?width=362&height=35",
    "https://media.discordapp.net/attachments/799385516512509954/802259773146923058/unknown.png?width=696&height=62",
    "https://media.discordapp.net/attachments/799385516512509954/802259821251264522/unknown.png?width=294&height=33",
    "https://media.discordapp.net/attachments/799385516512509954/802259860942749717/unknown.png?width=668&height=61",
    "https://media.discordapp.net/attachments/799385516512509954/802259952638754856/unknown.png?width=677&height=67"
];

export default new Command({
    name: "fasttyper",
    description: "Makes a fast typer game.",
    aliases: ["ft", "fast", "typer", "type", "fasttype", "typefast"],
    guildOnly: true,
    execute(client: Client, message: Message): void {
        const random = client.randomInt(0, 9);
        let first: Message;

        message.channel.send("Okay, let's start. Below is what you need to retype.").then(m => {
            first = m as Message;
        });

        message.channel.send(photoPhrase[random]).then(() => {
            message.channel
                .awaitMessages(m => m.content == phrase[random], {
                    max: 1,
                    time: 30000
                })
                .then((collected: Collection<string, Discord.Message>) => {
                    if ((collected.first() as Message).content == phrase[random]) {
                        (collected.first() as Message).reply(
                            `You win with a time of ${
                                ((collected.first() as Message).createdTimestamp - first.createdTimestamp) / 1000
                            } seconds!!!!`
                        );
                        return;
                    } else message.reply("Game canceled.");
                })
                .catch(() => {
                    message.reply("No answer after 30 seconds, game canceled.");
                });
        });
    }
});
