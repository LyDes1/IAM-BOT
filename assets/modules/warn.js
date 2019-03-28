const Discord = require('discord.js')
const fs = require('fs')
const ms = require('ms')
let warns = JSON.parse(fs.readFileSync('./warnings.json', 'utf8'))

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission('MANAGE_MEMBERS')) return message.reply('aga da yo can poity nahui')
  let warnuser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!warnuser) return message.reply('couldnt find user')
  if(warnuser.hasPermission('MANAGE_MESSAGES')) return message.reply('prava kupi')
  let reason = args.join(' ').slice(22)

  if(!warns[warnuser.id]) warns[warnuser.id] = {
    warns: 0
  }

  warns[warnuser.id].warns++

  fs.writeFile('./warnings.json', JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  })

  let warnembed = new Discord.RichEmbed()
    .setDescription("Warns")
    .setAuthor(message.author.username)
    .setColor("#fc6400")
    .addField("Warned User", `<@${warnuser.id}>`)
    .addField("Warned In", message.channel)
    .addField("Number of Warnings", warns[warnuser.id].warns)
    .addField("Reason", reason);

  let warnchannel = message.guild.channels.find(`name`, "incidents");
  if(!warnchannel) return message.reply("Couldn't find channel");

  warnchannel.send(warnembed)

  if(warns[warnuser.id].warns >= 2){
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole) return message.reply("You should create that role dude.");

    let mutetime = "10s";
    await(warnuser.addRole(muterole.id));
    message.channel.send(`<@${warnuser.id}> has been temporarily muted`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${warnuser.id}> has been unmuted.`)
    }, ms(mutetime))
  }
  if(warns[warnuser.id].warns == 5){
    message.guild.member(warnuser).ban(reason);
    message.reply(`<@${warnuser.id}> has been banned.`)
  }


}

module.exports.help = {
  name: 'warn'
}
