/**
 * Defines WebSocket endpoints for different blockchain networks.
 * @constant {Object} ENDPOINTS
 * @property {string} MAINNET - WebSocket endpoint for the Ethereum Mainnet.
 * @property {string} TESTNET - WebSocket endpoint for the Ethereum Testnet.
 */

import { Network } from "./types";

export const ENDPOINTS = {
    [Network.MAINNET]: 'wss://stream.openseabeta.com/socket',
    [Network.TESTNET]: 'wss://testnets-stream.openseabeta.com/socket'
};