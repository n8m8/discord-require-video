class PrivateMonitorManager {
  #TIMEOUT_MAP;

  constructor() {
    TIMEOUT_MAP = {};
  }
  // Start watching a channel
  startMonitoring(channelId) {
    // make sure it's cleared if it was already there
    if (TIMEOUT_MAP[channelId]) {
      clearInterval(TIMEOUT_MAP[channelId].interval);
      delete TIMEOUT_MAP[channelId];
    }

    // Store the channel ID as key, and its interval as the value. This way we can clear this later when stopping monitoring.
    // TIMEOUT_MAP is an object with guildId and channelId, and the interval to maintain
    TIMEOUT_MAP[channelId] = {
      channelId: channelId,
      channelName: message.member.voice.channel.name,
      guildId: message.guild.id,
      interval: setInterval(enforceVideoInChannel, process.env.REFRESH_TIME * 1000, message.member.voice.channel)
    };
  }

  // Stop watching a channel
  stopMonitoring(channelId) {
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

  // Get all the channels being watched for the given guild
  getMonitoring(guildId) {
    listOfChannels = [];

    for (const key in TIMEOUT_MAP) {
      if (TIMEOUT_MAP[key].guildId === message.guild.id) {
        listOfChannels.push(TIMEOUT_MAP[KEY].channelName);
      }
    }

    return listOfChannels;
  }

  enforceVideoInChannel(channel) {
    console.log("Making sure everyone in " + channel + " has video on!");

    // console.debug(TIMEOUT_MAP);
    // Fetch most recent channel data
    channel.fetch().then(response => {
      if (response.members) {
        response.members.forEach(member => {
          if (!member.voice.selfVideo) {
            console.log("Kicking" + member.user);
            member.voice.kick();

            var kickMessage = "Hi! You were kicked from the channel " + response.name
            + " because your video wasn't on. You can rejoin, but be sure to "
            + "turn on your video so you're not kicked again. _I'm a bot. Problem? DM @n8m8#7540_";
            if (member.user.dmChannel) {
              member.user.dmChannel.send(kickMessage);
            } else {
              member.user.createDM().then(response => {
                response.send(kickMessage);
              }, error => {
                console.error("Unable to create DM convo with " + member.user.id);
              });
            }
          } else {
            console.log(member.user.username + " had their video on. They are safe (for now).");
          }
        });
      }
    }, error => {
      console.log("Error fetching channel " + channel.id);
    });
  }
}

class MonitorManager {
  constructor() {
    throw new Error('Use MonitorManager.getInstance()');
  }

  static getInstance() {
    if (!MonitorManager.instance) {
      MonitorManager.instance = new PrivateMonitorManager();
    }

    return MonitorManager.instance;
  }
}

module.exports = MonitorManager;
