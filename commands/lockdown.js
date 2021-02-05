let enabled = false;

module.exports = {
    name: "lockdown",
    aliases: ["lock"],
    permissions: ["ADMINISTRATOR"],
    description: "Stops new members from joining.",
    execute(client, message, args) {
        if (enabled === true) {
            enabled = false;
            return message.channel.send("Lockdown disabled.");
        }
        
        message.channel.send("Server is locked down. No new members can join");
        enabled = true;
        client.on("guildMemberAdd", (member) => { 
            member.send("Sorry, but this server in currently on lockdown.");
            member.kick();
        });
    }
};