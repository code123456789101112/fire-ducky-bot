const { Structures, APIMessage, Client, TextChannel, DMChannel, NewsChannel, StringResolvable, MessageOptions, MessageAdditions, Collection } = require("discord.js");

Structures.extend("Message", Msg => {
  class Message extends Msg {
    /**
     * 
     * @param {Client} client 
     * @param {Object} data 
     * @param {TextChannel|DMChannel|NewsChannel} channel 
     */
    constructor(client, data, channel) {
      super(client, data, channel);
    }
    
    command() {
      const { prefix, ownerID } = require("../config.json");
      const { cooldowns } = this.client;

      if (!this.content.startsWith(prefix) || this.author.bot) return;
      else if (this.channel.id === "801150859873746984" && this.author.id !== ownerID) return;

      const args = this.content.slice(prefix.length).trim().split(/\s+/);
      const commandName = args.shift().toLowerCase();

      const command = this.client.commands.get(commandName) || this.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

      if (!command) return;

      if (command.guildOnly && this.channel.type === "dm") return this.reply("I can't execute that command inside DMs!");

      if (command.permissions) {
        const authorPerms = this.channel.permissionsFor(this.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) return this.reply("You can not do this!");
      }

      if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());

      const now = Date.now();
      const timestamps = cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown) * 1000;

      if (timestamps.has(this.author.id)) {
        const expirationTime = timestamps.get(this.author.id) + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          return this.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
      }

      timestamps.set(this.author.id, now);
      setTimeout(() => timestamps.delete(this.author.id), cooldownAmount);

      try {
        command.execute(this.client, this, args);
      } catch (error) {
        console.error(error);
        this.reply("There was an error trying to execute that command!");
      }
    }
    /**
     * 
     * @param {StringResolvable|APIMessage} content 
     * @param {MessageOptions|MessageAdditions} options 
     * @returns {Promise<Message>}
     */
    async reply(content, options) {
      const reference = {
        message_id: (!!content && !options ? typeof content === "object" && content.messageID : options && options.messageID) || this.id,
        message_channel: this.channel.id
      };
    
      const { data: parsed, files } = await APIMessage
        .create(this, content, options)
        .resolveData()
        .resolveFiles();
    
      const msg = await this.client.api.channels[this.channel.id].messages.post({
        data: { ...parsed, message_reference: reference },
        files
      });

      return await this.channel.messages.fetch(msg.id);
    }
  };

  module.exports = Message;
  return Message;
});