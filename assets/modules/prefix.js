const Discord = require('discord.js')
const fs = require('fs')

module.exports.run = async (bot, message, args, prefix) => {

  if(!message.member.hasPermission('MANAGE_SERVER')) return message.reply('poshel nahui')
  if(!args[0] || args[0 == 'help']) return message.reply('use !prefix stupid beach')

  let prefixes = JSON.parse(fs.readFileSync('./prefixes.json', 'utf8'))

  prefixes[message.guild.id] = {
    prefixes: args[0]
  }

  fs.writeFile('./prefixes.json', JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  })

  let setembed = new Discord.RichEmbed()
    .setColor('#ff0000')
    .setTitle('prefix set')
    .setDescription(`set to ${args[0]}`)

  message.channel.send(setembed)
}

module.exports.help = {
  name: 'prefix'
}