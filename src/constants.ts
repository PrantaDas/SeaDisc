import { Network } from "./types";

export const ENDPOINTS = {
    [Network.MAINNET]: 'wss://stream.openseabeta.com/socket',
    [Network.TESTNET]: 'wss://testnets-stream.openseabeta.com/socket'
};