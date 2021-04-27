const Client = require("../../client.js");
const Message = require("../../message.js");

module.exports = {
    name: "l2l",
    description: "Starts last to leave VC event.",
    permissions: ["ADMINISTRATOR"],
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    execute(client, message, args) {
        message.delete();
        client.l2l = true;

        message.guild.channels.create("last 2 leave VC WAITING ROOM", { type: "voice" }).then(ch => {
            ch.setParent("801125577644834912");
            setTimeout(() => {
                ch.delete(); 
                delete client.wr; 
            }, 900000);
            client.wr = ch;
        });

        message.guild.channels.create("last 2 leave VC", { type: "voice" }).then(async ch => {
            await ch.setParent("801125577644834912");
            client.ch = ch;
            await ch.updateOverwrite(message.guild.roles.everyone, { CONNECT: false, SPEAK: false });
        });

        message.guild.channels.create("last 2 leave VC LOGS", { type: "text" }).then(async ch => {
            await ch.setParent("801125577644834912");
            client.chlogs = ch;
            await ch.updateOverwrite(message.guild.roles.everyone, { VIEW_CHANNEL: false });
        });
        
        message.channel.send("Successfully created Last To Leave VC Channels");
    }
};