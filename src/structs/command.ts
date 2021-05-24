import { ApplicationCommandData, CommandInteractionOption, CommandInteraction, PermissionResolvable } from "discord.js";

import Client from "./client";
import Message from "./message";

interface CommandProperties {
    name: string,
    description: string,
    usage?: string,
    aliases?: string[],
    permissions?: PermissionResolvable,
    guildOnly?: boolean,
    devOnly?: boolean,
    cooldown?: number,
    execute(client: Client, message: Message, args: string[]): unknown | Promise<unknown>
}

export default class Command implements CommandProperties {
    name: string;
    aliases: string[] | undefined;

    description: string;
    usage: string | undefined;

    guildOnly: boolean | undefined;
    devOnly: boolean | undefined;

    permissions: PermissionResolvable | undefined
    cooldown: number | undefined;

    execute: (client: Client, message: Message, args: string[]) => unknown;
    
    constructor(properties: CommandProperties) {
        this.name = properties.name;
        this.aliases = properties.aliases;

        this.description = properties.description;
        this.usage = properties.usage;
        
        this.guildOnly = properties.guildOnly;
        this.devOnly = properties.devOnly;
        
        this.permissions = properties.permissions;
        this.cooldown = properties.cooldown;

        this.execute = properties.execute;
    }
}

interface SlashCommandProperties {
    info: ApplicationCommandData,
    execute: (client: Client, interaction: CommandInteraction, args: CommandInteractionOption[]) => unknown;
}

export class SlashCommand implements SlashCommandProperties {
    info: ApplicationCommandData;
    execute: (client: Client, interaction: CommandInteraction, args: CommandInteractionOption[]) => unknown;
    
    constructor(properties: SlashCommandProperties) {
        this.info = properties.info;
        this.execute = properties.execute;
    }
}