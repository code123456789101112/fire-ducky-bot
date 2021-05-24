import fs from "fs";
import Client from "./client.js";

export default {
    async loadEvents(client: Client): Promise<void> {
        console.log("\n LOADING EVENTS\n----------------");

        const files: string[] = fs.readdirSync("./dist/src/events/");
        for (const file of files) {
            const event = (await import(`../events/${file.replace(".ts", ".js")}`)).default;

            const name: string = file.split(".")[0];
            client.on(name, event.bind(null, client));

            console.log(`Loaded ${name} event.`);
        }
        
        console.log();
    },

    async loadCommands(client: Client): Promise<void> {
        console.log(" LOADING COMMANDS\n------------------");

        const folders: string[] = fs.readdirSync("./dist/src/commands/");
        for (const folder of folders) {
            const files: string[] = fs.readdirSync(`./dist/src/commands/${folder}/`);
            for (const file of files) {
                const command = (await import(`../commands/${folder}/${file.replace(".ts", ".js")}`)).default;
                client.commands.set(command.name, command);

                console.log(`Loaded ${command.name} command.`);
            }

            console.log();
        }
    }
};