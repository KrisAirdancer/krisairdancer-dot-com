const express = require('express')

/***** CONFIGURATIONs *****/

const PORT = 11001;

/***** APPLICATION SETUP *****/

const app = express();

/***** ROUTING *****/

app.get('/', (req, res) => {
    res.send('Hello, World!')
});

/***** LAUNCH APPLICATION *****/

app.listen(PORT, error => {
    if (error) {
        // TODO: Log the error instead.
        throw error;
    }
    console.log(`Listening on port ${PORT}.`)
})