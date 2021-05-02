import { Structures } from "discord.js";
import loadDirs from "./structs/loadDirs.js";

import Message from "./structs/message.js";
Structures.extend("Message", () => Message);

import Client from "./structs/client.js";
const client: Client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

(async () => {
    await loadDirs.loadEvents(client);
    await loadDirs.loadCommands(client);
})();

client.login(client.config.token);