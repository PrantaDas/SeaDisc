import { CommandInteraction, Interaction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";

export enum Network {
    MAINNET = 'mainnet',
    TESTNET = 'testnet'
}


export interface Command {
    data: Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">
    | SlashCommandSubcommandsOnlyBuilder;
    execute: (interaction: CommandInteraction, callback?: (interaction: CommandInteraction) => Promise<any>) => Promise<any>;
};