const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
var embed = require("../src/utils/embed.js")
const fs = require('fs')
const moment = require('moment')
module.exports.run = (client, message, args, config, color) => {

    var rotVer = args[1] // 1 - 25
    var mode = args[2]
	
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
    var modes = ["encode", "decode"]
    var text = message.content.split(/\s+/g).slice(3).join(" ");

 function rot(s, i) {
    return s.replace(/[a-zA-Z]/g, function (c) {
        return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + i) ? c : c - 26);
    });
}

    var noMode = embed.commandHelpEmbed("Rot", "Encode a string using the Rot method\n\n**Encode**\n`rot 13 encode rot13.com`\n\n**Decode**\n`rot 13 decode rot13.com`\n\nEx3cut0r supports encoding from Rot1 through Rot25. For example, `rot 13` -> Rot13 and `rot 8` -> Rot8", client.user.username, client.user.displayAvatarURL, "", color)
    var invalidRot = embed.basicEmbed("Invalid Rot Provided", "Ex3cut0r only supports Rot1 through Rot25", color)
    if(!mode) return message.channel.send(noMode)

    rotVer = parseInt(rotVer)
    if(isNaN(rotVer)) return message.channel.send(invalidRot)
    if(rotVer < 1 || rotVer > 25) return message.channel.send(invalidRot)

    if(mode == modes[0]) {
        // encode
        if(text.length < 1) return message.channel.send(noMode);
        
        try {
        var rawData = `Encoded: ${rot(text, rotVer)}\nDecoded: ${text}`
        	fs.writeFile(`${fp.temp.userdata}/${message.author.id}/rot.txt`, rawData, function(err) {
        	
        	 if(parseInt(rot(text, rotVer).length) + parseInt(text.length) > 1500) return message.channel.send({file: `Morsecode Encoded`, file: `${fp.temp.userdata}/${message.author.id}/rot.txt`})         
        
        	
        var encoded = embed.basicFooterAuthorEmbed("Encoded Rot " + rotVer, "**Encoded**\n`" + rot(text, rotVer) + '`\n\n**Decoded**\n`' + text + '`', message.author.username, message.author.displayAvatarURL, "Generated at " + moment().format('MMMM Do YYYY, h:mm:ss a'), color);
		
		return message.channel.send({ embed: encoded, file: `${fp.temp.userdata}/${message.author.id}/rot.txt`})
	});
	return;
        } catch(ex) {
        	return message.channel.send(ex)
        }
       return;   
	}
    if(mode == modes[1]) {
        // decode
        return message.channel.send("Sorry, but decoding rot is not supported at this time")
    }
    if(mode !== modes[0] || mode !== modes[1]) return message.channel.send(noMode)
});
}
module.exports.help = {
    name: "rot"
}
