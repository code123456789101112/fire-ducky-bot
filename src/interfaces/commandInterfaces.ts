import { PermissionResolvable, ApplicationCommandData, CommandInteraction, CommandInteractionOption } from "discord.js";

import Client from "../structs/client.js";
import Message from "../structs/message.js";

export interface BaseCommandProperties {
    cooldown?: number;
    permissions?: PermissionResolvable;
    guildOnly?: boolean;
    devOnly?: boolean;
}

export interface SlashCommandProperties extends BaseCommandProperties {
    data: ApplicationCommandData;
    execute: (client: Client, interaction: CommandInteraction, args: CommandInteractionOption[]) => unknown;
}

export interface CommandProperties extends BaseCommandProperties {
    name: string;
    description: string;
    usage?: string;
    aliases?: string[];
    execute(client: Client, message: Message, args: string[]): unknown;
}