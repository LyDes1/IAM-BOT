const Disсord = require('discord.js')

module.exports.run = async(bot, message, args) => {
  let ban_user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
  if (!ban_user) return message.channel.send('User cannot find')
  let ban_reason = args.join(' ').slice(22)

  let reason_error = new Disсord.RichEmbed()
    .addField('Error', `${message.author}, please, write a reason`)
    .setColor('#ff0000')
  if(ban_reason.length === 0) return message.channel.send(reason_error)

  if(!message.member.hasPermission('MANAGE_MEMBERS')) return message.channel.send('You dont can make it')
  if(ban_user.hasPermission('MANAGE_MESSAGES')) return message.channel.send('That person cant be banned')

  let banembed = new Disсord.RichEmbed()
    .setDescription('/tobiPizda/')
    .setColor('#ff0000')
    .addField('banned by', `${message.author}`)
    .addField('banned user', `${ban_user} with id ${ban_user.id}`)
    .addField('Reason :', ban_reason)

  let banchannel = message.guild.channels.find('name', 'incidents')
  if(!banchannel) return message.channel.send(`Can't find channel`)

  let ban_answer = new Disсord.RichEmbed()
    .setColor('#15f153')
    .setTitle('Banned user')
    .setDescription(`User ${ban_user} has been banned`)

  message.delete().catch(()=>{})
  message.guild.member(ban_user).ban(ban_reason)
  banchannel.send(banembed)
  return message.channel.send(ban_answer)
}

module.exports.help = {
  name: 'ban'
}