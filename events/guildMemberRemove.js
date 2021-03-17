module.exports = (client, member) => {
    const welcomeChannel = member.guild.channels.cache.get("801125577644834913");
	welcomeChannel.send(`${member} has just left the server. :(`);
};