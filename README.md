# Airdancer Server

A Node.js server running on my Raspberry Pi.

This server currently builds a simple music player website build from the [Vidya Intarweb Playlist HTML5 Player](https://github.com/fpgaminer/vip-html5-player). Essentially a clone of [Vipvgm.net](https://www.vipvgm.net/).

This server has not yet been opened up to run outside my local network.

# Management Notes

- When changes are made,
    - Push them to GitHub on `main`.
    - SSH into The Pi.
    - Pull the changes down onto The Pi.
    - Restart PM2 using `pm2 restart AirdancerServer`.
- To upload new tracks,
    - Add tracks to File_Transfer repo.
    - Push changes to remote.
    - SSH into The Pi
    - Pull changes to The Pi.
    - `sudo cp /var/www/File_Transfer/*.mp3 ./` to copy all .mp3 files to player directory.
        - Repeat for all file types.
    - Add files to local copy of player (AirdancerServer on PC)
    - Run the project to rebuild the XML file
        - For some reason it isn't re-building the XML file on The Pi.
    - Push the changes to The Pi via Git.
    - No need to restart the server via PM2. But if an issue arises, try this first.
        - `sudo pm2 restart AirdancerServer`
- To remove old tracks,
    - Delete the track from the local copy.
    - Rebuild the XML file per instructions in "To upload new tracks" above.
    - Push changes to The Pi.
    - Remove the file on The Pi via SSH and `sudo rm "<file-name>"
        - Make sure to put the file name in quotes or the terminal will think the special characters are commands.


# Potential Upgrades

- **Chosen and Exiled Buttons**
    - Add two buttons. One that blocks a track from being played and one that makes it more likely to be played.
    - One option for doing this:
        - Give each track an ID number (this could be in the track's name or stored in a JSON file).
        - When the "Exile" button is clicked, the ID of the currently playing track is pulled and sent to the backend on a post route. On the backend, the track ID is added to a list (JSON file and HashSet) of exiled tracks.
        - When the server starts up, it reads all files from the exiled JSON file and loads them into a HashSet.
        - When a track is played, the system checks to see if that track ID is in the exiled list. If it is, it randomly selects another track.
            - Note that if the user selects a track directly, the track should play even if it has been exiled.
            - This only prevents the system from auto-playing exiled tracks.
        - Any tracks that are exiled will have an additionall styling class applied to them to make them red or otherwise mark them as exiled.
            - This can be done by adding a CSS class that is only added to tracks on the exiled list.
            - When the player page loads, the system can loop through the exiled list and add the CSS class to the HTML for all of the tracks that are in there.
        - The chosen list can be done largely the same way.