import { Collection, CommandInteraction, CommandInteractionOption, GuildMember, User } from "discord.js";
import { SlashCommand } from "../structs/command.js";

import Client from "../structs/client.js";

export default new SlashCommand({
    data: {
        name: "editdono",
        description: "Edits donation amounts.",
        options: [
            {
                name: "increase",
                description: "Increase someone's donation amount.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "user",
                        description: "The user to increase.",
                        type: "USER",
                        required: true
                    },
                    {
                        name: "amount",
                        description: "The amount to increase by.",
                        type: "INTEGER",
                        required: true
                    }
                ]
            },
            {
                name: "decrease",
                description: "Decrease someone's donation amount.",
                type: "SUB_COMMAND",
                options: [
                    {
                        name: "user",
                        description: "The user to decrease.",
                        type: "USER",
                        required: true
                    },
                    {
                        name: "amount",
                        description: "The amount to decrease by.",
                        type: "INTEGER",
                        required: true
                    }
                ]
            }
        ],
        defaultPermission: false
    },
    permissions: [
        {
            id: "824272561009328141",
            type: "ROLE",
            permission: true
        }
    ],
    cooldown: 5,
    async execute(client: Client, interaction: CommandInteraction, args: Collection<string, CommandInteractionOption>) {
        const options = args.first()?.options as Collection<string, CommandInteractionOption>;

        const user: User = options.get("user")?.user as User;
        const userDono = await client.Donations.findByIdOrCreate(user.id, {
            _id: user.id,
            amount: 0
        });

        if (args.has("increase")) {
            userDono.amount += options.get("amount")?.value as number;
            await userDono.save();

            interaction.reply(
                `Successfully increased ${
                    (options.get("user")?.member as GuildMember)?.displayName
                }'s donation amount by ${(options.get("amount")?.value as number).toLocaleString()}.`
            );
        } else {
            userDono.amount -= options.get("amount")?.value as number;
            if (userDono.amount < 0) userDono.amount = 0;

            await userDono.save();
            interaction.reply(
                `Successfully decreased ${
                    (options.get("user")?.member as GuildMember)?.displayName
                }'s donation amount by ${(options.get("amount")?.value as number).toLocaleString()}.`
            );
        }
    }
});
