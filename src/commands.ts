import { SlashCommandBuilder } from "@discordjs/builders";

export const COMMANDS = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),

    new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with Hi!'),

    new SlashCommandBuilder()
        .setName('subscribe')
        .setDescription('Subscribe a collection to get events.Eg: /subscribe boardapes'),

    new SlashCommandBuilder()
        .setName('unsubscribe')
        .setDescription('Unsubscribe a collection to get events.Eg: /unsubscribe boardapes')
];