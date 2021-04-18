const Discord = require("discord.js");

const Keyv = require("keyv");
const { dbURL } = require("./jsons/config.json");

module.exports = class extends Discord.Client {
    constructor(options) {
        super(options);

        this.commands = new Discord.Collection();
        this.cooldowns = new Discord.Collection();

        this.bal = new Keyv(dbURL, { collection: "bal" });
        this.bank = new Keyv(dbURL, { collection: "bank" });
        this.bankSpace = new Keyv(dbURL, { collection: "bankSpace" });

        this.jobs = new Keyv(dbURL, { collection: "jobs" });
        this.salary = new Keyv(dbURL, { collection: "jobSalary" });

        this.cd = new Keyv(dbURL, { collection: "cooldowns" });
    }

    async getUserFromMention(mention) {
        const matches = mention.match(/^<@!?(\d+)>$/);
        if (!matches) return;
    
        return await this.users.fetch(matches[1]);
    }
    
    async getMemberFromMention(message, mention) {
        const matches = mention.match(/^<@!?(\d+)>$/);
        if (!matches) return;  

        return await message.guild.members.fetch(matches[1]);
    }

    async getChannelFromMention(mention) {
        const matches = mention.match(/^<#(\d+)>$/);
        if (!matches) return;

        return await this.channels.fetch(matches[1]);
    }

    async getRoleFromMention(message, mention) {
        const matches = mention.match(/^<@&(\d+)>$/);
        if (!matches) return;

        return await message.guild.roles.fetch(matches[1]);
    }
};