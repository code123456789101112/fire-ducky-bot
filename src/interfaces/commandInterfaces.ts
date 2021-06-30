import {
    PermissionResolvable,
    ApplicationCommandData,
    CommandInteraction,
    CommandInteractionOption,
    ApplicationCommandPermissionData,
    Collection
} from "discord.js";

import Client from "../structs/client.js";
import Message from "../structs/message.js";

export interface BaseCommandProperties {
    cooldown?: number;
    guildOnly?: boolean;
    devOnly?: boolean;
}

export interface SlashCommandProperties extends BaseCommandProperties {
    data: ApplicationCommandData;
    permissions?: ApplicationCommandPermissionData[];
    execute: (
        client: Client,
        interaction: CommandInteraction,
        args: Collection<string, CommandInteractionOption>
    ) => unknown;
}

export interface CommandProperties extends BaseCommandProperties {
    name: string;
    description: string;
    usage?: string;
    aliases?: string[];
    permissions?: PermissionResolvable;
    execute(client: Client, message: Message, args: string[]): unknown;
}
