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
    // console.log(`AT: generateXML()`);

    let data = '';

    data += `
        <playlist xmlns="https://xspf.org/ns/0/" version="1">
            <trackList>
    `;

    let files = fs.readdirSync('public/airdancer-player-assets/tracks/');
    files.forEach(fileName => {
        
        let trackName = fileName.substring(0, fileName.indexOf('.'));
        data += `
                <track>
                    <title>${trackName}</title>
                    <location>http://localhost:12000/airdancer-player-assets/tracks/${fileName}</location>
                </track>
        `;
    });

    data += `
            </trackList>
        </playlist>
    `;

    fs.writeFileSync('public/airdancer-player-assets/playlists/list_vip.xml', data, (err) => {
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