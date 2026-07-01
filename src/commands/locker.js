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

function pickUnique(n) {
  const copy = [...SKINS];
  const picked = [];
  for (let i = 0; i < n && copy.length > 0; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    picked.push(copy.splice(idx, 1)[0]);
  }
  return picked;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('locker')
    .setDescription('Get a fake Fortnite locker with 3 random skins'),

  async execute(interaction) {
    const skins = pickUnique(3);
    const embed = new EmbedBuilder()
      .setTitle('Your Fake Fortnite Locker')
      .setColor(0xFFD700)
      .setFooter({ text: 'Fortnite Locker (fake)' })
      .setDescription(skins.map((s, i) => `**${i + 1}.** ${s}`).join('\n'));

    await interaction.reply({ embeds: [embed] });
  },
};
