const botconfig = require('./botconfig.json')
const Disсord = require('discord.js')

const bot = new Disсord.Client({disableEveryone: true})

bot.on('ready', async () => {
  console.log(`${bot.user.username} is online`)
  bot.user.setActivity('Main bot. Best bot.', {type: "WATCHING"})
})

bot.on('message', async message => {
  if(message.author.bot) return
  if(message.channel.type === 'dm') return

  let prefix = botconfig.prefix
  let messageArray = message.content.split(' ')
  let cmd = messageArray[0]
  let args = messageArray.slice(1)

  if(cmd === `${prefix}help`) {
    let commands = new Disсord.RichEmbed()
      .setColor('#F1C40F')
      .addField('!botinfo', 'About bot')
      .addField('!serverinfo', 'About server')
      .addField('!userinfo @user', 'About user')
      .addField('!report @user', 'Report user')
      .addField('!kick @user', 'Kick user')
      .addField('!ban @user', 'Ban user')

    return message.channel.send(commands)
  }

  if(cmd === `${prefix}botinfo`) {
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

  if(cmd === `${prefix}serverinfo`) {
    let server_icon = message.guild.iconURL
    let serverembed = new Disсord.RichEmbed()
      .addField('Server title: ', message.guild.name)
      .setThumbnail(server_icon)
      .addField('Created at: ', message.guild.createdAt)
      .addField('You joined at: ', message.member.joinedAt)
      .addField('Total members: ', message.guild.memberCount)

    return message.channel.send(serverembed)
  }

  if(cmd === `${prefix}userinfo`) {
    let user_info = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    let user_avatar = message.mentions.users.first().avatarURL
    let userembed = new Disсord.RichEmbed()
      .setColor('#17A2B8')
      .setDescription('User info :')
      .setThumbnail(user_avatar)
      .addField('User nickname :', user_info)
      .addField('User joined at :', message.guild.joinedAt)

    return message.channel.send(userembed)
  }

  if(cmd === `${prefix}report`) {
    let reported_user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    let reason = args.join(' ').slice(22)

    let reason_error = new Disсord.RichEmbed()
      .addField('Error', `${message.author}, please, write a reason`)
      .setColor('#ff0000')
    if(reason.length === 0) return message.channel.send(reason_error)

    if(!reported_user) return message.channel.send('User is not find')

    let reportembed = new Disсord.RichEmbed()
      .setDescription('Reports :')
      .setColor('#ff0000')
      .addField('Reported user :', `${reported_user} with ID: ${reported_user.id}`)
      .addField('Reported by :', `${message.author} with ID: ${message.author.id}`)
      .addField('Time :', message.createdAt)
      .addField('Reason: ', reason)

    let reportschannel = message.guild.channels.find('name', 'reports')
    if(!reportschannel) return message.channel.send('Server is not defined')

    let report_answer = new Disсord.RichEmbed()
      .addField('Thx, ', `${message.author} for reporting. Administration will review your report.`, )
      .setColor('#15f153')

    message.delete().catch(()=>{})
    reportschannel.send(reportembed)
    return message.channel.send(report_answer)
  }

  if(cmd === `${prefix}kick`) {

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

  if(cmd === `${prefix}ban`) {

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

})

bot.login(botconfig.token)
