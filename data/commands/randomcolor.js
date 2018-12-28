const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
var embed = require("../src/utils/embed.js")
const moment = require('moment')
const convert = require('color-convert');

module.exports.run = (client, message, args, config, color) => {

    var randColor = ((1 << 24) * Math.random() | 0).toString(16);

    var randomcolor = embed.basicEmbed("Random Color", `**Hex** #${randColor}\n**RGB** ${convert.hex.rgb(randColor)}\n**LAB** ${convert.hex.lab(randColor)}\n**CMYK** ${convert.hex.cmyk(randColor)}`, randColor)
    return message.channel.send(randomcolor)
}
module.exports.help = {
    name: "randomcolor"
}