const express = require('express');
const router = express.Router();

// TODO: Build out routes for portfolio/personal webpage.

router.get('/', (req, res) => {
    res.render('portfolio-views/portfolio');
});

router.get('/3390-group-nums', (req, res) => {
    res.render('portfolio-views/3390-group-nums');
});

// TODO: Read up on why we need to export the router object from the "routes" files.
module.exports = router;