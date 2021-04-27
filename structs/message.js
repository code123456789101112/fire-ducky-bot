const { Structures, APIMessage, Client, TextChannel, DMChannel, NewsChannel, MessageOptions, MessageAdditions } = require("discord.js");

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
    /**
     * 
     * @param {String} content 
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