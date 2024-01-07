/**
 * Command interface representing a Discord slash command.
 * @interface Command
 * @property {SlashCommandBuilder} data - The data for building the slash command.
 * @property {Function} execute - The function to execute when the command is triggered.
 * @param {CommandInteraction} interaction - The Discord command interaction object.
 * @param {Function} callback - Optional callback function for command execution.
 */

/**
 * Slash command builder from Discord.js library for creating slash commands.
 * @external SlashCommandBuilder
 * @see {@link https://discord.js.org/#/docs/builders/main/class/SlashCommandBuilder}
 */

/**
 * Type representing a Discord slash command.
 * @typedef {Object} Command
 * @property {SlashCommandBuilder} data - The data for building the slash command.
 * @property {Function} execute - The function to execute when the command is triggered.
 * @param {CommandInteraction} interaction - The Discord command interaction object.
 * @param {Function} callback - Optional callback function for command execution.
 */

import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "./types";

/**
 * Command object for the "/ping" slash command.
 */
const ping: Command = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),
    execute: async (interaction) => {
        await interaction.reply('pong');
    }
};

/**
 * Command object for the "/hello" slash command.
 */
const hello: Command = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with hello (greetings)'),
    execute: async (interaction) => {
        await interaction.reply(`Hey there <@${interaction.user.id}>, how are you doing?`)
    }
};

/**
 * Command object for the "/subscribe" slash command.
 */
const subscribe: Command = {
    data: new SlashCommandBuilder()
        .setName('subscribe')
        .setDescription('Subscribe a collection to get events.Eg: /subscribe boardapes')
        .addStringOption((option) =>
            option.setName('input')
                .setDescription('Replies with a successful subscription')
        ),
    execute: async (interaction, callback) => {
        if (callback) {
            await callback(interaction);
        }
    }
};


/**
 * Command object for the "/unsubscribe" slash command.
 */
const unsubscribe: Command = {
    data: new SlashCommandBuilder()
        .setName('unsubscribe')
        .setDescription('Unsubscribe a collection to get events.Eg: /unsubscribe boardapes')
        .addStringOption((option) =>
            option.setName('input')
                .setDescription('Replies with a successful unsubscription message')
        ),
    execute: async (interaction, callback) => {
        if (callback) {
            await callback(interaction);
        }
    }
};

/**
 * Command object for the "/collections" slash command.
 */
const collections: Command = {
    data: new SlashCommandBuilder()
        .setName('collections')
        .setDescription('Get all subscribed collections'),
    execute: async (interaction, callback) => {
        if (callback) {
            await callback(interaction);
        }
    }
};

/**
 * List of custom slash commands for the Discord bot.
 */
export const CommandList: Command[] = [ping, hello, subscribe, unsubscribe, collections];