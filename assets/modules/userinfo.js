const Discord = require('discord.js')

module.exports.run = async(bot, message, args) => {
  let user_info = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
  let user_avatar = message.mentions.users.first().avatarURL
  let userembed = new Discord.RichEmbed()
    .setColor('#17A2B8')
    .setDescription('User info :')
    .setThumbnail(user_avatar)
    .addField('User nickname :', user_info)
    .addField('User joined at :', message.guild.joinedAt)

  return message.channel.send(userembed)
}

module.exports.help = {
  name: 'userinfo'
}