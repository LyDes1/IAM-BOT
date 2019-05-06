const botconfig = require('./botconfig.json')
const Disсord = require('discord.js')
const fs = require('fs')
const bot = new Disсord.Client({disableEveryone: true})
bot.commands = new Disсord.Collection()

/*require commands */

fs.readdir('./assets/modules/', (err, files) => {

  if(err) console.log(err)

  let jsfile = files.filter(f => f.split(".").pop() === 'js')
  if(jsfile.length <= 0) {
    console.log('This file is empty')
    return
  }

  jsfile.forEach((f, i) => {
    let props = require(`./assets/modules/${f}`)
    console.log(`${f} is loaded`)
    bot.commands.set(props.help.name, props)
  })
})

/* end require commands */

bot.on('ready', async () => {
  console.log(`${bot.user.username} is online`)
  bot.user.setActivity('Lydesi.pro | Comming soon', {type: "WATCHING"})
})

bot.on('guildMemberAdd', async member => {
  console.log(`${member.id} joined to server`)

  let welcomechannel = member.guild.channels.find(`name`, 'welcome')
  welcomechannel.send(`object joined: ${member}`)
})

bot.on('channelCreate', async channel => {
  console.log(`${channel.name} has been created`)

  let sendchannel = channel.guild.channels.find(`name`, 'general')
  sendchannel.send(`${channel.name} has been created`)
})

bot.on('channelDelete', async channel => {
  console.log(`${channel.name} has been deleted`)

  let sendchannel = channel.guild.channels.find(`name`, 'general')
  sendchannel.send(`${channel.name} has been deleted`)
})

bot.on('guildMemberRemove', async member => {
  console.log(`${member.id} leaved to server`)

  let welcomechannel = member.guild.channels.find(`name`, 'welcome')
  welcomechannel.send(`leaved member: ${member}`)
})

bot.on('message', async message => {
  if(message.author.bot) return
  if(message.channel.type === 'dm') return

  let prefixes = JSON.parse(fs.readFileSync('./prefixes.json', 'utf8'))

  if(!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    }
  }

  let prefix = prefixes[message.guild.id].prefixes

  //let prefix = botconfig.prefix
  let messageArray = message.content.split(' ')
  let cmd = messageArray[0]
  let args = messageArray.slice(1)

  let commandfile = bot.commands.get(cmd.slice(prefix.length))
  if(commandfile) commandfile.run(bot, message, args)

})

bot.login(process.env.token)
