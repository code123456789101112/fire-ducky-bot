const Discord = require('discord.js');

module.exports = {
	name: 'rules',
	description: 'Shows server rules.',
	execute(client, message, args) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Server Rules")
                .setThumbnail("https://media.discordapp.net/attachments/781155105063043082/801151243987714058/fire_breathing_rubber_duckies.jpg?width=412&height=412")
                .setColor("#ff0000")
                .setDescription(" 1. No spam unless it's in a spam channel \n 2. No cursing unless it's in <#806583914716987462> \n 3. Don't be racist \n 4. Don't be rude \n 5. No cheating in events \n 6. If you want roles contact a higherup \n 7. Report stuff to owners \n 8. Listen to higherups \n 9. Don't mass ping/spam ping unless needed")
            message.channel.send(embed);
	},
};