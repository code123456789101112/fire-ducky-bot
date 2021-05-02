import { Collection, Client, ClientOptions, User, GuildMember, Channel, Role } from "discord.js";
import Message from "./message.js";

import Keyv from "keyv";

import config from "../config.js";
const { dbURL } = config;

export default class extends Client {
    commands: Collection<string, object>;
    cooldowns: Collection<string, Collection<string, number>>;

    bal: Keyv;
    bank: Keyv;
    bankSpace: Keyv;

    jobs: Keyv;
    salary: Keyv;

    cd: Keyv;

    afk: Keyv;
    
    l2l: any;
    ch: any;
    wr: any;
    chlogs: any;
    
    config: { prefix: string; ownerID: string; token: string; dbURL: string; };
    /**
     * 
     * @param {ClientOptions} options 
     */
    constructor(options?: ClientOptions) {
        super(options);

        this.commands = new Collection();
        this.cooldowns = new Collection();

        this.bal = new Keyv(dbURL, { collection: "bal" });
        this.bank = new Keyv(dbURL, { collection: "bank" });
        this.bankSpace = new Keyv(dbURL, { collection: "bankSpace" });

        this.jobs = new Keyv(dbURL, { collection: "jobs" });
        this.salary = new Keyv(dbURL, { collection: "jobSalary" });

        this.cd = new Keyv(dbURL, { collection: "cooldowns" });

        this.afk = new Keyv(dbURL, { collection: "afk" });

        this.l2l = false;
        this.ch = false;
        this.wr = false;
        this.chlogs = false;

        this.config = config;
    }
    /**
     * 
     * @param {String} mention 
     * @returns {Promise<void|User>}
     */
    async getUserFromMention(mention: string): Promise<void | User> {
        const matches: string[] | null = mention.match(/^<@!?(\d+)>$/);
        if (!matches) return;
    
        return await this.users.fetch(matches[1]);
    }
    /**
     * 
     * @param {Message} message 
     * @param {String} mention 
     * @returns {Promise<GuildMember|void>}
     */
    async getMemberFromMention(message: Message, mention: string): Promise<GuildMember | void> {
        const matches: string[] | null = mention.match(/^<@!?(\d+)>$/);
        if (!matches) return;  

        return await message.guild?.members.fetch(matches[1]);
    }
    /**
     * 
     * @param {String} mention 
     * @returns {Promise<Channel|void>}
     */
    async getChannelFromMention(mention: string): Promise<Channel | void> {
        const matches: string[] | null = mention.match(/^<#(\d+)>$/);
        if (!matches) return;

        return await this.channels.fetch(matches[1]);
    }
    /**
     * 
     * @param {Message} message 
     * @param {String} mention 
     * @returns {Promise<Role|void|null>}
     */
    async getRoleFromMention(message: Message, mention: string): Promise<Role | void | null> {
        const matches: string[] | null = mention.match(/^<@&(\d+)>$/);
        if (!matches) return;

        return await message.guild?.roles.fetch(matches[1]);
    }
    /**
     * 
     * @param {Number} min 
     * @param {Number} max 
     * @returns {Number}
     */
    randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};