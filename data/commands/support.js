
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
    
    var supportMessage = message.content.split(' ').slice(1).join(' ')
    
    var supportHelp = new Discord.RichEmbed()
                .setColor(color)
                .setTitle('Support')
                .setDescription('Send a message to the developer, whether it be a complaint about a bug, a suggestion, or just a thumbs up.\n\n**Any abuse of this system will result in your account or server being blacklisted.**')
                .setAuthor(client.user.username, client.user.displayAvatarURL)
                
	if(supportMessage.length < 1) return message.channel.send({embed: supportHelp})
	
	var dataObj = {
                message: supportMessage,
                authorTag: message.author.tag,
                authorID: message.author.id,
                guildID: message.guild.id,
                guildName: message.guild.name 
            }
            var supportContent = JSON.stringify(dataObj, null, 2)
            
	 var support = new Discord.RichEmbed()
            .setColor(color)
            .setTitle('Support Message')
            .setDescription('A suppport message has come in from ' + dataObj.authorTag)
            .addField('Message', dataObj.message)
            .addField('Author Tag', dataObj.authorTag)
            .addField('Author ID', message.author.id)
            .addField('Guild Name', message.guild.name)
            .addField('Guild ID', message.guild.id)
            message.channel.send('Support sent!\n**NOTE:** Join the HackerHub Discord Server **https://www.hacker-hub.com/social/#discord** so you can be contacted if needed')
            client.users.get("270375857384587264").send({embed: support});
            return;

    
}
module.exports.help = {
	name: "support"
}