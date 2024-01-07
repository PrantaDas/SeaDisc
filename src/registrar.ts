import { REST, Routes, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { Bot } from "./bot";
import { Command } from "./types";
import log from "./logger";

/**
 * SlashCommandRegistrar class for registering slash commands with Discord.
 */
export class SlashCommandRegistrar {
    private readonly client: Bot;
    private readonly botToken: string;
    private slashCommands: Command[];

    /**
    * Creates a new instance of the SlashCommandRegistrar class.
    * @param {Bot} discClient - The Discord Bot instance.
    * @param {string} token - The Discord bot token.
    * @param {Command[]} commands - An array of custom commands to register.
    */
    constructor(discClient: Bot, token: string, commands: Command[]) {
        this.client = discClient;
        this.botToken = token;
        this.slashCommands = commands;
    }

    /**
     * Registers slash commands with Discord.
     * @public
     * @returns {Promise<void>} A Promise that resolves when the commands are successfully registered.
     */
    public async registerSlashCommand(): Promise<void> {
        const restCommands = this.slashCommands.map((c) => c.data);
        const rest = new REST({ version: '9' }).setToken(this.botToken);
        try {
            log.info('=> Started refreshing application (/) commands.');
            await rest.put(Routes.applicationCommands(
                this.client.discClient.user?.id!
            ),
                { body: restCommands }
            );
            log.info('=> Successfully reloaded application (/) commands.');
        }
        catch (err) {
            console.log(err);
        }
    }
};