const Discord = require('discord.js')

module.exports.run = async(bot, message, args) => {
  let reported_user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
  let reason = args.join(' ').slice(22)

  let reason_error = new Discord.RichEmbed()
    .addField('Error', `${message.author}, please, write a nickname and reason`)
    .setColor('#ff0000')
  if(reason.length === 0) return message.channel.send(reason_error)

  if(!reported_user) return message.channel.send('User is not find')

  let reportembed = new Discord.RichEmbed()
    .setDescription('Reports :')
    .setColor('#ff0000')
    .addField('Reported user :', `${reported_user} with ID: ${reported_user.id}`)
    .addField('Reported by :', `${message.author} with ID: ${message.author.id}`)
    .addField('Time :', message.createdAt)
    .addField('Reason: ', reason)

  let reportschannel = message.guild.channels.find('name', 'reports')
  if(!reportschannel) return message.channel.send('Server is not defined')

  let report_answer = new Discord.RichEmbed()
    .addField('Thx, ', `${message.author} for reporting. Administration will review your report.`, )
    .setColor('#15f153')

  message.delete().catch(()=>{})
  reportschannel.send(reportembed)
  return message.channel.send(report_answer)
}

module.exports.help = {
  name: 'report'
}