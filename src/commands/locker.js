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

function getRandomSkins(count) {
  const skins = [];
  const availableSkins = [...FORTNITE_SKINS];

  for (let i = 0; i < count && availableSkins.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * availableSkins.length);
    skins.push(availableSkins[randomIndex]);
    availableSkins.splice(randomIndex, 1);
  }

  return skins;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('locker')
    .setDescription('Get 3 random Fortnite skins from your locker'),

  async execute(interaction) {
    const skins = getRandomSkins(3);

    const rarityColors = {
      'Common': 0x7d8a96,
      'Uncommon': 0x2dd9da,
      'Rare': 0x5b5cff,
      'Epic': 0xc841e0,
      'Legendary': 0xffb500,
    };

    const skinsList = skins
      .map((skin, index) => `**${index + 1}.** ${skin.image} ${skin.name} *[${skin.rarity}]*`)
      .join('\n');

    const embed = new EmbedBuilder()
      .setTitle('🎒 Your Locker')
      .setDescription(skinsList)
      .setColor(0x2f3136)
      .setFooter({ text: `${interaction.user.username}'s Fortnite Locker` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
