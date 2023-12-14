const express = require('express');
const router = express.Router();
const utils = require('../utils')

router.get('/', (req, res) => {
    res.redirect('https://csmarston.com');
});

router.get('/underground', (req, res) => {
    res.render('portfolio-views/portfolio');
});

router.get('/3390-group-nums', (req, res) => {
    res.render('portfolio-views/3390-group-nums');
});

router.get('/5630-project', (req, res) => {
    res.render('portfolio-views/5630-project');
});

router.get('/schub', (req, res) => {
    res.render('other-views/serial-collection-hub');
});

router.get('/webrings', (req, res) => {
    res.render('other-views/webrings');
});

router.get('/vidya-clone', (req, res) => {
    res.render('portfolio-views/vidya-clone');
});

router.get('/blog', (req, res) => {
    let postListHTML = utils.generatePostListHTML()
    res.render('other-views/blog.ejs', { postsList: postListHTML })
});

router.get('/programming-reference', (req, res) => {
    res.render('other-views/programming-reference');
});

router.get('/interesting-sites', (req, res) => {
    res.render('other-views/interesting-sites');
});

router.get('/guestbook', (req, res) => {
    res.render('other-views/guestbook');
});

router.get('/sign-guestbook', (req, res) => {
    utils.createGuestbookEntry(req, res)
});

router.get('/ping', (req, res) => {
    // res.send("pong")
    res.render("other-views/pong")
});

module.exports = router;