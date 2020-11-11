const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "stop",
  description: "Müziği durdurur",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Hiçbir şey oynamıyor.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ Gapçık müziği durdurdu!`).catch(console.error);
  }
};
