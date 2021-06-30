import Discord, { User } from "discord.js";
import config from "../config.js";

export default class MessageEmbed extends Discord.MessageEmbed {
    // eslint-disable-next-line @typescript-eslint/ban-types
    constructor(author: User, data: MessageEmbed | Object = {}) {
        super(
            Object.assign(data, {
                color: config.themeColor,
                thumbnail: {
                    url: "https://cdn.discordapp.com/icons/824272560761733121/8b5978b039cfe7edcadac57dcc235063.webp"
                },
                author: {
                    name: author.tag,
                    icon_url: author.displayAvatarURL({ dynamic: true })
                }
            })
        );
    }
}
