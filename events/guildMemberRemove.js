module.exports = (client, member) => {
    const leavingChannel = member.guild.channels.cache.get("801125577644834913");
	leavingChannel.send(`${member} has just left the server. :(`);
};