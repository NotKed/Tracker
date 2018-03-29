const Discord = require("discord.js");
const config = require("../botconfig.json");
const Fortnite = require("fortnite");
const ft = new Fortnite("693c1844-8cc8-46f0-bcd6-c25d909105bd");

module.exports.run = async (bot, message, args) => {

    if(args.length == 0) return message.channel.send("`-check <username> <platform (pc, xbl, psn)`");

    //-check rehxshh psn
    let username = args[0];
    let platform = args[1] || "pc";

    let data = ft.getInfo(username, platform).then(data => {

        let stats = data.lifetimeStats;
        let kills = stats.find(s => s.stat == 'kills');
        let mPlayed = stats.find(s => s.stat == 'matchesPlayed');
        let asTime = stats.find(s => s.stat == 'avgSurvivalTime');
        let wins = stats.find(s => s.stat == 'wins');
        let kd = stats.find(s => s.stat == 'kd');
        let kpm = stats.find(s => s.stat == 'killsPerMin');

        let embed = new Discord.RichEmbed()
        .setTitle("Fortnite Stats")
        .setDescription(`${data.username}'s Fortnite stats. Platform: ${platform}`)
        .setColor(0x2C3FFF)
        .addField("Kills", kills.value, true)
        .addField("Deaths", (mPlayed.value - wins.value), true)
        .addField("KD", kd.value, true)
        .addField("Kills Per Minute", kpm.value, true)
        .addField("Wins", wins.value, true)
        .addField("Average Survival Time", asTime.value, true)
        .setFooter("Bot made by Kyle#0420")
        .setThumbnail(bot.user.avatarURL);

        message.channel.send(embed);

    }).catch(e => {
        console.log(e);
        message.author.send("Uh-oh.. I encountered error `5304`, contact bot creator for assistance.");
    })
    
}

module.exports.help = {
    name: "check"
}