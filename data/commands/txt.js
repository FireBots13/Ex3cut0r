const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
var embed = require("../src/utils/embed.js")
const moment = require('moment')
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
	
   fs.readFile(`./data/src/utils/filePath.json`, "utf8", function(err, fp) {
	fp = JSON.parse(fp)
	
	if(!fs.existsSync(`${fp.temp.userdata}`)) {
		fs.mkdirSync(`${fp.temp.userdata}`)
	}
	if(!fs.existsSync(`${fp.temp.userdata}/${message.author.id}`)) {
		fs.mkdirSync(`${fp.temp.userdata}/${message.author.id}`)
	}
    var text = message.content.split(' ').slice(1).join(' ')

    var noText = embed.commandHelpEmbed("Text Help", "Write Text to a `.txt` file all through " + client.user.username + ".\n\n**Example**\n`txt This is a text file`", client.user.username, client.user.displayAvatarURL, "", color)

    if(text.length < 1) return message.channel.send(noText)

    try {
        fs.writeFile(`${fp.temp.userdata}/${message.author.id}/txt.txt`, text, function(err) {
            if(err) return message.channel.send(err)
            message.channel.send('**' + message.author.tag + '**, `' + text.length +  '` characters', {file: `${fp.temp.userdata}/${message.author.id}/txt.txt`})
            return;
        })
        return;
    } catch (ex) {
        return message.channel.send(ex)
    }
    });
}
module.exports.help = {
    name: "txt"
}