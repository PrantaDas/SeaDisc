import { REST, Routes, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { Bot } from "./bot";
import { Command } from "./types";

export class SlashCommandRegistrar {
    private readonly client: Bot;
    private readonly botToken: string;
    private slashCommands: Command[];

    constructor(discClient: Bot, token: string, commands: Command[]) {
        this.client = discClient;
        this.botToken = token;
        this.slashCommands = commands;
    }

    public async registerSlashCommand() {
        const restCommands = this.slashCommands.map((c) => c.data);
        const rest = new REST({ version: '9' }).setToken(this.botToken);
        try {
            console.log('=> Started refreshing application (/) commands.');
            await rest.put(Routes.applicationCommands(
                this.client.discClient.user?.id!
            ),
                { body: restCommands }
            );
            console.log('=> Successfully reloaded application (/) commands.');
        }
        catch (err) {
            console.log(err);
        }
    }
};