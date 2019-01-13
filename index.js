const Discord = require("discord.js");
const DAttachment = require('discord.js').Attachment;
const config = require('./data/config.json')
const package = require('./package.json')
const fs = require('fs')
const fse = require('fs-extra')
var request = require('request')
const DBLToken = config.dbltoken
const DBL = require('dblapi.js')
const dbl = new DBL(DBLToken) 

const client = new Discord.Client({
    autoReconnect: true
});
const color = config.color
var prefix = config.prefix
client.on("message", (message) => {

    const args = message.content.split(" ");
  const command = message.content.split(" ")[0]

  if(message.author.bot || !command.startsWith(prefix) || message.channel.type === "dm") return;

  const cmd = client.commands.get(command.slice(prefix.length))
  if(cmd)
    cmd.run(client, message, args, config, color)
})
client.on("ready", () => {
fs.readFile(`./data/src/utils/filePath.json`, "utf8", function(err, fp) {
	fp = JSON.parse(fp)
    console.log("[LOGGED ON] " +client.user.tag + " | " + client.user.id)

    function activityUpdate() {

        dbl.postStats(client.guilds.size)
        client.user.setActivity('on ' + client.guilds.size + ' servers', {
            type: 'WATCHING'
        })
        return console.log('[STATS] Stats Updated')
    }
    activityUpdate()
    setInterval(activityUpdate, 120000)

    if(fs.existsSync(fp.temp.path)) {
        fse.remove(fp.temp.path)
    }
    console.log(Date.now())
    if(!fs.existsSync(fp.temp.path)) {
        fs.mkdirSync(fp.temp.path)
    }
    if(!fs.existsSync(fp.temp.userdata)) {
    fs.mkdirSync(fp.temp.userdata)
    }
    });
})

client.commands = new Discord.Collection();
  fs.readdir("./data/commands", (err, files) => {
    if(err) console.error(err)
    const jsFiles = files.filter(f => f.split(".").pop() === "js")
    if(jsFiles.length <= 0) {
      console.log("No commands loaded")
      return;
    }
    console.log('[Commands Loaded] ' + jsFiles.length)

    jsFiles.forEach((f, i) => {
      const props = require("./data/commands/" + f)
      client.commands.set(props.help.name, props)
    })
  })

  client.on("message", (message) => {
    if(!fs.existsSync(`./tmp`)) {
        fs.mkdirSync(`./tmp`)
    }
    if(!fs.existsSync(`./tmp/${message.guild.id}`)) {
        fs.mkdirSync(`./tmp/${message.guild.id}`)
    }
    
  })
  client.on("message", (message) => {

    const triggerMention = new RegExp(`^<@!?${client.user.id}>`);
    const trigger = message.content.match(triggerMention) ? message.content.match(triggerMention)[0] : config.testString;
    if(message.content.startsWith(`${trigger}`)) {
        var m = new Discord.RichEmbed()
        .setColor(color)
        .setTitle(client.user.username)
        .setAuthor(client.user.tag, client.user.displayAvatarURL)
        .setDescription("```" + prefix + "```")
        return message.channel.send(m)
    }
      
  })


client.login(config.token)
