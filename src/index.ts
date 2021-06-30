import { Structures } from "discord.js";

import Message from "./structs/message.js";
import Client from "./structs/client.js";

Structures.extend("Message", () => Message);

const client: Client = new Client();
client.loadDirs();

client.login(client.config.token);
