const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
var embed = require("../src/utils/embed.js")
const moment = require('moment')
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
	
   fs.readFile(`./data/src/utils/filePath.json`, "utf8", function(err, fp) {
	fp = JSON.parse(fp)
	
	if(!fs.existsSync(`${fp.temp.userdata}`)) {
		fs.mkdirSync(`${fp.temp.userdata}`)
	}
	if(!fs.existsSync(`${fp.temp.userdata}/${message.author.id}`)) {
		fs.mkdirSync(`${fp.temp.userdata}/${message.author.id}`)
	}
	if(!fs.existsSync(`${fp.temp.userdata}/${message.author.id}/write`)) {
		fs.mkdirSync(`${fp.temp.userdata}/${message.author.id}/write`)
	}
	
	var fileName = args[1]
	var text = message.content.split(/\s+/g).slice(2).join(" ");

    var noText = embed.commandHelpEmbed("Write Help", "Write a file of your choosing (ie; `txt` `json` `html`)\n\n**Example:**\n`write file.txt This is a text file`", client.user.username, client.user.displayAvatarURL, "", color)

    if(text.length < 1) return message.channel.send(noText)
    if(!fileName) return message.channel.send(fileName)
    
    if(fileName.length > 22) return message.channel.send("**Cannot make a file with the name and extension of **`" + fileName + "`")

	if(fileName.startsWith(`.`)) {
		fileName = fileName.substring(fileName.length+1, 0);
	}
	if(fileName.endsWith(`.`)) {
		fileName = fileName.substring(0, fileName.length-1);
	}
	fileName = fileName.replace(/\s/g,'')
	fileName = fileName.replace(/[/\\?%*:|"<>]/g, '-');
	//text = text.replace(/\s/g,'')
	//message.channel.send(/[a-z]/i.test(fileName))
	if(/[a-z]/i.test(fileName)) {
		
	try {
		fs.writeFile(`${fp.temp.userdata}/${message.author.id}/write/${fileName}`, text, function(err) {
		
		var writeSuccess = new Discord.RichEmbed()
			.setColor(color)
			.setTitle("Wrote File")
			.setDescription("**File Name:** `" + fileName + "`\n**Text:** `" + text + "`")
			.setAuthor(message.author.username, message.author.displayAvatarURL)
			
			if(parseInt(parseInt(fileName.length) + parseInt(text.length)) > 1800) return message.channel.send({file: `${fp.temp.userdata}/${message.author.id}/write/${fileName}`})
			
			message.channel.send({embed: writeSuccess, file: `${fp.temp.userdata}/${message.author.id}/write/${fileName}`})
		return;
		})
		return;
	} catch(ex) {
		return message.channel.send(ex)
	}
	
	return;
	}
	return message.channel.send("Filename or data incompatible\n**FileName** " + fileName + "\n**Data** " + text + "\n\nPlease try again.")
	});
}
module.exports.help = {
	name: "write"
}