
const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
const fs = require('fs')
module.exports.run = (client, message, args, config, color) => {
if(Math.random() > 0.75) {
            	fs.readFile(`./data/announcement.json`, function (err, announcementDat) {
                                if(err) return message.channel.send(strings.error_occured + err)

                                var announcementObj = JSON.parse(announcementDat)

                                if(announcementObj.active) {
                                    message.channel.send(`**${announcementObj.msg}**`)
                                  }
                    }) 
    }

    var embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(client.user.username + " Info")
        .addField("Owner/Creator", "[TheHacker](https://skylarmccauley.xyz)", true)
        .addField("Language", "[NodeJS](https://nodejs.org)", true)
        .addField("Library", "[DiscordJS](https://discord.js.org)", true)
        .addField("Website", "[HackerHub](https://www.hacker-hub.com)", true)
        .addField("Invite", "[Ex3cut0r Invite](https://discordapp.com/oauth2/authorize?client_id=498497197344817152&scope=bot&permissions=2146958591)", true)
        .addField("Developer", "[TheHacker](https://skylarmccauley.xyz)", true)
        .addField("Discord Bot List", "[DBL](https://discordbots.org/bot/498497197344817152)", true)
        .addField("Discord Bots", "[D.B.GG](https://discord.bots.gg/bots/498497197344817152)", true)
        .addField("Server Count", "`" + client.guilds.size + "`", true)
        .addField("Version", "`" + config.version + "`", true)
    return message.channel.send(embed)

}
module.exports.help = {
    name: "info"
}