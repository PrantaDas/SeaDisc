import {
    CommandInteraction,
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder
} from "discord.js";

/**
 * Enum representing different blockchain networks.
 * @enum {string} Network
 * @property {string} MAINNET - The Ethereum Mainnet.
 * @property {string} TESTNET - The Ethereum Testnet.
 */
export enum Network {
    MAINNET = 'mainnet',
    TESTNET = 'testnet'
}

/**
 * Interface representing a Discord slash command.
 * @interface Command
 * @property {Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand"> | SlashCommandSubcommandsOnlyBuilder} data
 *   - The data for building the slash command.
 * @property {(interaction: CommandInteraction, callback?: (interaction: CommandInteraction) => Promise<any>) => Promise<any>} execute
 *   - The function to execute when the command is triggered.
 * @param {CommandInteraction} interaction - The Discord command interaction object.
 * @param {Function} callback - Optional callback function for command execution.
 */
export interface Command {
    data: Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand"> | SlashCommandSubcommandsOnlyBuilder;
    execute: (interaction: CommandInteraction, callback?: (interaction: CommandInteraction) => Promise<any>) => Promise<any>;
};