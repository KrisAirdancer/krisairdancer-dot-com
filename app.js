const { application } = require('express');
const express = require('express');
const path = require('path');
const fs = require('fs');
const mediaserver = require('mediaserver');
const app = express();
  
// Static Middleware
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static('public')); // This makes the directory 'public' and all of it's contents available to the frontend.
  
// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
  
// TODO: Replace the redirect here to got to the krisairdancer.com directory page (homepage).
app.get('/', (req, res) => {
    console.log('AT: /');

    res.redirect('/vip-player');
});

app.get('/vip-player', (req, res) => {
    console.log(`AT: /vip-player`);

    generateXML();
    res.render('index');
});

app.get('/playlist', (req, res) => {
    console.log('AT: /playlist');

    generateXML();
    res.render('playlist.xml');
})

app.get('/vip-player/music/:id', (req, res) => {
    console.log(`AT: /vip-player/music/:id`);

    console.log(`:id: ${req.params.id}`);

    let trackName = req.params.id.replaceAll('_', ' ');
    console.log(`trackName: ${trackName}`);

    mediaserver.pipe(req, res, `music/${trackName}`);
    // res.render(`audio`, { title: "Auido File" });
});

app.use( (req, res) => { 
    res.status(404).render('404', { title: '404'} );
});

app.listen(8080, (error) => {
    if(error){
        throw error;
    }   
    console.log("Server listening on port 8080");
});

// ***** OTHER FUNCTIONS *****

function generateXML() {
    console.log('AT: generateXML');

    let data = '';

    data += `
        <playlist xmlns="https://xspf.org/ns/0/" version="1">
            <trackList>
    `;

    let files = fs.readdirSync('music/');
    files.forEach(fileName => {
        fileName = fileName.replaceAll(' ', '_');

        let trackName = fileName.substring(0, fileName.indexOf('.'));
        trackName = trackName.replaceAll('_', ' ');

        console.log('fileName:', fileName);
        console.log('trackName:', trackName);

        data += `
                <track>
                    <title>${trackName}</title>
                    <location>http://localhost:8080/vip-player/music/${fileName}</location>
                </track>
        `;
    });

    data += `
            </trackList>
        </playlist>
    `;

    // console.log(data);

    fs.writeFile('public/playlists/playlist.xml', data, (err) => {
        if (err) {
            throw err;
        };
    });
};

/**
 * Replaces the underscores in a string with spaces.
 */
function underscoreToSpace() {
    console.log(`AT: spacfiyFileName`);
};