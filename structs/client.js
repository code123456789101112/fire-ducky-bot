const { Collection, Client, ClientOptions, User, GuildMember, Channel, Role } = require("discord.js");
const Message = require("./message.js");

const Keyv = require("keyv");
const { dbURL } = require("../config.json");

module.exports = class extends Client {
    /**
     * 
     * @param {ClientOptions} options 
     */
    constructor(options) {
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
    }
    /**
     * 
     * @param {String} mention 
     * @returns {Promise<User>}
     */
    async getUserFromMention(mention) {
        const matches = mention.match(/^<@!?(\d+)>$/);
        if (!matches) return;
    
        return await this.users.fetch(matches[1]);
    }
    /**
     * 
     * @param {Message} message 
     * @param {String} mention 
     * @returns {Promise<GuildMember>}
     */
    async getMemberFromMention(message, mention) {
        const matches = mention.match(/^<@!?(\d+)>$/);
        if (!matches) return;  

        return await message.guild.members.fetch(matches[1]);
    }
    /**
     * 
     * @param {String} mention 
     * @returns {Promise<Channel>}
     */
    async getChannelFromMention(mention) {
        const matches = mention.match(/^<#(\d+)>$/);
        if (!matches) return;

        return await this.channels.fetch(matches[1]);
    }
    /**
     * 
     * @param {Message} message 
     * @param {String} mention 
     * @returns {Promise<Role>}
     */
    async getRoleFromMention(message, mention) {
        const matches = mention.match(/^<@&(\d+)>$/);
        if (!matches) return;

        return await message.guild.roles.fetch(matches[1]);
    }
    /**
     * 
     * @param {Number} min 
     * @param {Number} max 
     * @returns {Number}
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};