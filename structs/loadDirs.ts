import fs from "fs";
import Client from "./client.js"

export default {
    async loadEvents(client: Client) {
        const files = fs.readdirSync("./events");
        for (const file of files) {
            const event = (await import(`../events/${file.replace(".ts", ".js")}`)).default;

            const name = file.split(".")[0];
            client.on(name, event.bind(null, client));

            console.log(`Loaded ${name} event.`);
        }
    },

    async loadCommands(client: Client) {
        const folders = fs.readdirSync("./commands/");
        for (const folder of folders) {
            const files = fs.readdirSync(`./commands/${folder}/`);
            for (const file of files) {
                const command = (await import(`../commands/${folder}/${file.replace(".ts", ".js")}`)).default;
                const name = file.split(".")[0];
                client.commands.set(name, command);

                console.log(`Loaded ${name} command.`);
            }
        }
    }
}