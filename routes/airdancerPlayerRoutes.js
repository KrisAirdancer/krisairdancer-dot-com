const express = require('express');
const fs = require('fs');
const mediaserver = require('mediaserver');
const router = express.Router();

router.get('/', (req, res) => {
    // console.log(`AT: /`);

    generateXML();
    res.render('airdancerPlayer');
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

    let files = fs.readdirSync('public/tracks/');
    files.forEach(fileName => {

        data += `
                <track>
                    <title>${trackName}</title>
                    <location>http://localhost:8080/tracks/${fileName}</location>
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