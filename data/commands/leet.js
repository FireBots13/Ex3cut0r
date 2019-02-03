const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
var embed = require("../src/utils/embed.js")
const moment = require('moment')
const fs = require('fs')
const leet = require('leet');
module.exports.run = (client, message, args, config, color) => {

    var mode = args[1]
    var modes = ["encode", "decode"]
    var text = message.content.split(/\s+/g).slice(2).join(" ");
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
	
    var leetHelp = embed.commandHelpEmbed("Leet", "Encode  a string in Leet (1337)\n\n**Encode**\n`leet encode leet`", client.user.username, client.user.displayAvatarURL, "Generated at " + moment().format('MMMM Do YYYY, h:mm:ss a'), color)

    if(!mode) return message.channel.send(leetHelp)

    if(mode == modes[0]) {
    // encode
        try {
        	var encodedText = leet.convert(text)
            
            var rawText = "Encoded: `" + encodedText + "`\nDecoded: `" + text + "`" 
            fs.writeFile(`${fp.temp.userdata}/${message.author.id}/leet.txt`, rawText, function(err) {
            if(err) return message.channel.send(err)
            
            if(parseInt(encodedText.length) + parseInt(text.length) > 1500) return message.channel.send({message: `Leet Encoded`, file: `${fp.temp.userdata}/${message.author.id}/leet.txt`})
            var encoded = embed.basicFooterAuthorEmbed("L33t Encoded", '`' + encodedText + '`', message.author.username, message.author.displayAvatarURL,"Generated at " + moment().format('MMMM Do YYYY, h:mm:ss a'), color)
            return message.channel.send({embed: encoded, file: `${fp.temp.userdata}/${message.author.id}/leet.txt`})
            })
            return;
        } catch (ex) {
            message.channel.send(ex)
        }
        return;
    }
    if(mode == modes[1]) {
        // decode
        return message.channel.send("Decoding LEET is not supported at this time")
    }
    return message.channel.send(leetHelp)
    
    });

}
module.exports.help = {
    name: "leet",
    info: "Encode a string in leet"
}