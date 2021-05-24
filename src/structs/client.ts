import { Collection, Client, User, GuildMember, Channel, Role, VoiceChannel, TextChannel, Intents } from "discord.js";

import Message from "./message.js";
import loadDirs from "./loadDirs.js";

import Config from "../config.js";

import { ModelCtor } from "sequelize";
import { CooldownInstance, CurrencyInstance, DonationInstance, JobInstance } from "../db/dbInterfaces.js";

import dbObjects from "../db/dbObjects.js";
const [Cooldowns, Currency, Donations, Jobs] = dbObjects;

import Command, { SlashCommand } from "./command.js";

export default class extends Client {
    commands: Collection<string, Command>;
    slashCommands: Collection<string, SlashCommand>;

    cooldowns: Collection<string, Collection<string, number>>;
    
    l2l: boolean;
    ch: boolean | VoiceChannel;
    wr: boolean | VoiceChannel;
    chlogs: boolean | TextChannel;

    config: Config

    loadEvents: (client: this) => Promise<void>;
    loadCommands: (client: this) => Promise<void>;

    Cooldowns: ModelCtor<CooldownInstance>;
    Currency: ModelCtor<CurrencyInstance>;
    Donations: ModelCtor<DonationInstance>;
    Jobs: ModelCtor<JobInstance>;

    constructor() {
        super({ partials: ["MESSAGE", "CHANNEL", "REACTION"], intents: Intents.ALL });
        
        this.commands = new Collection();
        this.slashCommands = new Collection();

        this.cooldowns = new Collection();
        
        this.l2l = false;
        this.ch = false;
        this.wr = false;
        this.chlogs = false;
        
        this.config = new Config();
        
        this.loadEvents = loadDirs.loadEvents;
        this.loadCommands = loadDirs.loadCommands;
        
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
        await this.loadEvents(this);
        await this.loadCommands(this);
    }
}