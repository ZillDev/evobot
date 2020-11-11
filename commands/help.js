const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Tüm komutları ve açıklamaları göster",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle("ZetMBot")
      .setDescription("Tüm komutları listele")
      .setColor("#F8AA2A");

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};
