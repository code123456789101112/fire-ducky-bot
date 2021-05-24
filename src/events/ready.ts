import { ClientUser } from "discord.js";
import Client from "../structs/client.js";

export default (client: Client): void => {
    (client.user as ClientUser).setActivity(`${client.config.serverName} | =help`, { type: "WATCHING" });

    console.log(`Logged in as ${(client.user as ClientUser).tag}!`);
};