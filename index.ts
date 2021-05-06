import { Structures } from "discord.js";

import Message from "./structs/message.js";
Structures.extend("Message", () => Message);

import Client from "./structs/client.js";
const client: Client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

client.loadEvents(client);
client.loadCommands(client);

process.on("unhandledRejection", (err: Error) => client.unhandledRejection(err));

client.login(client.config.token);