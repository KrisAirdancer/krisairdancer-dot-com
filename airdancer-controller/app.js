const express = require('express')
const bodyParser = require("body-parser");
const axios = require('axios');
const fs = require('fs');
const path = require('path');

/***** CONFIGURATIONs *****/

const PORT = 12001;

/***** APPLICATION SETUP *****/

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', __dirname);
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/***** ROUTING *****/

app.get('/', (req, res) => {
    // console.log(req)
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