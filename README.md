# Discord Fortnite Bot

This repository contains a small Discord bot using discord.js v14 that provides two slash commands:

- /skin — returns a random Fortnite skin from a built-in list
- /locker — returns 3 random Fortnite skins as a fake locker

How to use

1. Create a copy of `.env.example` named `.env` and set TOKEN and CLIENT_ID.
2. Install dependencies: `npm install`
3. Deploy commands: `npm run deploy-commands` (this registers the slash commands)
4. Start the bot: `npm start`

Notes

- The bot reads the Discord bot token from the TOKEN environment variable and the application client id from CLIENT_ID.
- The skin list is a static array in the command files; feel free to expand it or add images.
