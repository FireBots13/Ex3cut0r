
const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
module.exports.run = (client, message, args, config, color) => {

        var embed = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(client.user.username + " Help")
        .setDescription(client.user.username + ' is a WIP bot.\n' +
                        '`help` - Get documentation on ' + client.user.username + '\'s commands\n' + 
                        '`info` - Info about the bot\n' +
                        '`qr` - Encode your message or an attachment in a QR Code\n' +
                        '`binary` - Encode & Decode your message in Binary\n' +
                        '`base64` - Encode & Decode your message in Base64\n' +
                        '`leet` - Encode your message in 1337\n' +
                        '`inspect` - Inspect different types of URLs\n' +
                        '`math` - Calculate math expressions\n' +
                        '`morsecode` - Encode text in morscode\n' +
                        '`randomcolor` - Generate a random color' +
                        '`reverse` - Reverse text\n' +  
                        '`url` - Shorten a URL')
                        return message.channel.send(embed)
    
}
module.exports.help = {
    name: "help",
    info: "Help command"
}