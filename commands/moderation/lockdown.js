let enabled = false;

module.exports = {
    name: "lockdown",
    aliases: ["lock"],
    permissions: ["ADMINISTRATOR"],
    description: "Stops new members from joining.",
    execute(client, message, args) {
        if (enabled === true) {
            message.channel.send("Lockdown disabled.");
            enabled = false;
        } else if (enabled === false) {
            message.channel.send("Server is locked down. No new members can join");
            enabled = true;
        }

        client.on("guildMemberAdd", (member) => { 
            if (enabled === false) return;
            
            member.send("Sorry, but this server in currently on lockdown.");
            member.kick();
        });
    }
};