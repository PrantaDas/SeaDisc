import { OpenSeaStreamClient, Network, EventType } from "@opensea/stream-js";
import { Bot } from "./bot";
import { WebSocket } from "ws";

export default class OpenSeaClient {
    private readonly client: OpenSeaStreamClient;
    private readonly apiKey: string;
    private readonly bot: Bot;

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

    private eventHandler(event: any) {
        // console.log(event);
    }

    public connect() {
        this.client.onEvents(
            '*',
            [
                EventType.COLLECTION_OFFER, EventType.ITEM_CANCELLED, EventType.ITEM_LISTED, EventType.ITEM_METADATA_UPDATED, EventType.ITEM_RECEIVED_BID, EventType.ITEM_RECEIVED_OFFER, EventType.ITEM_SOLD, EventType.ITEM_TRANSFERRED, EventType.ORDER_INVALIDATE, EventType.ORDER_REVALIDATE
            ],
            this.eventHandler
        );

        this.client.connect();
    }

    public disconnect(): void {
        this.client.disconnect();
    }

};
