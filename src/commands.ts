import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "./types";

const ping: Command = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong'),
    execute: async (interaction) => {
        await interaction.reply('pong');
    }
};

const hello: Command = {
    data: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with hello (greetings)'),
    execute: async (interaction) => {
        await interaction.reply(`Hey there <@${interaction.user.id}>, how are you doing?`)
    }
};

const subscribe: Command = {
    data: new SlashCommandBuilder()
        .setName('subscribe')
        .setDescription('Subscribe a collection to get events.Eg: /subscribe boardapes')
        .addStringOption((option) =>
            option.setName('input')
                .setDescription('Replies with a successful subscription')
        ),
    execute: async (interaction, callback) => {
        if (callback) {
            await callback(interaction);
        }
    }
};

const unsubscribe: Command = {
    data: new SlashCommandBuilder()
        .setName('unsubscribe')
        .setDescription('Unsubscribe a collection to get events.Eg: /unsubscribe boardapes')
        .addStringOption((option) =>
            option.setName('input')
                .setDescription('Replies with a successful unsubscription message')
        ),
    execute: async (interaction, callback) => {
        if (callback) {
            await callback(interaction);
        }
    }
};

const collections: Command = {
    data: new SlashCommandBuilder()
        .setName('collections')
        .setDescription('Get all subscribed collections'),
    execute: async (interaction, callback) => {
        if (callback) {
            await callback(interaction);
        }
    }
};

export const CommandList: Command[] = [ping, hello, subscribe, unsubscribe, collections];