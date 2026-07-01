const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Command collection
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Load all commands
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
    console.log(`✓ Loaded command: ${command.data.name}`);
  } else {
    console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

// Ready event
client.once('ready', () => {
  console.log('\n═════════════════════════════════════');
  console.log(`✓ Bot logged in as ${client.user.tag}`);
  console.log(`✓ Ready to serve ${client.guilds.cache.size} guild(s)`);
  console.log('═════════════════════════════════════\n');
  client.user.setActivity('Fortnite skins', { type: 'WATCHING' });
});

// Interaction handler
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
    console.log(`✓ Executed command: /${interaction.commandName} by ${interaction.user.tag}`);
  } catch (error) {
    console.error(`✗ Error executing command /${interaction.commandName}:`, error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: '❌ There was an error while executing this command!',
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: '❌ There was an error while executing this command!',
        ephemeral: true,
      });
    }
  }
});

// Login
if (!process.env.TOKEN) {
  console.error('❌ Error: TOKEN environment variable is not set.');
  process.exit(1);
}

client.login(process.env.TOKEN);

// Error handling
process.on('unhandledRejection', error => {
  console.error('❌ Unhandled Promise Rejection:', error);
});

process.on('uncaughtException', error => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});
