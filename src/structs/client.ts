import Discord, { Collection, User, GuildMember, Channel, Role, VoiceChannel, TextChannel, Intents } from "discord.js";

import Message from "./message.js";
import loadDirs from "./loadDirs.js";

import config, { Config } from "../config.js";

import { ModelCtor } from "sequelize";
import { CooldownInstance, CurrencyInstance, DonationInstance, JobInstance } from "../interfaces/dbInterfaces.js";

import dbObjects from "../db/dbObjects.js";
const [Cooldowns, Currency, Donations, Jobs] = dbObjects;

import Command, { SlashCommand } from "./command.js";
import { ClientProperties } from "../interfaces/clientInterface.js";

export default class Client extends Discord.Client implements ClientProperties {
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

    constructor() {
        super({ partials: ["MESSAGE", "CHANNEL", "REACTION"], intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES] });
        
        this.commands = new Collection();
        this.slashCommands = new Collection();

        this.cooldowns = new Collection();
        
        this.l2l = false;
        this.ch = false;
        this.wr = false;
        this.chlogs = false;
        
        this.config = config;
        
        this.Cooldowns = Cooldowns;
        this.Currency = Currency;
        this.Donations = Donations;
        this.Jobs = Jobs;
    }

    async getUserFromMention(mention: string): Promise<void | User> {
        const matches: string[] | null = mention.match(/^<@!?(\d+)>$/);
        if (!matches) return;
    
        return await this.users.fetch(matches[1]);
    }

    async getMemberFromMention(message: Message, mention: string): Promise<GuildMember | void> {
        const matches: string[] | null = mention.match(/^<@!?(\d+)>$/);
        if (!matches) return;  

        return await message.guild?.members.fetch(matches[1]);
    }

    async getChannelFromMention(mention: string): Promise<Channel | null | void> {
        const matches: string[] | null = mention.match(/^<#(\d+)>$/);
        if (!matches) return;

        return await this.channels.fetch(matches[1]);
    }

    async getRoleFromMention(message: Message, mention: string): Promise<Role | void | null> {
        const matches: string[] | null = mention.match(/^<@&(\d+)>$/);
        if (!matches) return;

        return await message.guild?.roles.fetch(matches[1]);
    }

    randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async loadDirs(): Promise<void> {
        await loadDirs.loadEvents(this);
        await loadDirs.loadCommands(this);
    }
}