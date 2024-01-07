import { OpenSeaStreamClient, Network, EventType } from "@opensea/stream-js";
import { Bot } from "./bot";
import { WebSocket } from "ws";

export default class OpenSeaClient {
    private readonly client: OpenSeaStreamClient;
    private readonly apiKey: string;
    private bot: Bot;

    constructor(key: string, discBot: Bot) {
        this.apiKey = key;
        this.bot = discBot;
        this.client = new OpenSeaStreamClient({
            token: this.apiKey,
            network: Network.MAINNET,
            connectOptions: {
                transport: WebSocket
            }
        });
    }

    private async eventHandler(event: any) {
        // console.log(this.bot.getCollections);
        if (!this.bot.getCollections.has(event.payload.collection.slug)) return;
        if (event.event_type === 'collection_offer') {
            return await this.bot.sendEvent(`Event type: ${event.event_type}\nhttps://opensea.io/collection/${event.payload.collection.slug}`);
        }
        else return await this.bot.sendEvent(`Event type: ${event.event_type}\n${event.payload.item.permalink}`);
    }

    public async connect() {
        this.client.onEvents(
            '*',
            [
                EventType.COLLECTION_OFFER, EventType.ITEM_CANCELLED, EventType.ITEM_LISTED, EventType.ITEM_METADATA_UPDATED, EventType.ITEM_RECEIVED_BID, EventType.ITEM_RECEIVED_OFFER, EventType.ITEM_SOLD, EventType.ITEM_TRANSFERRED, EventType.ORDER_INVALIDATE, EventType.ORDER_REVALIDATE
            ],
            this.eventHandler.bind(this)
        );

        this.client.connect();
    }

    public disconnect(): void {
        this.client.disconnect();
    }

};
