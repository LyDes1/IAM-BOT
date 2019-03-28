const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry pal, you can't do that.");
  let rolemember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rolemember) return message.reply("Couldn't find that user, yo.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role!");
  let guildmember = message.guild.roles.find(`name`, role);
  if(!guildmember) return message.reply("Couldn't find that role.");

  if(rolemember.roles.has(guildmember.id)) return message.reply("They already have that role.");
  await(rolemember.addRole(guildmember.id));

  try{
    await rolemember.send(`Congrats, you have been given the role ${guildmember.name}`)
  }catch(e){
    message.channel.send(`Congrats to <@${rolemember.id}>, they have been given the role ${guildmember.name}. We tried to DM them, but their DMs are locked.`)
  }

}

module.exports.help = {
  name: "addrole"
}