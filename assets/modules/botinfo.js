const Disсord = require('discord.js')

module.exports.run = async(bot, message, args) => {
  let bot_icon = bot.user.displayAvatarURL
  let botembed = new Disсord.RichEmbed()
    .setColor('#15f153')
    .setAuthor(`Lydesi | SSV`)
    .setTitle(`Lydesi's bot. First work.`)
    .addField('Bot name: ', bot.user.username)
    .setDescription('bot bot bot bot')
    .setThumbnail(bot_icon)
    .addField('Created at: ', bot.user.createdAt)
  return message.channel.send(botembed)
}

module.exports.help = {
  name: 'botinfo'
}