const Discord = require('discord.js')

module.exports.run = async(bot, message, args) => {
  let commands = new Discord.RichEmbed()
    .setColor('#F1C40F')
    .addField('!botinfo', 'About bot')
    .addField('!serverinfo', 'About server')
    .addField('!userinfo @user', 'About user')
    .addField('!report @user', 'Report user')
    .addField('!kick @user', 'Kick user')
    .addField('!ban @user', 'Ban user')

  return message.channel.send(commands)
}

module.exports.help = {
  name: 'help'
}