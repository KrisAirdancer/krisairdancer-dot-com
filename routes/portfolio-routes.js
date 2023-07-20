const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('portfolio-views/portfolio');
});

router.get('/3390-group-nums', (req, res) => {
    res.render('portfolio-views/3390-group-nums');
});

router.get('/5630-project', (req, res) => {
    res.render('portfolio-views/5630-project');
});

module.exports = router;