import { ApplicationCommandData, CommandInteractionOption, CommandInteraction, PermissionResolvable, ApplicationCommandPermissionData } from "discord.js";
import { BaseCommandProperties, CommandProperties, SlashCommandProperties } from "../interfaces/commandInterfaces";

import Client from "./client";
import Message from "./message";


class BaseCommand implements BaseCommandProperties {
    cooldown?: number;
    guildOnly?: boolean;
    devOnly?: boolean;

    constructor(properties: BaseCommandProperties) {
        this.cooldown = properties.cooldown;
        this.devOnly = properties.devOnly;
        this.guildOnly = properties.guildOnly;
    }
}

export class SlashCommand extends BaseCommand implements SlashCommandProperties {
    data: ApplicationCommandData;
    permissions: ApplicationCommandPermissionData[] | undefined;
    execute: (client: Client, interaction: CommandInteraction, args: CommandInteractionOption[]) => unknown;
    
    constructor(properties: SlashCommandProperties) {
        const { cooldown, guildOnly, devOnly } = properties;
        super({ cooldown, guildOnly, devOnly });

        this.data = properties.data;
        this.permissions = properties.permissions;
        this.execute = properties.execute;
    }
}

export default class Command extends BaseCommand implements CommandProperties {
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
        const { cooldown, guildOnly, devOnly } = properties;
        super({ cooldown, guildOnly, devOnly });

        this.name = properties.name;
        this.aliases = properties.aliases;

        this.description = properties.description;
        this.usage = properties.usage;

        this.permissions = properties.permissions;

        this.execute = properties.execute;
    }
}