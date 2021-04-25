const { Structures, APIMessage } = require("discord.js");

module.exports = Structures.extend("Message", Message => {
    return class ReplyMessage extends Message {
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
});