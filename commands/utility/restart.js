module.exports = {
    name: "restart",
    description: "Restarts the bot.",
    permissions: ["ADMINISTRATOR"],
    async execute(client, message, args) {
        await client.destroy();
        client.login(require("../../jsons/config.json").token);
    }
};