import { ClientUser } from "discord.js";
import Client from "../structs/client.js";
/**
 * 
 * @param {Client} client 
 */
 export default (client: Client) => {
    console.log(`Logged in as ${(client.user as ClientUser).tag}!`);
    (client.user as ClientUser).setActivity("Nobody", { type: "LISTENING" });
};