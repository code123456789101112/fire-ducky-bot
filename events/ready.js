const Client = require("../structs/client.js");
/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("Nobody", { type: "LISTENING" });
};