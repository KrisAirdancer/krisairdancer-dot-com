const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// TODO: Build out routes for portfolio/personal webpage.

router.get('/', (req, res) => {
    res.render('ka-views/ka-home');
});

router.get('/webrings', (req, res) => {
    res.render('ka-views/webrings');
});

router.get('/guestbook', (req, res) => {
    console.log('AT: /guestbook');
    res.render('ka-views/guestbook');
});

router.get('/sign-guestbook', (req, res) => {
    console.log('Signed!');
    console.log(req.query);

    let guestbook = undefined;

    try
    {
        guestbook = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'public', 'guestbook.json'), 'utf-8'));
    }
    catch (error)
    {
        res.redirect('/404');
    }

    let guestbookEntry = {
        handle: `${req.query.handle}`,
        message: `${req.query.message}`
    };

    guestbook.push(guestbookEntry);

    fs.writeFileSync(path.join(__dirname, '..', 'public', 'guestbook.json'), JSON.stringify(guestbook));

    res.redirect('/ka/guestbook');
});

// TODO: Read up on why we need to export the router object from the "routes" files.
module.exports = router;