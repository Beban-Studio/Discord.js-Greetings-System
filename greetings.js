const { 
SlashCommandBuilder, 
PermissionFlagsBits, 
ChannelType, 
EmbedBuilder } = require("discord.js");
const greeting = require("./schemas/greetingModel.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("greeting")
        .setDescription("Manage the installation of the greeting feature on this server")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addSubcommand(command => 
            command.setName("enable")
            .setDescription("Enables the greeting feature for this server")
            .addChannelOption(option => 
                option.setName("channel")
                .setDescription("The channel where greeting messages are sent")
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
            )
            .addStringOption(option =>
                option.setName("welcome-image")
                .setDescription("The welcome image background url")
                .setRequired(true)
            )
        )
        .addSubcommand(command => 
            command.setName("disable")
            .setDescription("Disables the greeting feature for this server")
        ),

    async execute(interaction) {
        const { guild, options } = interaction;
        switch (options.getSubcommand()) {
            case "enable": {
                await greeting.findOne({ GuildId: guild.id }).then(async (data) => {
                    if (!data) {
                        return interaction.reply({
                            embeds: [new EmbedBuilder()
                                // .setTitle(``)
                                .setDescription(`Successfully added feature data to the database for this server.`)
                                .setColor("Green")], ephemeral: true
                        }).then(async () => {
                            await greeting.create({
                                GuildId: guild.id, ChannelId: options.getChannel("channel").id, backgroundImage: options.getString("welcome-image")
                            });
                        });
                    } else {
                        return interaction.reply({
                            embeds: [new EmbedBuilder()
                                // .setTitle(``)
                                .setDescription(`Failed to create feature data because this server has this feature installed.`)
                                .setColor("Red")], ephemeral: true
                        });
                    }
                });
            }
                break;
            case "disable": {
                await greeting.findOneAndDelete({ GuildId: guild.id }).then(async (data) => {
                    if (data) {
                        return interaction.reply({
                            embeds: [new EmbedBuilder()
                                // .setTitle(``)
                                .setDescription(`Successfully deleted feature data on this server.`)
                                .setColor("#02589C")], ephemeral: true
                        });
                    } else {
                        return interaction.reply({
                            embeds: [new EmbedBuilder()
                                // .setTitle(``)
                                .setDescription(`Failed to delete feature data because this server does not have this feature installed.`)
                                .setColor("#02589C")], ephemeral: true
                        });
                    }
                });
            }
                break;
        }
    }
}