/**
 * Discord Bot initialization script.
 * - Loads environment variables using dotenv.
 * - Ensures the required environment variables are present.
 * - Creates and starts the Discord Bot.
 * - Registers slash commands for the Discord Bot.
 * - Initializes and connects the OpenSeaClient for handling OpenSea events.
 */

import { config } from "dotenv";
config();

import { Bot } from "./bot";
import { SlashCommandRegistrar } from "./registrar";
import { CommandList } from "./commands";
import OpenSeaClient from "./opensea";
import log from "./logger";

/**
 * Array of required environment variable names.
 * @constant {string[]} ENV_VARS
 */
const ENV_VARS = ['OPENSEA_API_KEY', 'BOT_TOKEN'];


/**
 * Set containing available environment variable names.
 * @constant {Set<string>} AVAILABLE_ENV_VARS
 */
const AVAILABLE_ENV_VARS = new Set(Object.keys(process.env));


/**
 * Checks if all required environment variables are present.
 * @constant {boolean} IS_VALID_ENVS
 */
const IS_VALID_ENVS = ENV_VARS.every((key) => AVAILABLE_ENV_VARS.has(key));

/**
 * Exits the process if required environment variables are missing.
 */
if (!IS_VALID_ENVS) {
    log.error('Missing environment variables');
    process.exit(1);
}

/**
 * Discord Bot token obtained from the environment variables.
 * @constant {string} TOKEN
 */
const TOKEN = process.env.BOT_TOKEN!;

/**
 * OpenSea API key obtained from the environment variables.
 * @constant {string} OPENSEA_API_KEY
 */
const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY!;

log.info('=> All environment variables are loaded');

async function main() {
    // Initialize the BOT
    const bot = new Bot(TOKEN, CommandList);
    await bot.start();

    // Register Slash Commands
    const registarar = new SlashCommandRegistrar(bot, TOKEN, CommandList);
    await registarar.registerSlashCommand();

    // Start OpenSea Client
    const openseaClient = new OpenSeaClient(OPENSEA_API_KEY, bot);
    await openseaClient.connect();
}

/**
 * Immediately invoked function expression (IIFE) to execute the main function.
 */
(async () => await main())();