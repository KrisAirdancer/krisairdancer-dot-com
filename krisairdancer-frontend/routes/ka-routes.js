const express = require('express');
const router = express.Router();

// TODO: Build out routes for portfolio/personal webpage.

router.get('/', (req, res) => {
    res.render('ka-views/ka-home');
});

router.get('/webrings', (req, res) => {
    res.render('ka-views/webrings');
});

// TODO: Read up on why we need to export the router object from the "routes" files.
module.exports = router;