const RichEmbed = require("discord.js").RichEmbed;
const Attachment = require("discord.js").Attachment;
const Discord = require("discord.js");
var embed = require("../src/utils/embed.js")
const moment = require('moment')
const scalc = require('scalc');
const fs = require('fs')
module.exports.run = (client, message, args, config, color) => {

  var expression = message.content.split(' ').slice(1).join(' ')
    
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
	
	
  var noExpression = embed.commandHelpEmbed("Math Help", "Calculates a math expression\n\n**Example**\n`math 2 + 2`", client.user.username, client.user.displayAvatarURL, "", color)

  if(expression.length < 1) return message.channel.send(noExpression)

  try {
  var rawText = "Expression: `" + expression + "`\nAnswer: `" + scalc(expression) + "`" 
            fs.writeFile(`${fp.temp.userdata}/${message.author.id}/math.txt`, rawText, function(err) {
            if(err) return message.channel.send(err)
            
            if(parseInt(expression.length) + parseInt(scalc(expression).length) > 1500) return message.channel.send({message: `Math Expression Calculated`, file: `${fp.temp.userdata}/${message.author.id}/math.txt`})
        	
    var calculatedExpression = embed.basicFooterAuthorEmbed("Math Expression Calculated", "`" + scalc(expression) + "`", message.author.username, message.author.displayAvatarURL, "", color)

    return message.channel.send({ embed: calculatedExpression, file: `${fp.temp.userdata}/${message.author.id}/math.txt`});
    });
    return;
  } catch (ex) {
      var invalidExpression = embed.basicFooterAuthorEmbed("Invalid Expression", "`" + ex + "`", message.author.username, message.author.displayAvatarURL, "", color)
      return message.channel.send(invalidExpression)
  }
  });

}
module.exports.help = {
    name: "math",
    info: "Solve math problem",
    usage: "math <equation>"
}