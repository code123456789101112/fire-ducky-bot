import { Collection, VoiceChannel, TextChannel, User, GuildMember, Channel, Role } from "discord.js";

import Command, { SlashCommand } from "../structs/command";
import { Config } from "../config";

import { CooldownInstance, CurrencyInstance, DonationInstance, JobInstance } from "./dbInterfaces";
import { ModelCtor } from "sequelize/types";

import Message from "../structs/message";

export interface ClientProperties {
    commands: Collection<string, Command>;
    slashCommands: Collection<string, SlashCommand>;

    cooldowns: Collection<string, Collection<string, number>>;
    
    l2l: boolean;
    ch: boolean | VoiceChannel;
    wr: boolean | VoiceChannel;
    chlogs: boolean | TextChannel;

    config: Config

    Cooldowns: ModelCtor<CooldownInstance>;
    Currency: ModelCtor<CurrencyInstance>;
    Donations: ModelCtor<DonationInstance>;
    Jobs: ModelCtor<JobInstance>;

    getUserFromMention(mention: string): Promise<void | User>;
    getMemberFromMention(message: Message, mention: string): Promise<void | GuildMember>;
    getRoleFromMention(message: Message, mention: string): Promise<void | null | Role>;
    getChannelFromMention(mention: string): Promise<void | null | Channel>;

    randomInt(min: number, max: number): number

    loadDirs(): Promise<void>;
}