import {
    Client,
    GatewayIntentBits,
    Message,
    Partials
} from "discord.js";

export class Bot {
    private client: Client;
    private readonly botToekn: string;
    private user: string;
    public collections: Set<string>;

    constructor(token: string) {
        this.botToekn = token;
        this.user = '';
        this.collections = new Set();
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
    }

    private onReady() {
        console.log('=> Discord bot started!');
        console.log(`=> Logged in as ${this.client.user?.tag}`);
    }

    private onMessage(message: Message) {
        if (message.author.bot) return;
        this.saveUser(message.author.id);
        console.log(this.user);
        console.log(message);
    }

    public async start() {
        await this.client.login(this.botToekn);
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
};

