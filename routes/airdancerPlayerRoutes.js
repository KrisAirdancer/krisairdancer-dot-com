const express = require('express');
const fs = require('fs');
const mediaserver = require('mediaserver');
const router = express.Router();

router.get('/', (req, res) => {
    // console.log(`AT: /`);

    generateXML();
    res.render('airdancerPlayer');
});

router.get('/track/:id', (req, res) => {
    // console.log(`AT: /track/:id`);

    // console.log(`:id: ${req.params.id}`);

    let trackName = req.params.id.replaceAll('_', ' ');

    mediaserver.pipe(req, res, `tracks/${trackName}`);
});

/*******************
 * OTHER FUNCTIONS *
 *******************/

function generateXML() {
    // console.log('AT: generateXML');

    let data = '';

    data += `
        <playlist xmlns="https://xspf.org/ns/0/" version="1">
            <trackList>
    `;

    let files = fs.readdirSync('tracks/');
    files.forEach(fileName => {
        fileName = fileName.replaceAll(' ', '_');

        let trackName = fileName.substring(0, fileName.indexOf('.'));
        trackName = trackName.replaceAll('_', ' ');

        // console.log('fileName:', fileName);
        // console.log('trackName:', trackName);

        data += `
                <track>
                    <title>${trackName}</title>
                    <location>http://localhost:8080/airdancer-player/track/${fileName}</location>
                </track>
        `;
    });

    data += `
            </trackList>
        </playlist>
    `;

    // console.log(data);

    fs.writeFile('public/playlists/vip_playlist.xml', data, (err) => {
        if (err) {
            throw err;
        };
    });
};

/***********
 * EXPORTS *
 ***********/

module.exports = router;