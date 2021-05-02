import { ClientUser } from "discord.js";
import Client from "../structs/client.js";
/**
 * 
 * @param {Client} client 
 */
export default (client: Client) => {
    (client.user as ClientUser).setActivity("Online Community | =help", { type: "WATCHING" });

    console.log(`Logged in as ${(client.user as ClientUser).tag}!`);
};