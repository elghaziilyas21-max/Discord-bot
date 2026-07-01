const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const FORTNITE_SKINS = [
  { name: 'Jonesy', rarity: 'Common', image: '🟦' },
  { name: 'Ramirez', rarity: 'Common', image: '🟦' },
  { name: 'Headhunter', rarity: 'Common', image: '🟦' },
  { name: 'Spitfire', rarity: 'Uncommon', image: '🟩' },
  { name: 'Brutus', rarity: 'Rare', image: '🟪' },
  { name: 'Peely', rarity: 'Rare', image: '🟪' },
  { name: 'Agent Peely', rarity: 'Epic', image: '💜' },
  { name: 'Drift', rarity: 'Epic', image: '💜' },
  { name: 'Superhero Jonesy', rarity: 'Epic', image: '💜' },
  { name: 'Visitor', rarity: 'Legendary', image: '🟨' },
  { name: 'Vendetta', rarity: 'Legendary', image: '🟨' },
  { name: 'Lynx', rarity: 'Legendary', image: '🟨' },
  { name: 'Ocean', rarity: 'Rare', image: '🟪' },
  { name: 'Catalyst', rarity: 'Epic', image: '💜' },
  { name: 'Shadow Ariana', rarity: 'Legendary', image: '🟨' },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skin')
    .setDescription('Get a random Fortnite skin'),

  async execute(interaction) {
    const randomSkin = FORTNITE_SKINS[Math.floor(Math.random() * FORTNITE_SKINS.length)];

    const rarityColors = {
      'Common': 0x7d8a96,
      'Uncommon': 0x2dd9da,
      'Rare': 0x5b5cff,
      'Epic': 0xc841e0,
      'Legendary': 0xffb500,
    };

    const embed = new EmbedBuilder()
      .setTitle(`${randomSkin.image} ${randomSkin.name}`)
      .setDescription(`**Rarity:** ${randomSkin.rarity}`)
      .setColor(rarityColors[randomSkin.rarity] || 0x2f3136)
      .setFooter({ text: 'Fortnite Skin Randomizer' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
