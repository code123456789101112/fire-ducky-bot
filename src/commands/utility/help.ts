/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from "fs";
import { MessageActionRow, MessageButton, MessageButtonStyleResolvable, MessageEmbed } from "discord.js";

import Client from "../../structs/client.js";
import Message from "../../structs/message.js";

import Command from "../../structs/command.js";

const toProperCase = (string: string) => {
    return string.toLowerCase().replace(/(\b\w)/gi, match => match.toUpperCase());
};

export default new Command({
    name: "help",
    description: "List all of the commands or info about a specific command.",
    aliases: ["commands"],
    async execute(client: Client, message: Message, args: string[]) {
        const {
            config: { prefix }
        } = client;

        const commands = client.commands.filter(command => !command.devOnly);
        const categories = fs.readdirSync("./dist/src/commands/");

        if (args[0]) {
            if (categories.some(category => category.toLowerCase() === args[0].toLowerCase())) {
                const category = args[0].toLowerCase();
                const categoryCommands = fs
                    .readdirSync(`./dist/src/commands/${category}`)
                    .map(command => command.split(".")[0]);

                const cmdList = categoryCommands.join("`, `");

                const categoryEmbed = new MessageEmbed()
                    .setTitle(`${toProperCase(category)} Commands:`)
                    .setDescription(`\`${cmdList}\``)
                    .setColor(client.config.themeColor)
                    .setThumbnail(message.guild?.iconURL({ dynamic: true }) as string)
                    .setFooter(`You can do ${prefix}help <command> to get info on a specific command!`);
                message.channel.send({ embeds: [categoryEmbed] });
            } else if (
                commands.some(
                    cmd =>
                        !!(
                            cmd.name.toLowerCase() === args[0].toLowerCase() ||
                            cmd.aliases?.includes(args[0].toLowerCase())
                        )
                )
            ) {
                const cmd: Command =
                    commands.get(args[0].toLowerCase()) ||
                    (commands.find(c => !!c.aliases?.includes(args[0].toLowerCase())) as Command);

                const commandEmbed = new MessageEmbed()
                    .setTitle(cmd.name)
                    .setColor(client.config.themeColor)
                    .setThumbnail(message.guild?.iconURL({ dynamic: true }) as string)
                    .addField("Name:", cmd.name)
                    .addField("Description:", cmd.description);
                if (cmd.aliases?.length)
                    commandEmbed.addField(
                        "Aliases:",
                        cmd.aliases.length == 1 ? cmd.aliases[0] : cmd.aliases.join(", ")
                    );
                if (cmd.usage) commandEmbed.addField("Usage:", prefix + cmd.name + " " + cmd.usage);
                if (cmd.permissions)
                    commandEmbed.addField(
                        "Permissions:",
                        toProperCase(
                            typeof cmd.permissions === "string"
                                ? cmd.permissions.toLowerCase().replace(/_/g, " ").replace(/guild/g, "server")
                                : (cmd.permissions as string[])
                                      .join(",")
                                      .toLowerCase()
                                      .replace(/_/, " ")
                                      .replace(/guild/, "server")
                        )
                    );
                if (cmd.cooldown) commandEmbed.addField("Cooldown:", cmd.cooldown + " seconds");

                message.channel.send({ embeds: [commandEmbed] });
            } else {
                const embeds = [
                    new MessageEmbed()
                        .setTitle(`${client.config.serverName} Bot Help`)
                        .setDescription(
                            `This is a Discord Bot used in ${client.config.serverName}! You can use \`${prefix}help <category>\` or press one of the buttons below to see all of the commands in a specific category. You can also use \`${prefix}help <command>\` to get info on a specific command!`
                        )
                        .addField("Categories:", "`economy`, `fun`, `utility`, and `moderation`")
                        .addField(
                            "Website:",
                            `[Visit the ${client.config.serverName} website!](${client.config.website})`
                        )
                        .setColor(client.config.themeColor)
                        .setThumbnail(message.guild?.iconURL({ dynamic: true }) as string)
                ];

                const buttons = [];
                const buttonCategories = ["Economy", "Fun", "Utility", "Moderation"];

                const styles = ["PRIMARY", "SECONDARY", "SUCCESS", "DANGER"];

                for (const category of buttonCategories) {
                    buttons.push(
                        new MessageButton()
                            .setCustomID(`help-${category.toLowerCase()}`)
                            .setLabel(category)
                            .setStyle(styles[Math.floor(Math.random() * styles.length)] as MessageButtonStyleResolvable)
                    );
                }

                const components = [new MessageActionRow().addComponents(...buttons)];
                message.channel.send({ embeds, components });
            }
        } else {
            const embeds = [
                new MessageEmbed()
                    .setTitle(`${client.config.serverName} Bot Help`)
                    .setDescription(
                        `This is a Discord Bot used in ${client.config.serverName}! You can use \`${prefix}help <category>\` or press one of the buttons below to see all of the commands in a specific category. You can also use \`${prefix}help <command>\` to get info on a specific command!`
                    )
                    .addField("Categories:", "`economy`, `fun`, `utility`, and `moderation`")
                    .addField("Website:", `[Visit the ${client.config.serverName} website!](${client.config.website})`)
                    .setColor(client.config.themeColor)
                    .setThumbnail(message.guild?.iconURL({ dynamic: true }) as string)
            ];

            const buttons = [];
            const buttonCategories = ["Economy", "Fun", "Utility", "Moderation"];

            const styles = ["PRIMARY", "SECONDARY", "SUCCESS", "DANGER"];

            for (const category of buttonCategories) {
                buttons.push(
                    new MessageButton()
                        .setCustomID(`help-${category.toLowerCase()}`)
                        .setLabel(category)
                        .setStyle(styles[Math.floor(Math.random() * styles.length)] as MessageButtonStyleResolvable)
                );
            }

            const components = [new MessageActionRow().addComponents(...buttons)];
            message.channel.send({ embeds, components });
        }
    }
});
