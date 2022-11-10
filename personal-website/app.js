const express = require('express');
const path = require('path');
const fs = require('fs');

/***** CONFIGURATIONs *****/

const PORT = 11002;

/***** APPLICATION SETUP *****/

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

/***** ROUTING *****/

// Appends a string of text to the response body
app.get('/body', (req, res) => {
    // res.write('Hello, from personal website.')
    res.send({ msg: 'Hello, from personal-web' });
});

app.get('/html-file', (req, res) => {
    // res.send('<h1>TEST</h1>');
    res.sendFile('./views/test.html', { root: __dirname });
});

app.get('/audio-file', (req, res) => {
    res.sendFile('./origin.mp3', { root: __dirname });
    // fs.createReadStream('origin.mp3').pipe(res); // Reads data from the origin.mp3 file and pipes it into the response
});

/***** LAUNCH APPLICATION *****/

app.listen(PORT, error => {
    if (error) {
        // TODO: Log the error instead.
        throw error;
    }
    console.log(`Listening on port ${PORT}.`)
})