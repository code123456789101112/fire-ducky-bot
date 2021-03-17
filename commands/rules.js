const Discord = require("discord.js");
const rule = ["1. No spam unless it's in a spam channel", "2. No cursing unless it's in <#806583914716987462>", "3. Don't be racist", "4. Don't be rude", "5. No cheating in events", "6. If you want roles contact a higherup", "7. Report stuff to owners", "8. Treat everyone with respect. Absolutely no harassment, sexism, racism, or hate speech will be tolerated.", "9. No self-promotion (server invites, advertisements, etc) without having a certain number of invites. This includes DMing fellow members.", "10. If you see something that's against the rules or something that makes you feel unsafe, let staff know! We want this server to be a welcoming space!", "11. No NSFW or obscene content. This includes text, images, or links featuring nudity, sex, hard violence, or other graphically disturbing content."];

module.exports = {
	name: "rules",
	description: "Shows server rules.",
    usage: "rule",
    aliases: ["r"],
	execute(client, message, args) {
        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Server Rules")
                .setThumbnail("https://media.discordapp.net/attachments/781155105063043082/801151243987714058/fire_breathing_rubber_duckies.jpg?width=412&height=412")
                .setColor("#ff0000")
                .setDescription(" 1. No spam unless it's in a spam channel \n 2. No cursing unless it's in <#806583914716987462> \n 3. Don't be racist \n 4. Don't be rude \n 5. No cheating in events \n 6. If you want roles contact a higherup \n 7. Report stuff to owners \n 8. Treat everyone with respect. Absolutely no harassment, sexism, racism, or hate speech will be tolerated. \n 9. No self-promotion (server invites, advertisements, etc) without having a certain number of invites. This includes DMing fellow members. \n 10. If you see something that's against the rules or something that makes you feel unsafe, let staff know! We want this server to be a welcoming space! \n 11. No NSFW or obscene content. This includes text, images, or links featuring nudity, sex, hard violence, or other graphically disturbing content.");
            message.channel.send(embed);
        } else {
            let num = parseInt(args[0]);
            num--;
            message.channel.send(rule[num]);
        }
	}
};