const MonitorManager = require('../src/monitor-manager.js');

module.exports = {
  name: 'list',
  description: "List the channels currently being monitored",
  execute(message, args) {
    let messageStart = "The channels being monitored are: ";

    let listOfChannels = MonitorManager.getInstance().getMonitoring(guildId);

    message.reply(messageStart + listOfChannels);
  },
};
