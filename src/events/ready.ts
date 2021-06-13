import { ClientUser } from "discord.js";
import Client from "../structs/client.js";

import mongo from "../db/mongo.js";

export default async (client: Client): Promise<void> => {
    (client.user as ClientUser).setActivity(`${client.config.serverName} | =help`, { type: "WATCHING" });

    console.log(`Logged in as ${(client.user as ClientUser).tag}!`);

    await mongo().then(() => {
        console.log("Connected to mongoose!");
    });
};