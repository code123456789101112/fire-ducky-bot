import { Structures } from "discord.js";
import Message from "./structs/message.js";
import Client from "./structs/client.js";

Structures.extend("Message", () => Message);

const client: Client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
client.loadDirs();

process.on("unhandledRejection", (err: Error) => client.unhandledRejection(err));

client.login();