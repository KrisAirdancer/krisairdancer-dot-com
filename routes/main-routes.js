const express = require('express');
const router = express.Router();

const blogPosts = require('../public/blog-content/posts.json');

router.get('/', (req, res) => {
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
    res.render('other-views/blog');
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
    // TODO: Move the logic in this route into utils.js so the routing file stays clean and easy to read.
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

    // Trim Whitespace

    req.query.handle = req.query.handle.trim();
    req.query.yourWebsite = req.query.yourWebsite.trim();
    req.query.favWebsite = req.query.favWebsite.trim();
    req.query.message = req.query.message.trim();

    // Validate submitted URLs

    if (!req.query.yourWebsite.includes('https://') && !req.query.yourWebsite.includes('http://') && req.query.yourWebsite !== '' && req.query.yourWebsite !== undefined && req.query.yourWebsite !== null)
    {
        req.query.yourWebsite = `https://${req.query.yourWebsite}`;
    }

    if (!req.query.favWebsite.includes('https://') && !req.query.favWebsite.includes('http://') && req.query.favWebsite !== '' && req.query.favWebsite !== undefined && req.query.favWebsite !== null)
    {
        req.query.favWebsite = `https://${req.query.favWebsite}`;
    }

    // Generate Guestbook Entry JSON object

    let guestbookEntry = {
        handle: `${req.query.handle}`,
        yourWebsite: `${req.query.yourWebsite}`,
        favWebsite: `${req.query.favWebsite}`,
        message: `${req.query.message}`,
        timestamp: `${entryDate.today()} ${entryDate.timeNow()}`
    };

    guestbook.push(guestbookEntry);

    fs.writeFileSync(path.join(__dirname, '..', 'public', 'guestbook.json'), JSON.stringify(guestbook));

    res.redirect('/ka/guestbook');
});










module.exports = router;