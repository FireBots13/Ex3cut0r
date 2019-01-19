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
	
    var binaryHelp = embed.commandHelpEmbed("Binary", "Encode or Decode a string in Binary\n\n" +
                                        "**Encode Text**\n" +
                                        "`binary encode lol`\n" +
                                        "**Decode Text**\n" +
                                        "`binary decode 01101100 01101111 01101100`", client.user.username, client.user.displayAvatarURL, "",color)
    if(!mode) return message.channel.send(binaryHelp)
    
    var asciiToBin = (function () {
        var pad = '00000000';
    
        return function (str) {
            return str.replace(/./g, function (c) {
                var bin = c.charCodeAt(0).toString(2);
                return pad.substring(bin.length) + bin;
            });
        };
    }());

    var binToAscii = function (bin) {
        return bin.replace(/[01]{8}/g, function (v) {
            return String.fromCharCode(parseInt(v, 2));
        });
    };

    if(mode == modes[0]) {
        // Encode
        if(!text) return message.channel.send(binaryHelp)
        
        var rawText = "Encoded: `"+ asciiToBin(text) + "`\nDecoded: `" + text + "`"
        
        try {

             fs.writeFile(`${fp.temp.userdata}/${message.author.id}/binary.txt`, rawText, function(err) {
         
         if(parseInt(binToAscii(text).length) + parseInt(text.length) > 1500) return message.channel.send({file: `Binary Encoded`, file: `${fp.temp.userdata}/${message.author.id}/binary.txt`})         
         
        var encode = embed.basicFooterAuthorEmbed("Encoded Binary", "**Encoded** - `" + asciiToBin(text) + "`\n**Decoded** - `" + text + '`', message.author.name, message.author.displayAvatarURL, "Generated at " + moment().format('MMMM Do YYYY, h:mm:ss a'), color)
        return message.channel.send({ embed: encode, file: `${fp.temp.userdata}/${message.author.id}/binary.txt`})
        });
        } catch (ex) {
        	return message.channel.send(ex)
        }
    
        return;
    }
    if(mode == modes[1]) {
    //Decoded
        if(!text) return message.channel.send(binaryHelp)
        
        var rawText = "Encoded:  `" + binToAscii(text) +  "`\nDecoded: `" + text + "`"
        
        try {
        	fs.writeFile(`${fp.temp.userdata}/${message.author.id}/binary.txt`, rawText, function(err) {
        	
        	if(parseInt(binToAscii(text).length) + parseInt(text.length) > 1500) return message.channel.send({message: `Binary Decoded`, file: `${fp.temp.userdata}/${message.author.id}/binary.txt`})
        	
        	var decoded = embed.basicFooterAuthorEmbed("Decoded Binary", "**Decoded** - `" + binToAscii(text) + "`\n**Encoded** - `" + text+ '`', message.author.name, message.author.displayAvatarURL, "Generated at " + moment().format('MMMM Do YYYY, h:mm:ss a'), color)
        return message.channel.send({embed: decoded, file: `${fp.temp.userdata}/${message.author.id}/binary.txt`})
        });
        } catch (ex) {
			return message.channel.send(ex)        
        } 
        return;
    }
    return message.channel.send(binaryHelp)
    
   });

}
module.exports.help = {
    name: "binary",
    info: "Encode & Decode a string in binary"
}