import { VoiceState, TextChannel, GuildMember, VoiceChannel } from "discord.js";
import Client from "../structs/client.js";

export default (client: Client, oldState: VoiceState, newState: VoiceState): unknown => {
    if (!client.l2l) return;

    if (client.wr && newState.channelID === (client.wr as VoiceChannel).id) {
        (newState.member as GuildMember).voice.setChannel((client.ch as VoiceChannel));
    } else if (newState.channelID === (client.ch as VoiceChannel).id && (client.ch as VoiceChannel).members.size <= 1 && !client.wr) {
        console.log((client.ch as VoiceChannel).id);
        (client.channels.cache.get("844947400840839208") as TextChannel).send(`${newState.member} IS THE WINNER OF THE LAST TO LEAVE VC EVENT!!!`);

        (client.ch as VoiceChannel).delete();
        client.l2l = false;
    } else if (oldState.channel && !newState.channel && oldState.channelID === (client.ch as VoiceChannel).id && !client.wr) {
        (client.chlogs as TextChannel).send(`${(oldState.member as GuildMember).user.tag} HAS LEFT THE VC, THEY ARE OUT!!!!! ${(client.ch as VoiceChannel).members.size} REMAIN!!!!!!!!`);
    }
};   
