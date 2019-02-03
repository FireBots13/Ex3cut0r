const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
var embed = require("../src/utils/embed.js")
const moment = require('moment')
const fs = require('fs')
const crypto = require('crypto')
  , shasum = crypto.createHash('sha1');
module.exports.run = (client, message, args, config, color) => {
	var text = message.content.split(' ').slice(1).join(' ')
	
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
	
	    var sha1Help = embed.commandHelpEmbed("SHA1", "Encode  a string in SHA1 Checksum\n\n**Example**\n`sha1 p@55w0rd`", client.user.username, client.user.displayAvatarURL, "Generated at " + moment().format('MMMM Do YYYY, h:mm:ss a'), color)
	    
	    if(text.length < 1) return message.channel.send(sha1Help)
	    
	    var getSHA1ofJSON = function(input){
    return crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex')
}
	    
	    const sha1 = getSHA1ofJSON(text)
	    
	    var rawText = "Encoded: `" + sha1 + "`\nDecoded: `" + text + "`"
	    
	    fs.writeFile(`${fp.temp.userdata}/${message.author.id}/sha1.txt`, rawText, function(err) {
            if(err) return message.channel.send(err)
            
            	 if(parseInt(sha1.length) + parseInt(text.length) > 1500) return message.channel.send({file: `SHA1 Encoded`, file: `${fp.temp.userdata}/${message.author.id}/sha1.txt`})         
        
            var encoded = embed.basicFooterAuthorEmbed("SHA1 Encoded", '`' + sha1 + '`', message.author.username, message.author.displayAvatarURL,"Generated at " + moment().format('MMMM Do YYYY, h:mm:ss a'), color)
            return message.channel.send({embed: encoded, file: `${fp.temp.userdata}/${message.author.id}/sha1.txt`})
            })
            return;
	
});

}
module.exports.help = {
	name: "sha1"
}