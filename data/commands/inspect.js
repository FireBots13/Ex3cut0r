
const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require('boxen');
const fs = require('fs')
const vui = require('video-url-inspector');
module.exports.run = (client, message, args, config, color) => {

var option = args[1];
const inspections = ['invite', 'video']
var item = message.content.split(/\s+/g).slice(2).join(" ");

var noArgs = new Discord.RichEmbed()
    .setColor(color)
    .setTitle('Inspect Help')
    .setDescription('**Inspect Discord Invites**\n' +
                    '`inspect invite https://discord.gg/skRyTVw`\n' +
                    '**Inpsect Video URLs**\n' +
                    '`inspect video https://www.youtube.com/watch?v=dQw4w9WgXcQ`\n' +
                    '**Inspect URLs**\n' +
                    'Coming Soon:tm:')

if(!option || !item) return message.channel.send({embed: noArgs})

    if(option == inspections[0]) {
        var noInvURL = new Discord.RichEmbed()
            .setColor(color)
            .setTitle('No Invite URL')
            .setDescription('No Invite URL Provided')
        if(!item) return message.channel.send({embed: noInvURL})
        try {
            client.fetchInvite(item).then(invite => {
                var tcCount = parseFloat(invite.textChannelCount)
                var vcCount = parseFloat(invite.voiceChannelCount)
                var channelCount = parseFloat(vcCount + tcCount)
                var fetchedInvite = new Discord.RichEmbed()
                    .setColor(color)
                    .setTitle('Invite Fetched')
                    .setDescription('**Channel**: `' + invite.channel + '`'+ invite.channel +'\n' +
                                    '**Client**: `' + invite.client + '`\n' +
                                    '**Code**: `' + invite.code + '`\n' +
                                    '**CreatedAt**: `' + invite.createdAt + ' | '+ invite.createdTimestamp +'`\n' +
                                    '**ExpiresAt**: `' + invite.expiresAt + ' | '+ invite.expiresTimestamp + '`\n' +
                                    '**Guild**: `' + invite.guild + '`\n' +
                                    '**Inviter**: `' + invite.inviter + '`'+ invite.inviter +'\n' +
                                    '**MaxAge**: `' + invite.maxAge + '`\n' +
                                    '**MemberCount**: `' + invite.memberCount + '`\n' +
                                    '**PresenceCount**: `' + invite.presenceCount + '`\n' +
                                    '**Temporary**: `' + invite.temporary + '`\n' +
                                    '**URL**: `' + invite.url + '`\n' + 
                                    '**Uses**: `' + invite.uses + '`\n' + 
                                    '**ChannelCount:** `' + channelCount + '`\n')
                                    message.channel.send({embed: fetchedInvite})
    })
        } catch (ex) {
            message.channel.send(ex)
        }
        


    }
    if(option == inspections[1]) {
        var noVidURL = new Discord.RichEmbed()
            .setColor(color)
            .setTitle('No Video URL')
            .setDescription('No Video URL Provided')

        if(!item) return message.channel.send({embed: noVidURL})
        var video = vui(item)

        var videoInspect = new Discord.RichEmbed()
            .setColor(color)
            .setTitle('Video Inspected')
            .setDescription('**Hoster** `' + video.hoster + '`\n' +
                            '**RemoteID** `' + video.remoteId + '`\n' +
                            '**EmbedURL** `' + video.embedUrl + '`\n')
                            message.channel.send({embed: videoInspect})
    }

    var invalidInspection = new Discord.RichEmbed()
        .setColor(color)
        .setTitle('Invalid Inspection Option')
        .setDescription('That inspection option is not valid')
        return message.channel.send({embed: invalidInspection})

}
module.exports.help = {
    name: "inspect",
    info: "Inspect a multitude of things",
    usage: "inspect"
}