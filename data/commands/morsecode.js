const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
var embed = require("../src/utils/embed.js")
const moment = require('moment')
const fs = require('fs')
const morse = require('morse');

module.exports.run = (client, message, args, config, color) => {

    if(!fs.existsSync(`./data/userdata`)) {
        fs.mkdirSync(`./data/userdata`)
    }
    if(!fs.existsSync(`./data/userdata/${message.author.id}`)) {
        fs.mkdirSync(`./data/userdata/${message.author.id}`)
    }
    
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

    var mode = args[1]
    var modes = ['encode', 'decode']
    var text = message.content.split(/\s+/g).slice(2).join(" ");

    var noMode = embed.commandHelpEmbed("MorseCode Help", "Encode or Decodee any text in MorseCode\n\n**Encode**\n`morsecode encode TheHacker is a Freelancer`\n\n**Decode**\n`morsecode decode .... . .... .- -.-. -.- . .-. / .. ... / .- / ..-. .-. . . .-.. .- -. -.-. . .-.`", client.user.username, client.user.displayAvatarURL, "", color)

    if(!mode) return message.channel.send(noMode)

    if(mode == modes[0]) {
        //encode
        if(text.length < 1) return message.channel.send(noMode)
        try {
        var rawText = "Encoded `" + morse.encode(text) + "`\nDecoded: `" + text + "`"
            fs.writeFile(`${fp.temp.userdata}/${message.author.id}/morsecode.txt`, rawText, function(err) {
                if(err) return message.channel.send(err)
                
                  if(parseInt(morse.encode(text).length) + parseInt(text.length) > 1500) return message.channel.send({file: `Morsecode Encoded`, file: `${fp.temp.userdata}/${message.author.id}/moresecode.txt`})         
         
        var encode = embed.basicFooterAuthorEmbed("Encoded MorseCode", "**Encoded** - `" + morse.encode(text) + "`\n**Decoded** - `" + text + '`', message.author.name, message.author.displayAvatarURL, "Generated at " + moment().format('MMMM Do YYYY, h:mm:ss a'), color)
        
        return message.channel.send({ embed: encode, file: `${fp.temp.userdata}/${message.author.id}/morsecode.txt`})
            })
        } catch (ex) {
            return message.channel.send(ex)
        }
        
        return;
    }
    if(mode == modes[1]) {
        //decode
        if(text.length < 1) return message.channel.send(noMode)
        
        try {
        
        var rawText = "Decoded: `" + morse.decode(text) + "`\nEncoded: `" + text + "`"
            fs.writeFile(`${fp.temp.userdata}/${message.author.id}/morsecode.txt`, rawText, function(err) {
                if(err) return message.channel.send(err)
                
     if(parseInt(morse.decode(text).length) + parseInt(text.length) > 1500) return message.channel.send({file: `Morsecode Decoded`, file: `${fp.temp.userdata}/${message.author.id}/moresecode.txt`})         
         
        var decode = embed.basicFooterAuthorEmbed("Decoded MorseCode", "**Decoded** - `" + morse.decode(text) + "`\n**Encoded** - `" + text + '`', message.author.name, message.author.displayAvatarURL, "Generated at " + moment().format('MMMM Do YYYY, h:mm:ss a'), color)
        
        return message.channel.send({ embed: decode, file: `${fp.temp.userdata}/${message.author.id}/morsecode.txt`})
       
                   return;
            })
        } catch (ex) {
            return message.channel.send(ex)
        }
        return;
    }
    return message.channel.send(noMode)
    });
}
module.exports.help = {
    name: "morsecode"
}