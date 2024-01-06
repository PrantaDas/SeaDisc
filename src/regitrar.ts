import { REST, Routes, SlashCommandBuilder } from "discord.js";
import { Bot } from "./bot";

export class SlashCommandRegistrar {
    private readonly client: Bot;
    private readonly botToken: string;
    private slashCommands: SlashCommandBuilder[];

    constructor(discClient: Bot, token: string, commands: SlashCommandBuilder[]) {
        this.client = discClient;
        this.botToken = token;
        this.slashCommands = commands;
    }

    public async registerSlashCommand() {
        const botCommands = this.slashCommands.map((command) => command.toJSON());
        const rest = new REST({ version: '9' }).setToken(this.botToken);

        try {
            console.log('=> Started refreshing application (/) commands.');
            await rest.put(Routes.applicationCommands(
                this.client.discClient.user?.id!
            ),
                { body: botCommands }
            );
            console.log('=> Successfully reloaded application (/) commands.');
        }
        catch (err) {
            console.log(err);
        }
    }
};