const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Collect all commands
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command) {
    commands.push(command.data.toJSON());
    console.log(`✓ Collected command: ${command.data.name}`);
  } else {
    console.warn(`[WARNING] The command at ${filePath} is missing a required "data" property.`);
  }
}

const { TOKEN, CLIENT_ID } = process.env;

if (!TOKEN || !CLIENT_ID) {
  console.error('❌ Error: TOKEN and CLIENT_ID environment variables must be set.');
  process.exit(1);
}

const rest = new REST().setToken(TOKEN);

(async () => {
  try {
    console.log(`\n🔄 Refreshing ${commands.length} application command(s)...\n`);

    const data = await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands },
    );

    console.log(`✓ Successfully reloaded ${data.length} application command(s).\n`);
  } catch (error) {
    console.error('❌ Error deploying commands:', error);
    process.exit(1);
  }
})();
