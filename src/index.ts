import { config } from "dotenv";
config();

import { Bot } from "./bot";
import { SlashCommandRegistrar } from "./registrar";
import { COMMANDS } from "./commands";
import OpenSeaClient from "./opensea";
import { Network } from "./types";


const ENV_VARS = ['OPENSEA_API_KEY', 'BOT_TOKEN'];

const AVAILABLE_ENV_VARS = new Set(Object.keys(process.env));

const IS_VALID_ENVS = ENV_VARS.every((key) => AVAILABLE_ENV_VARS.has(key));

if (!IS_VALID_ENVS) {
    console.log('Missing environment variables');
    process.exit(1);
}

const TOKEN = process.env.BOT_TOKEN!;
const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY!;

console.log('=> All environment variables are loaded');

async function main() {
    const bot = new Bot(TOKEN);
    await bot.start();
    const registarar = new SlashCommandRegistrar(bot, TOKEN, COMMANDS);
    await registarar.registerSlashCommand();
    const openseaClient = new OpenSeaClient(OPENSEA_API_KEY, bot);
    openseaClient.connect();
}

(async () => {
    await main();
})();