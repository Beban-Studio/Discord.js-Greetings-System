const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { Minimal } = require("greetify")
const greeting = require("./schemas/greet-schema.js");
const client = new Client({
    partials: [
        Partials.Message,
        Partials.Channel,
    ],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
});

client.on("guildMemberAdd", async member => {
    await greeting.findOne({ GuildID: member.guild.id }).then(async (data) => {
        if (!data) return;
        if (data) {
            const welcomecard = new Minimal({
                // circleBorder: , #boolean
                // messageColor: ,
                // nameColor: ,
                // typeColor,
                backgroundImage: data.backgroundImage,
                name: member.user.username,
                avatar: member.user.displayAvatarURL({
                    size: 4096 // For High Res Avatar
                }),
                type: "WELCOME",
                message: `BebanCode`,
            });
            await client.channels.cache.get(data.ChannelId).send({
                content: `Welcome ${member}`,
                files: [{
                attachment: await welcomecard,
                name: `${member.id}.png`}]
            });
        }
    });
});

client.on('guildMemberRemove', async member => {
    await greeting.findOne({ GuildID: member.guild.id }).then(async (data) => {
        if (!data) return;
        if (data) {
            const goodbyecard = new Minimal({
                // circleBorder: , #boolean
                // messageColor: ,
                // nameColor: ,
                // typeColor,
                backgroundImage: data.backgroundImage,
                name: member.user.username,
                avatar: member.user.displayAvatarURL({
                    size: 4096 // For High Res Avatar
                }),
                type: "GOODBYE",
                message: `BebanCode`,
            });
            await client.channels.cache.get(data.ChannelId).send({
                content: `Goodbye ${member.user.tag}, We hope you visit us back!`,
                files: [{
                attachment: await goodbyecard,
                name: `${member.id}bye.png`}]
            });
        }
    });
});

client.login("PUT_YOUR_BOT_TOKEN_HERE");
