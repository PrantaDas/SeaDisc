import {
    Client,
    CommandInteraction,
    GatewayIntentBits,
    Interaction,
    Message,
    Partials
} from "discord.js";
import { Command } from "./types";

export class Bot {
    private client: Client;
    private readonly botToken: string;
    private user: string;
    public collections: Set<string>;
    private slashCommands: Command[];

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
        this.client.on('interactionCreate', this.interActionHalder.bind(this));
    }

    private onReady() {
        console.log('=> Discord bot started!');
        console.log(`=> Logged in as ${this.client.user?.tag}`);
    }

    private onMessage(message: Message) {
        if (message.author.bot) return;
        this.saveUser(message.author.id);
    }

    public async start() {
        await this.client.login(this.botToken);
    }

    get discClient() {
        return this.client;
    }

    public saveUser(id: string) {
        this.user = id;
    }

    get getCollections() {
        return this.collections;
    }

    private async interActionHalder(interaction: Interaction) {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.isCommand()) {
            for (const Command of this.slashCommands) {
                if (interaction.commandName === Command.data.name) {
                    await Command.execute(interaction, this.subscriptionHandler.bind(this));
                    break;
                }
            }
        }
    }

    private async subscriptionHandler(interaction: CommandInteraction) {
        switch (interaction.commandName) {
            case 'subscribe':

                const slug = interaction.options.get('input', true).value as string;
                if (!slug) return await interaction.reply('Please provide a valid collection slug');

                if (!this.collections.has(slug)) {
                    this.collections.add(slug);
                    return await interaction.reply(`Successfully subscribed to collection ${slug}`);
                }
                break;
            case 'unsubscribe':
                const slugUn = interaction.options.get('input', true).value as string;
                if (!slugUn) return await interaction.reply('Please provide a valid collection slug');

                if (!this.collections.has(slugUn)) {
                    return await interaction.reply(`You are not subscribed to the collection ${slugUn}`);
                }

                this.collections.delete(slugUn);
                await interaction.reply(`Successfully unsubscribed collection ${slugUn}`);
                break;
            case 'collections':
                if (this.collections.size === 0) return await interaction.reply('Currenly you are not subscribed to any collections');
                await interaction.reply(`Your collections ${Array.from(this.collections).join(',')}`);

            default:
                console.log('=> Bajinga');
        }
    }

    public async sendEvent(event: any) {
        await this.client.users.cache.get(this.user)?.send(event);
    }
};

