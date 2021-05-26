import { CommandInteraction, CommandInteractionOption, User } from "discord.js";
import { DonationInstance } from "../interfaces/dbInterfaces.js";
import Client from "../structs/client.js";
import { SlashCommand } from "../structs/command.js";

export default new SlashCommand({
    data: {
        name: "editdono",
        description: "Edits donation amounts.",
        options: [{
            name: "increase",
            description: "Increase someone's donation amount.",
            type: "SUB_COMMAND",
            options: [{
                name: "user",
                description: "The user to increase.",
                type: "USER",
                required: true
            }, {
                name: "amount",
                description: "The amount to increase by.",
                type: "INTEGER",
                required: true
            }]
        }, {
            name: "decrease",
            description: "Decrease someone's donation amount.",
            type: "SUB_COMMAND",
            options: [{
                name: "user",
                description: "The user to decrease.",
                type: "USER",
                required: true
            }, {
                name: "amount",
                description: "The amount to decrease by.",
                type: "INTEGER",
                required: true
            }]
        }],
        defaultPermission: false
    },
    permissions: [{
        id: "824272561009328141",
        type: "ROLE",
        permission: true
    }],
    cooldown: 5,
    async execute(client: Client, interaction: CommandInteraction, args: CommandInteractionOption[]) {
        const options: CommandInteractionOption[] = args[0].options as CommandInteractionOption[];
        
        const user: User = options[0].user as User;
        let userDono: DonationInstance = await client.Donations.findOne({ where: { id: user.id } }) as DonationInstance;

        if (!userDono) {
            userDono = await client.Donations.create({
                id: user.id,
                amount: 0
            });
        }

        if (args[0].name as string === "increase") {
            await userDono.increment("amount", { by: options[1].value as number });
            interaction.reply(`Successfully increased ${options[0].member.displayName}'s donation amount by ${options[1].value}.`);
        } else {
            await userDono.decrement("amount", { by: options[1].value as number });
            interaction.reply(`Successfully decreased ${options[0].member.displayName}'s donation amount by ${options[1].value}.`);
        }
    }
});