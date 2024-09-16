const { model, Schema } = require("mongoose");

module.exports = model('botGreetings', new Schema({
    GuildId: String,
    ChannelId: String,
    backgroundImage: String,
}))
