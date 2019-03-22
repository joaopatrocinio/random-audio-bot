const Discord = require('discord.js');
const rn = require('random-number');
const client = new Discord.Client();
require('dotenv').config()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var randomOptions = {
    min:  1
  , max:  2
  , integer: true
};

client.on('message', message => {
    if (message.content === '!audio') {
        if (message.member.voiceChannel) {
            var random = rn(randomOptions);
            console.log("sending audio number " + random);
            message.member.voiceChannel.join()
            .then(connection => {
                const dispatcher = connection.playFile('./aud/' + random + '.mp3');
                dispatcher.on('end', () => {
                    setTimeout(function () {
                        message.member.voiceChannel.leave();
                    }, 1000)
                });          
            })
            .catch(console.log);
        } else {
            message.reply("You need to be in a voice channel for this to work.");
        }
    } else if (message.content === "!help") {
        message.reply("!audio -> plays a random audio.");
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);