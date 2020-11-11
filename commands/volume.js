const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Change volume of currently playing music",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Hiçbir şey oynamıyor.").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("Önce bir ses kanalına katılmanız gerekir!").catch(console.error);

    if (!args[0]) return message.reply(`🔊 Mevcut ses: **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Please use a number to set volume.").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.reply("Please use a number between 0 - 100.").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`Ses seviyesi: **${args[0]}%**`).catch(console.error);
  }
};
