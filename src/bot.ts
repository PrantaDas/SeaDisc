import {
    Client,
    CommandInteraction,
    GatewayIntentBits,
    Interaction,
    Message,
    Partials
} from "discord.js";
import { Command } from "./types";
import log from "./logger";

/**
 * Discord Bot class for handling interactions and messages.
 */
export class Bot {
    private client: Client;
    private readonly botToken: string;
    private user: string;
    public collections: Set<string>;
    private slashCommands: Command[];


    /**
     * Creates a new instance of the Bot class.
     * @param {string} token - The Discord bot token.
     * @param {Command[]} commands - An array of custom commands for the bot.
     */
    constructor(token: string, commands: Command[]) {
        this.botToken = token;
        this.user = '';
        this.collections = new Set();
        this.slashCommands = commands;
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildPresences,
            ],
            partials: [
                Partials.Channel,
                Partials.Message
            ]
        });

        this.client.once('ready', this.onReady.bind(this));
        this.client.on('messageCreate', this.onMessage.bind(this));
        this.client.on('interactionCreate', this.interactionHandler.bind(this));
    }


    /**
     * Event handler for the 'ready' event emitted when the bot is ready.
     * Logs a message indicating the bot has started.
     */
    private onReady(): void {
        log.info('=> Discord bot started!');
        log.info(`=> Logged in as ${this.client.user?.tag}`);
    }

    /**
    * Event handler for the 'messageCreate' event emitted when a message is created.
    * Saves the ID of the user who sent the message.
    * @param {Message} message - The Discord message object.
    */
    private onMessage(message: Message): void {
        if (message.author.bot) return;
        this.saveUser = message.author.id;
    }

    /**
     * Starts the Discord bot by logging in with the provided token.
     * @returns {Promise<void>} A Promise that resolves when the bot is successfully logged in.
     */
    public async start(): Promise<void> {
        await this.client.login(this.botToken);
    }

    /**
    * Getter for accessing the Discord.js client instance.
    * @returns {Client} The Discord.js client instance.
    */
    get discClient(): Client {
        return this.client;
    }

    /**
     * Setter for saving the user ID.
     * @param {string} id - The user ID to be saved.
     */
    set saveUser(id: string) {
        this.user = id;
    }

    /**
     * Getter for accessing the subscribed collections.
     * @returns {Set<string>} A Set containing the subscribed collection slugs.
     */
    get getCollections(): Set<string> {
        return this.collections;
    }

    /**
     * Handles Discord interactions, particularly slash commands.
     * @param {Interaction} interaction - The Discord interaction object.
     */
    private async interactionHandler(interaction: Interaction): Promise<void> {
        if (!interaction.isCommand()) return;
        const command = this.slashCommands.find(command => command.data.name === interaction.commandName);
        if (command) await command.execute(interaction, this.subscriptionHandler.bind(this));
    }

    /**
     * Handles subscription-related commands and updates the subscribed collections.
     * @param {CommandInteraction} interaction - The Discord command interaction object.
     */
    private async subscriptionHandler(interaction: CommandInteraction): Promise<any> {
        let slug = '';
        switch (interaction.commandName) {
            case 'subscribe':
                slug = interaction.options.get('input', true).value as string;
                if (!slug) return await interaction.reply('Please provide a valid collection slug');

                if (!this.collections.has(slug) && this.collections.add(slug)) {
                    return await interaction.reply(`Successfully subscribed to collection ${slug}`);
                }

            case 'unsubscribe':
                slug = interaction.options.get('input', true).value as string;
                if (!slug) return await interaction.reply('Please provide a valid collection slug');

                if (!this.collections.has(slug)) {
                    return await interaction.reply(`You are not subscribed to the collection ${slug}`);
                }

                this.collections.delete(slug);
                return await interaction.reply(`Successfully unsubscribed collection ${slug}`);

            case 'collections':
                if (this.collections.size === 0) return await interaction.reply('Currenly you are not subscribed to any collections');
                return await interaction.reply(`Your collections ${Array.from(this.collections).join(',')}`);

            default:
                log.info('=> Bajinga');
        }
    }


    /**
     * Sends an event to the user identified by the saved user ID.
     * @param {any} event - The event object to be sent to the user.
     */
    public async sendEvent(event: any): Promise<any> {
        await this.client.users.cache.get(this.user)?.send(event);
    }
};

