# Discord Require video
This is a simple bot that repeatedly checks to ensure members of a Discord voice channel have their video on.
If someone doesn't have video enabled when it checks, the bot will remove them from the voice room.
Currently I haven't added a grace period, so you might need to enable your video quickly upon joining.
If you get kicked, users can simply rejoin the room and turn their video on faster next time.

# Setup
1. Clone the repo
2. Create a file named `.env`. Copy the contents of `template.env` into your `.env` file.
3. Configure your `.env` as described in the template file. All arguments are required.
4. Add the bot to your server with Admin permissions (Maybe you can be more granular -- I haven't tested this yet)
5. Only people with the `MANAGE_GUILD` permission can interact with the bot

# Command list
You can use commands in any text channel of your server.
|Command|Description|
|-|-|
|!requirecam|Makes the bot watch whatever channel you are currently in, indefinitely|
|!requirecam stop|Stop watching whatever channel you are currently in|
|!requirecam list|List the channels being monitored for the server you make the request|

# Todo list
Improvements that need to be made loosely in order of importance:
1. Store monitor data in file instead of locally so restarting the app doesn't nuke everything
2. Grace period for people who recently joined the channel
3. Cleanup if-else command structure to something cleaner [like discord.js recommends](https://discordjs.guide/command-handling/#individual-command-files)
