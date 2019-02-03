const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
var embed = require("../src/utils/embed.js")
const moment = require('moment')
const fs = require('fs')
module.exports.run = (client, message, args, config, color) => {
    
    var mode = args[1]
    var modes = ["encode", "decode"]
    var text = message.content.split(/\s+/g).slice(2).join(" ");
    
fs.readFile(`./data/src/utils/filePath.json`, "utf8", function(err, fp) {
	fp = JSON.parse(fp)
	
	if(!fs.existsSync(`${fp.temp.userdata}`)) {
		fs.mkdirSync(`${fp.temp.userdata}`)
	}
	if(!fs.existsSync(`${fp.temp.userdata}/${message.author.id}`)) {
		fs.mkdirSync(`${fp.temp.userdata}/${message.author.id}`)
	}
	
	if(Math.random() > 0.75) {
            	fs.readFile(`./data/announcement.json`, function (err, announcementDat) {
                                if(err) return message.channel.send(strings.error_occured + err)

                                var announcementObj = JSON.parse(announcementDat)

                                if(announcementObj.active) {
                                    message.channel.send(`**${announcementObj.msg}**`)
                                  }
                    }) 
    }
	
    var noMode = embed.commandHelpEmbed("Base64", "Encode or Decode a string in Base64\n\n**Encode Text**\n`base64 encode https://www.hacker-hub.com/`\n**Decode Text**\n`base64 decode aHR0cHM6Ly93d3cuaGFja2VyLWh1Yi5jb20v`", client.user.username, client.user.displayAvatarURL, "",color)
	
	
    if(!mode) {
    try {
    return message.channel.send(noMode)
    } catch (ex) {
	return message.channel.send(ex)
     }
     }

    
    try {
    if(mode == modes[0]) {
        // encode
        if(text.length < 1) return message.channel.send(noMode)

        var buff = new Buffer(text)

            buff = buff.toString('base64');
		var rawText = "Encoded: `" + buff + "`\nDecoded: `" + text + "`";
		 
		 try {
		 fs.writeFile(`${fp.temp.userdata}/${message.author.id}/base64.txt`, rawText, function(err) {
		 	 var encoded = embed.basicFooterAuthorEmbed("Encoded Base64 String", "**Decoded** - `" + text + "`\n\n**Encoded** - `" + buff + "`", message.author.username, message.author.displayAvatarURL, "Generated at " + moment().format('MMMM Do YYYY, h:mm:ss a'), color)
            return message.channel.send({embed: encoded, file: `${fp.temp.userdata}/${message.author.id}/base64.txt`})   
		 
		 });
		 } catch (ex) {
		 	return message.channel.send(ex)
		 }
		 
		 return;
                  
    }
     if(mode == modes[1]) {
        // decode
        if(text.length < 1) return message.channel.send(noMode)

        var buff = new Buffer(text, 'base64'); 

        buff = buff.toString('ascii');
        
        var rawText = "Decoded: `" + text + "`\nEncoded: `" + buff + "`";
        
        try {
        	fs.writeFile(`${fp.temp.userdata}/${message.author.id}/base64.txt`, rawText, function(err) {
        	if(err) return message.channel.send(err)
        	
        	if(parseInt(buff.length) + parseInt(text.length) > 1500) return message.channel.send({message: `Base64 Decoded`, file: `${fp.temp.userdata}/${message.author.id}/base64.txt`})
        	
        	var decoded = embed.basicFooterAuthorEmbed("Decoded Base64 String", "**Encoded** - `" + buff + "`\n\n**Decoded** - `" + text + "`", message.author.username, message.author.displayAvatarURL, "Generated at " + moment().format('MMMM Do YYYY, h:mm:ss a'), color)
        return message.channel.send({embed: decoded, file: `${fp.temp.userdata}/${message.author.id}/base64.txt`})
        })
        } catch (ex) {
        	return message.channel.send(ex)
        }
        
        return;
    }
    if(mode !== modes[0] && mode !== modes[1]) return message.channel.send(noMode);
    } catch (ex) {
    	return message.channel.send(ex)
    }
   

})
}
module.exports.help = {
    name: "base64",
    info: "Encode & Decode data in Base64"
}