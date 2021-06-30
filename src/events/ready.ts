import { ActivityType, ClientUser, TextChannel } from "discord.js";
import Client from "../structs/client.js";

import mongo from "../db/mongo.js";

export default async (client: Client): Promise<void> => {
    const messages: string[] = [`WATCHING ${client.config.serverName} | =help`, "PLAYING DM For Support!! | =help"];
    setInterval(() => {
        client.user?.setActivity(messages[0].split(" ").slice(1).join(), {
            type: messages[0].split(" ")[0] as ActivityType
        });
        messages.unshift(messages.pop() as string);
    }, 120000);

    setInterval(() => {
        client.botCount = parseInt(
            (client.channels.cache.get("824296444155658320") as TextChannel).name.replace(/[^\d]/g, "")
        );
    }, 300000);

    console.log(`Logged in as ${(client.user as ClientUser).tag}!`);

    await mongo().then(() => {
        console.log("Connected to Mongoose!");
    });
};
