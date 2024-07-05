const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { Minimal } = require("greetify")
const greeting = require("./schemas/greet-schema.js");
const client = new Client({
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ],
});

client.on("guildMemberAdd", async member => {
    const welcomecard = new Minimal({
        backgroundImage: 'https://images7.alphacoders.com/333/thumb-1920-333580.jpg',
        name: member.user.username,
        avatar: member.user.displayAvatarURL({
            size: 4096 // For High Res Avatar
        }),
        type: "WELCOME",
        message: `BebanCode`,
    });
    await greeting.findOne({ GuildID: member.guild.id }).then(async (data) => {
        if (!data) return;
        if (data) {
            await client.channels.cache.get(data.ChannelID).send({
                content: `Welcome ${member}`,
                files: [{
                attachment: await welcomecard,
                name: `${member.id}.png`}]
            });
        }
    });
});

client.on('guildMemberRemove', async member => {
    const goodbyecard = new Minimal({
        backgroundImage: 'https://images7.alphacoders.com/333/thumb-1920-333580.jpg',
        name: member.user.username,
        avatar: member.user.displayAvatarURL({
            size: 4096 // For High Res Avatar
        }),
        type: "Goodbye",
        message: `BebanCode`,
    });
    await greeting.findOne({ GuildID: member.guild.id }).then(async (data) => {
        if (!data) return;
        if (data) {
            await client.channels.cache.get(data.ChannelID).send({
                content: `Goodbye ${member.user.tag}, We hope you visit us back!`,
                files: [{
                attachment: await goodbyecard,
                name: `${member.id}bye.png`}]
            });
        }
    });
});

client.login("TOKEN");
