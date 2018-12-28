
const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
module.exports.run = (client, message, args, config, color) => {

    var embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(client.user.username + " Info")
        .setDescription(client.user.username + " is a WIP bot")
        .addField("Owner/Creator", "[TheHacker](https://skylarmccauley.xyz)", true)
        .addField("Language", "[NodeJS](https://nodejs.org)", true)
        .addField("Library", "[DiscordJS](https://discord.js.org)", true)
        .addField("Server Count", "`" + client.guilds.size + "`", true)
        .addField("Version", "`" + config.version + "`", true)
    return message.channel.send(embed)

}
module.exports.help = {
    name: "info"
}