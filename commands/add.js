const MonitorManager = require('../src/monitor-manager.js');

module.exports = {
  name: 'add',
  description: "Add the channel you're currently in to the watchlist",
  execute(message, args) {
    if (!message.member.voice.channel) {
      message.reply('You need to be in a voice channel for me to monitor!');
      return;
    } else {
      message.reply("Ok, I'll make sure everyone's video is on in " + message.member.voice.channel.name + " until you tell me to !requirecam stop.");
    }

    let channelId = message.member.voice.channel.id;

    MonitorManager.getInstance().addMonitoring(channelId);
  },
};
