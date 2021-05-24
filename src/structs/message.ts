/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { TextChannel, Collection } from "discord.js";
import * as Discord from "discord.js";

import Client from "./client.js";
import Command from "./command.js";

export default class Message extends Discord.Message {
  command(client: Client): void | Promise<unknown> {
    const { prefix, ids } = client.config;
    const { cooldowns } = client;

    if (!this.content.startsWith(prefix) || this.author.bot) return;
    else if (this.channel.id === ids.channels.spam && this.author.id !== ids.users.owner) return;

    const args: string[] = this.content.slice(prefix.length).trim().split(/\s+/);
    const commandName: string | undefined = args.shift()?.toLowerCase();

    if (!commandName) return;

    const command: Command = client.commands.get(commandName) as Command || client.commands.find((cmd: any) => cmd.aliases?.includes(commandName)) as Command;

    if (!command) return;

    if (command.guildOnly && this.channel.type === "dm") return this.reply("I can't execute that command inside DMs!");

    if (command.permissions) {
      const authorPerms = (this.channel as TextChannel).permissionsFor(this.author);
      if (!authorPerms || !authorPerms.has(command.permissions)) return this.reply("You can not do this!");
    }

    if (command.devOnly && this.author.id !== ids.users.owner) return;

    if (!cooldowns.has(command.name as string)) cooldowns.set(command.name as string, new Collection());

    const now: number = Date.now();

    const timestamps: any = cooldowns.get(command.name as string);
    const cooldownAmount: number = (command.cooldown as number) * 1000;

    if (timestamps?.has(this.author.id)) {
      const expirationTime: number = timestamps.get(this.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft: number = (expirationTime - now) / 1000;
        return this.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
      }
    }

    timestamps.set(this.author.id, now);
    setTimeout(() => timestamps.delete(this.author.id), cooldownAmount);

    try {
      command.execute(client, this, args);
    } catch (error) {
      console.error(error);
      this.reply("There was an error trying to execute that command!");
    }
  }
}