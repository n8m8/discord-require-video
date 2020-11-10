# Discord Require video
This is a simple bot that repeatedly checks to ensure members of a Discord voice channel have their video on.
If someone doesn't have video enabled when it checks, the bot will remove them from the voice room.
Currently I haven't added a grace period, so you might need to enable your video quickly upon joining.
If you get kicked, users can simply rejoin the room and turn their video on faster next time.

# Setup
1. Clone the respo
2. Create a file named `.env`. Copy the contents of `template.env` into your `.env` file.
3. Configure your `.env` as described in the template file. All arguments are required.
4. Add the bot to your server with Admin permissions (Maybe you can be more granular -- I haven't tested this yet)
5. Hop into the voice channel to be monitored and say `!requirecam` to enable the bot for that channel.
6. To stop requiring webcam in a channel, say `!requirecam stop` while sitting in the voice channel you'd like to remove.
