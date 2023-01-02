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

    let guestbook = undefined;

    try
    {
        let guestbookData = fs.readFileSync(path.join(__dirname, '..', 'public', 'guestbook.json'), 'utf-8');
        guestbook = JSON.parse(guestbookData);
    }
    catch (error)
    {
        res.redirect('/404');
    }

    // Code from here: https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
    // Generates a string containing today's date
    Date.prototype.today = function () { 
        // return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
        return (((this.getUTCMonth()+1) < 10)?"0":"") + (this.getUTCMonth()+1) + "/" +((this.getUTCDate() < 10)?"0":"") + this.getUTCDate() + "/" + this.getUTCFullYear();
    }

    // Generates a string containing the current time
    Date.prototype.timeNow = function () {
        return ((this.getUTCHours() < 10)?"0":"") + this.getUTCHours() +":"+ ((this.getUTCMinutes() < 10)?"0":"") + this.getUTCMinutes() +":"+ ((this.getUTCSeconds() < 10)?"0":"") + this.getUTCSeconds();
    }

    
    let entryDate = new Date();

    let guestbookEntry = {
        favWebsite: `${req.query.favWebsite}`,
        handle: `${req.query.handle}`,
        message: `${req.query.message}`,
        timestamp: `${entryDate.today()} ${entryDate.timeNow()}`
    };

    guestbook.push(guestbookEntry);

    fs.writeFileSync(path.join(__dirname, '..', 'public', 'guestbook.json'), JSON.stringify(guestbook));

    res.redirect('/ka/guestbook');
});

// TODO: Read up on why we need to export the router object from the "routes" files.
module.exports = router;