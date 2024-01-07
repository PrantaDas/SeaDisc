import { OpenSeaStreamClient, Network, EventType } from "@opensea/stream-js";
import { WebSocket } from "ws";
import { Bot } from "./bot";
import log from "./logger";


/**
 * OpenSeaClient class for connecting to the OpenSea WebSocket stream and handling OpenSea events.
 */
export default class OpenSeaClient {
    private readonly client: OpenSeaStreamClient;
    private readonly apiKey: string;
    private bot: Bot;

    /**
     * Creates a new instance of the OpenSeaClient class.
     * @param {string} key - The OpenSea API key for authentication.
     * @param {Bot} discBot - The Discord Bot instance.
     */
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

    /**
     * Event handler for processing OpenSea events and sending notifications to subscribed users.
     * @private
     * @param {any} event - The OpenSea event received from the WebSocket stream.
     * @returns {Promise<void>} A Promise that resolves when the event is processed.
     */
    private async eventHandler(event: any): Promise<void> {
        if (!this.bot.getCollections.has(event.payload.collection.slug)) return;
        if (event.event_type === 'collection_offer') {
            return await this.bot.sendEvent(`Event type: ${event.event_type}\nhttps://opensea.io/collection/${event.payload.collection.slug}`);
        }
        return await this.bot.sendEvent(`Event type: ${event.event_type}\n${event.payload.item.permalink}`);
    }

    /**
     * Connects to the OpenSea WebSocket stream and starts listening for specified event types.
     * @public
     * @returns {Promise<void>}
     */
    public async connect(): Promise<void> {
        this.client.onEvents(
            '*',
            [
                EventType.COLLECTION_OFFER,
                EventType.ITEM_CANCELLED,
                EventType.ITEM_LISTED,
                EventType.ITEM_METADATA_UPDATED,
                EventType.ITEM_RECEIVED_BID,
                EventType.ITEM_RECEIVED_OFFER,
                EventType.ITEM_SOLD,
                EventType.ITEM_TRANSFERRED,
                EventType.ORDER_INVALIDATE,
                EventType.ORDER_REVALIDATE
            ],
            this.eventHandler.bind(this)
        );

        this.client.connect();
        log.info('=> Opensea Stream Client Initialized');
    }

    /**
     * Disconnects from the OpenSea WebSocket stream.
     * @public
     * @returns {void}
     */
    public disconnect(): void {
        this.client.disconnect();
    }

};
