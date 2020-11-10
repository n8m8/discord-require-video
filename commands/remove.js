const MonitorManager = require('../src/monitor-manager.js');

module.exports = {
  name: 'remove',
  description: "Remove the channel you're currently from the watchlist",
  execute(message, args) {
    let channelId = message.member.voice.channel.id;

    if (!message.member.voice || !message.member.voice.channel) {
      message.reply('You need to be in the voice channel for me to stop monitoring!');
      return;
    } else {
      MonitorManager.getInstance().removeMonitoring(channelId);
    }
  },
};
