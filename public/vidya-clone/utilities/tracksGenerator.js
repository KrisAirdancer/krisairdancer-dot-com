const fs = require('fs');
const fsPromises = require('fs/promises');

// Directories being accessed
const TRACKS_DIR = '../vidya-clone/tracks';
const TRACKS_MASTER_LIST_DIR = './vidya-clone/tracks-master-list.json';

/**
 * Generates a JSON representation of all of the tracks located at tracksDir and stores
 * that representation in a JSON file at targetDir.
 * 
 * Overrites the contents of the file specified at targetDir.
 */
async function generateTracksJSON(tracksDir, targetDir) {

    let metadata = [];

    let files = fs.readdirSync(tracksDir);

    let sortedFiles = files.sort((a, b) => {

        // Cut off the trackID (first 6 characters) and cut off the file extension (last 4 characters)
        if (a.substring(7, a.length - 4) < b.substring(7, b.length - 4)) {
          return -1;
        } else if (a.gameName > b.gameName) {
          return 1;
        } else { // a === b
          return 0;
        }
      })

    sortedFiles.forEach(file => {
        // console.log(file);

        // Tokenize track names
        let tokens = file.split(' - ');

        let track = {
            trackID: tokens[0],
            trackGame: tokens[1],
            trackName: tokens[2].substring(0, tokens[2].indexOf('.mp3')),
            trackURL: `https://krisairdancer.com/vidya-clone/tracks/${file}`
        };

        metadata.push(track);
    });

    await fsPromises.writeFile(targetDir, JSON.stringify(metadata));
}

/**
 * Reads the entire contents of the tracks-master-list.js file and prints them to the console.
 * 
 * This method for testing purposes.
 */
async function printTracksMasterList(sourceDir, encoding) {

    let metadata = fs.readFileSync(sourceDir, encoding, (error) => {
        if (error) {
            console.log(error);
        }
    });
    console.log(metadata);
}

/**************
 * OPERATIONS *
 **************/

generateTracksJSON(TRACKS_DIR, TRACKS_MASTER_LIST_DIR);
// printTracksMasterList(TRACKS_MASTER_LIST_DIR, 'utf-8');