import fs from "fs";
import Client from "./client.js"

export default {
    /**
     * 
     * @param {Client} client 
     */
    async loadEvents(client: Client) {
        const files: string[] = fs.readdirSync("./events");
        for (const file of files) {
            const event = (await import(`../events/${file.replace(".ts", ".js")}`)).default;

            const name: string = file.split(".")[0];
            client.on(name, event.bind(null, client));

            console.log(`Loaded ${name} event.`);
        }
        
        console.log();
    },
    /**
     * 
     * @param {Client} client
     */
    async loadCommands(client: Client) {
        const folders: string[] = fs.readdirSync("./commands/");
        for (const folder of folders) {
            const files: string[] = fs.readdirSync(`./commands/${folder}/`);
            for (const file of files) {
                const command = (await import(`../commands/${folder}/${file.replace(".ts", ".js")}`)).default;
                client.commands.set(command.name, command);

                console.log(`Loaded ${command.name} command.`);
            }

            console.log();
        }
    }
}