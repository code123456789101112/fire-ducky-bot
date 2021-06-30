import Discord, { User } from "discord.js";
import config from "../config.js";

export default class MessageEmbed extends Discord.MessageEmbed {
    // eslint-disable-next-line @typescript-eslint/ban-types
    constructor(author: User, data: MessageEmbed | Object = {}) {
        super(
            Object.assign(data, {
                color: config.themeColor,
                thumbnail: {
                    url: config.serverIcon
                },
                author: {
                    name: author.tag,
                    icon_url: author.displayAvatarURL({ dynamic: true })
                }
            })
        );
    }
}
