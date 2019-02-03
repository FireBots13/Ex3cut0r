const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
var embed = require("../src/utils/embed.js")
const moment = require('moment')
const convert = require('color-convert');
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

    var randColor = ((1 << 24) * Math.random() | 0).toString(16);

    var randomcolor = embed.basicEmbed("Random Color", `**Hex** #${randColor}\n**RGB** ${convert.hex.rgb(randColor)}\n**LAB** ${convert.hex.lab(randColor)}\n**CMYK** ${convert.hex.cmyk(randColor)}`, randColor)
    return message.channel.send(randomcolor)
}
module.exports.help = {
    name: "randomcolor"
}