const express = require('express')
const bodyParser = require("body-parser");
// const axios = require('axios').default;
const axios = require('axios');

/***** CONFIGURATIONs *****/

const PORT = 11001;

/***** APPLICATION SETUP *****/

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/***** ROUTING *****/

app.get('/', (req, res) => {
    // console.log(req)
    res.send('Hello, World!')
});

app.get("/pw", (req, res) => {
    console.log('/pw');
    // console.log(`req:`);
    // console.log(req.body);
    // console.log(req.headers);
    // res.sendStatus(200);
  
    axios.get("http://localhost:11002/string")
         .then(response => {
            console.log('***** BEGIN RESPONSE *****');
            console.log(response.data);
            console.log('***** END RESPONSE *****');
         })
         .catch(error => {
            console.log('AXIOS ERROR at /string')
            console.log(error);
        });

    res.sendStatus(200);
    // res.write('Hallo');
  });

// app.get('/pw', (req, res) => {

//     axios.get('localhost:11002/')
//          .then(response => {
//             console.log(response)
//          })
//     res.send('HERE');
// });

/***** LAUNCH APPLICATION *****/

app.listen(PORT, error => {
    if (error) {
        // TODO: Log the error instead.
        throw error;
    }
    console.log(`Listening on port ${PORT}.`)
})