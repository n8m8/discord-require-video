require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.DISCORD_BOT_TOKEN);

var TIMEOUT_MAP = {};

console.log('logged in');
client.on('message', async message => {
  if (!message.guild) return;

  console.log('received message');

  if (message.content === '!requirecam') {
    if (!message.member.voice.channel) {
      message.reply('You need to be in a voice channel for me to monitor!');
      return;
    } else {
      message.reply("Ok, I'll make sure everyone's video is on in " + message.member.voice.channel.name + " until you tell me to !requirecam stop.");
    }

    let channelId = message.member.voice.channel.id;
    // make sure it's cleared if it was already there
    if (TIMEOUT_MAP[channelId]) {
      clearInterval(TIMEOUT_MAP[channelId].interval);
      delete TIMEOUT_MAP[channelId];
    }

    // Store the channel ID as key, and its interval as the value. This way we can clear this later when stopping monitoring.
    // TIMEOUT_MAP is an object with guildId and channelId, and the interval to maintain
    TIMEOUT_MAP[channelId] = {
      channelId: channelId,
      interval: setInterval(enforceVideoInChannel, process.env.REFRESH_TIME * 1000, message.member.voice.channel)
    };
  } else if (message.content === '!requirecam stop') {
    let channelId = message.member.voice.channel.id;

    if (!message.member.voice || !message.member.voice.channel) {
      message.reply('You need to be in the voice channel for me to stop monitoring!');
      return;
    } else {

      if (TIMEOUT_MAP[channelId]) {
        message.reply("Ok, I'll stop monitoring " + message.member.voice.channel.name + ".");
        // message.reply("Ok, I'll stop monitoring " + channelId + ".");

        clearInterval(TIMEOUT_MAP[channelId].interval);
        delete TIMEOUT_MAP[channelId];

        console.log(TIMEOUT_MAP);
      } else {
        message.reply("I wasn't monitoring that channel!");
      }
    }


  }
});

var enforceVideoInChannel = function(channel) {
  console.log("Making sure everyone in " + channel + " has video on!");

  // console.debug(TIMEOUT_MAP);
  // Fetch most recent channel data
  channel.fetch().then(response => {
    if (response.members) {
      response.members.forEach(member => {
        if (!member.voice.selfVideo) {
          console.log(member.user + " doesn't have video on. Removing them from voice.");
          // TODO kick member
          // guildmember.voice.kick()
          member.voice.kick();
        } else {
          console.log(member.user.username + " had their video on. They are safe (for now).");
        }
      });
    }
  }, error => {
    console.log("Error fetching channel " + channel.id);
  });


}

// client.on('ready', () => {
//   console.log('ready');
// });
