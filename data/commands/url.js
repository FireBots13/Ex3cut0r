
const RichEmbed = require("discord.js").RichEmbed;
//const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
const embed = require("../src/utils/embed.js")
const request = require('request')
const fs = require('fs')
module.exports.run = (client, message, args, config, color) => {

    var mode = args[1]
    var modes = ['shorten', 'expand']
    var url = args[2]
    var Attachment = (message.attachments).array();

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
    var noMode = embed.commandHelpEmbed("Shorten URL", "Shorten a URL with `is.gd`\n\n**Shorten URL**\n`url shorten https://www.google.com`", client.user.username, client.user.displayAvatarURL, "", color)
    var noURL = embed.basicAuthorEmbed("No URL Provided", "Please provide a URL to shorten", message.author.username, message.author.displayAvatarURL, color)
    if(!mode) return message.channel.send(noMode)
    if(mode == modes[0]) {
        // shorten
        if(!url) return message.channel.send(noURL)
        var isGD = `https://v.gd/create.php?format=simple&url=${url}`
        try {
            request(isGD, function (error, response, body) {
            	
            fs.writeFile(`${fp.temp.userdata}/${message.author.id}/url.txt`, body, function (err) {
            var shortenedURL = embed.basicAuthorEmbed("URL Shortened Successfully", body, message.author.username, message.author.displayAvatarURL, color)

               return message.channel.send({embed: shortenedURL, file: `${fp.temp.userdata}/${message.author.id}/url.txt`});
            })
                return;
               });
               return;
        } catch (ex) {
            var error = embed.basicEmbed("An Error Occurred", ex, color)
            return message.channel.send(error)
        }
               
        return;
    }
    if(mode == modes[1]) {
        // expand
        return message.channel.send("Sorry, but there is no method of expanding URLs at this time.")
    }
    return message.channel.send(noMode)
    
    });
}
module.exports.help = {
    name: "url",
    info: "Shorten or expand a URL with is.gd"
}