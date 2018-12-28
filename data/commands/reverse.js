const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
var embed = require("../src/utils/embed.js")
const moment = require('moment')
const fs = require('fs')
module.exports.run = (client, message, args, config, color) => {

fs.readFile(`./data/src/utils/filePath.json`, "utf8", function(err, fp) {
	fp = JSON.parse(fp)
	
	if(!fs.existsSync(`${fp.temp.userdata}`)) {
		fs.mkdirSync(`${fp.temp.userdata}`)
	}
	if(!fs.existsSync(`${fp.temp.userdata}/${message.author.id}`)) {
		fs.mkdirSync(`${fp.temp.userdata}/${message.author.id}`)
	}
	function reverse(s){
    return s.split("").reverse().join("");
}

    var text = message.content.split(' ').slice(1).join(' ')

    var noText = embed.commandHelpEmbed("Reverse Help", "Reverse texts through unicode\n\n**Example**\n`reverse Reverse this text`", client.user.username, client.user.displayAvatarURL, "", color)

    if(text.length < 1) return message.channel.send(noText)

    try {
    
    var rawText = "Reversed: `" + reverse(text) + "`\nNon-Reversed: `" + text + "`"
    fs.writeFile(`${fp.temp.userdata}/${message.author.id}/reverse.txt`, rawText, function(err) {
        return message.channel.send("`" + reverse(text) + "`", {file: `${fp.temp.userdata}/${message.author.id}/reverse.txt`})
        });
    } catch (ex) {
        return message.channel.send(ex)
    }
});
}
module.exports.help = {
    name: "reverse"
}