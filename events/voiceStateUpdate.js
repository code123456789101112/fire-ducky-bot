const Client = require("../client.js");
const { VoiceState } = require("discord.js");
/**
 * 
 * @param {Client} client 
 * @param {VoiceState} oldState 
 * @param {VoiceState} newState 
 */
module.exports = (client, oldState, newState) => {
    if (!client.l2l) return;

    if (client.wr && newState.channelID === client.wr.id) {
        newState.member.voice.setChannel(client.ch);
    } else if (newState.channelID === client.ch.id && client.ch.members.size <= 1 && !client.wr) {
        console.log(client.ch.id);
        client.channels.cache.get("801148810725949471").send(`${newState.member} IS THE WINNER OF THE LAST TO LEAVE VC EVENT!!!`);

        client.ch.delete();
        delete client.l2l;
    } else if (oldState.channel && !newState.channel && oldState.channelID === client.ch.id && !client.wr) {
        client.chlogs.send(`${oldState.member.user.tag} HAS LEFT THE VC, THEY ARE OUT!!!!! ${client.ch.members.size} REMAIN!!!!!!!!`);
    }
};   
