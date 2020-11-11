const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "resume",
  aliases: ["r"],
  description: "Şu anda çalan müziği devam ettir",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("There is nothing playing.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send(`${message.author} ▶ müziği yeniden başlattı!`).catch(console.error);
    }

    return message.reply("Sıra duraklatılmamış.").catch(console.error);
  }
};
