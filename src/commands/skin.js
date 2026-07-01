const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const SKINS = [
  'Raven',
  'Drift',
  'Jonesy',
  'Peely',
  'Fishstick',
  'Midas',
  'Lynx',
  'Black Knight',
  'Raptor',
  'Brite Bomber',
  'Skull Trooper',
  'Renegade Raider',
  'Galaxy',
  'Omega',
  'Valor',
  'Dark Voyager',
  'Cuddle Team Leader',
  'Ravenpool',
  'Merry Marauder',
  'Leviathan'
];

function randomSkin() {
  return SKINS[Math.floor(Math.random() * SKINS.length)];
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skin')
    .setDescription('Get a random Fortnite skin'),

  async execute(interaction) {
    const skin = randomSkin();
    const embed = new EmbedBuilder()
      .setTitle('Random Fortnite Skin')
      .setDescription(`You got: **${skin}**`)
      .setColor(0x00AE86)
      .setFooter({ text: 'Fortnite Locker (fake)' });

    await interaction.reply({ embeds: [embed] });
  },
};
