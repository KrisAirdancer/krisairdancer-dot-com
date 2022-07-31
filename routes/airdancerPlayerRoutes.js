const express = require('express');
const fs = require('fs');
const mediaserver = require('mediaserver');
const router = express.Router();

router.get('/', (req, res) => {
    // console.log(`AT: /`);

    generateXML();
    res.render('airdancer_player_views/airdancerPlayer');
});

/*******************
 * OTHER FUNCTIONS *
 *******************/

function generateXML() {
    console.log('AT: generateXML');

    let data = '';

    data += `
        <playlist xmlns="https://xspf.org/ns/0/" version="1">
            <trackList>
    `;

    let files = fs.readdirSync('public/airdancer_player_assets/tracks/');
    files.forEach(fileName => {
        
        let trackName = fileName.substring(0, fileName.indexOf('.'));
        console.log(`filename: ${fileName}, trackname: ${trackName}`);
        data += `
                <track>
                    <title>${trackName}</title>
                    <location>http://10.0.0.79:11001/airdancer_player_assets/tracks/${fileName}</location>
                </track>
        `;
    });

    data += `
            </trackList>
        </playlist>
    `;

    console.log(data);

    fs.writeFile('public/airdancer_player_assets/playlists/vip_playlist.xml', data, (err) => {
        if (err) {
            console.log(`fs.writeFile() threw an error`);
            throw err;
        };
    });
};

/***********
 * EXPORTS *
 ***********/

module.exports = router;