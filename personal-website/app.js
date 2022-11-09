const express = require('express')

/***** CONFIGURATIONs *****/

const PORT = 11002;

/***** APPLICATION SETUP *****/

const app = express();

/***** ROUTING *****/

app.get('/string', (req, res) => {
    // res.write('Hello, from personal website.')
    res.send({ msg: 'Hello, from personal-web' });
});

/***** LAUNCH APPLICATION *****/

app.listen(PORT, error => {
    if (error) {
        // TODO: Log the error instead.
        throw error;
    }
    console.log(`Listening on port ${PORT}.`)
})