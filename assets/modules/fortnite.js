const Discord = require('discord.js')
const key = require('../../botconfig.json')
const Client = require('fortnite');
const fortnite = new Client(key.fortnite);

module.exports.run = async (bot, message, args) => {

  await message.delete()
  let username = args[0]
  let platform = args[1] || 'pc';

  if(!username) return message.reply('napishi imya')

  let data = fortnite.user(username, platform).then(data => {
    let stats = data.stats
    let lifetime = stats.lifetime

    console.log(lifetime)
    let mplayed = lifetime.matches
    let wins = lifetime.wins
    let kills = lifetime.kills
    let kd = lifetime.kd

    let embed = new Discord.RichEmbed()
      .setTitle(data.username)
      .setColor("#ff9900")
      .addField('Match played', mplayed, true)
      .addField('Wins', wins, true)
      .addField('kills', kills, true)
      .addField('k/d', kd, true)

    message.channel.send(embed)

  });

}

module.exports.help = {
  name: 'fortnite'
}