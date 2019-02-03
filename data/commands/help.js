
const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
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
    
        var embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(client.user.username + " Help")
        .setDescription('`help` - Get documentation on ' + client.user.username + '\'s commands\n' + 
                        '`info` - Info about the bot\n' +
                        '`qr` - Encode your message or an attachment in a QR Code\n' +
                        '`binary` - Encode & Decode your message in Binary\n' +
                        '`base64` - Encode & Decode your message in Base64\n' +
                        '`leet` - Encode your message in 1337\n' +
                        '`inspect` - Inspect different types of URLs\n' +
                        '`math` - Calculate math expressions\n' +
                        '`morsecode` - Encode text in morscode\n' +
                        '`pastebin` - Create a new pastebin through Executor\n' +
                        '`randomcolor` - Generate a random color\n' +
                        '`reverse` - Reverse text\n' +  
                        '`rot` - Encode a string with ROT1 thru ROT25\n' +
                        '`sha1` - Encode a string with SHA1 Checksum\n' +
                        '`sha256` - Encode a string with SHA256 Checksum\n' +
                        '`md5` - Encode a string with MD5 Checksum\n'+
                        '`url` - Shorten a URL\n' +
                        '`write` - Write a string to a file')
                        return message.channel.send(embed)
    
}
module.exports.help = {
    name: "help",
    info: "Help command"
}