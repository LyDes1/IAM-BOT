const Disсord = require('discord.js')

module.exports.run = async(bot, message, args) => {
  let kick_user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
  if (!kick_user) return message.channel.send('User cannot find')
  let kick_reason = args.join(' ').slice(22)

  let reason_error = new Disсord.RichEmbed()
    .addField('Error', `${message.author}, please, write a reason`)
    .setColor('#ff0000')
  if(kick_reason.length === 0) return message.channel.send(reason_error)

  if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You dont can make it')
  if(kick_user.hasPermission('MANAGE_MESSAGES')) return message.channel.send('That person cant be kicked')

  let kickembed = new Disсord.RichEmbed()
    .setDescription('/tobiPizda/')
    .setColor('#ff0000')
    .addField('Kicked by', `${message.author}`)
    .addField('Kicked user', `${kick_user} with id ${kick_user.id}`)
    .addField('Reason :', kick_reason)

  let kickchannel = message.guild.channels.find('name', 'incidents')
  if(!kickchannel) return message.channel.send(`Can't find channel`)

  let kick_answer = new Disсord.RichEmbed()
    .setColor('#15f153')
    .setTitle('Kiked user')
    .setDescription(`user ${kick_user} has been kicked`)

  message.guild.member(kick_user).kick(kick_reason)

  message.delete().catch(()=>{})
  kickchannel.send(kickembed)
  return message.channel.send(kick_answer)
}

module.exports.help = {
  name: 'kick'
}