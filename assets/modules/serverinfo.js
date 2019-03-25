const Disсord = require('discord.js')

module.exports.run = async(bot, message, args) => {
  let server_icon = message.guild.iconURL
  let serverembed = new Disсord.RichEmbed()
    .addField('Server title: ', message.guild.name)
    .setThumbnail(server_icon)
    .addField('Created at: ', message.guild.createdAt)
    .addField('You joined at: ', message.member.joinedAt)
    .addField('Total members: ', message.guild.memberCount)

  return message.channel.send(serverembed)
}

module.exports.help = {
  name: 'serverinfo'
}