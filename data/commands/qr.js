const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
var embed = require("../src/utils/embed.js")
const request = require('request')
const fs = require('fs')
const moment = require('moment')
module.exports.run = (client, message, args, config, color) => {

    if(!fs.existsSync(`./tmp`)) {
        fs.mkdir(`./tmp`)
    }

    if(!fs.existsSync(`./tmp/${message.guild.id}`)) {
        fs.mkdir(`./tmp/${message.guild.id}`)
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
    
    var e = -1

    var data = message.content.split(' ').slice(1).join(' ')

    var encoderAPI = "https://chart.apis.google.com/chart?cht=qr&chs=547x547&choe=UTF-8&chld=H%7C0&chl="

    var noData = embed.commandHelpEmbed("QR Encoder", "Encodes data in a QR Code\n\n**Example**\n`qr https://www.google.com/`", client.user.username, client.user.displayAvatarURL, "Generated at " + moment().format('MMMM Do YYYY, h:mm:ss a'), color)
    var tooLong = embed.basicEmbed("Character Length Error", "Character Length >896 is not supported. Please try to shorten your string.", color)

    var download = function(uri, filename, callback){
        request.head(uri, function(err, res, body){
          console.log('content-type:', res.headers['content-type']);
          console.log('content-length:', res.headers['content-length']);
      
          request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
      };

    var Attachment = (message.attachments).array();

    Attachment.forEach(function(attachment) {
        e = 1 
            var filename = attachment.url.substring(attachment.url.lastIndexOf('/')+1);
            const t = Date.now()
            const lf = `./tmp/${message.guild.id}/${message.author.id}-file${t}.png`
            var fileDL = `${encoderAPI}${attachment.url}`
            console.log(fileDL)
            download(fileDL, lf, function() {
                
                return message.channel.send( filename, { file: lf})
            })
              
            return;
    });

    
    if(e < 1 && data.length > 1)  {
        encoderAPI = `${encoderAPI}${data}`
        try {
            if(data.length > 896) return message.channel.send(tooLong)
            
            download(encoderAPI, `./tmp/${message.guild.id}/${message.author.id}.png`, function(){
              message.channel.send({ file: `./tmp/${message.guild.id}/${message.author.id}.png`})
            }); 
            e = 2
            return;
      } catch (ex) {
          message.channel.send(ex)
      }
      return;
    }
    if(e <= 0 && data.length < 1) return message.channel.send(noData)
    
    
    
}
module.exports.help = {
    name: "qr",
    info: "Encodes data in a QR Code"
}
