const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const blogPosts = require('../public/blog-content/posts.json');

router.get('/', (req, res) => {
    res.render('ka-views/ka-home');
});

router.get('/webrings', (req, res) => {
    res.render('ka-views/webrings');
});

router.get('/blog', (req, res) => {
    res.render('ka-views/blog');
});

router.get('/blog-admin', (req, res) => {
    res.render('ka-views/blog-admin');
});

router.post('/create-post', (req, res) => {

    if (req.body.password != "PostIt") {
        res.redirect('/404');
        return
    }
    
    if (!req.body.title || !req.body.content || !req.body.author || !req.body.date) {
        res.redirect('/404');
        return
    }

    let blogContent = undefined;

    try
    {
        let blogContentRAW = fs.readFileSync(path.join(__dirname, '..', 'public', 'blog-content', 'posts.json'), 'utf-8');
        blogContent = JSON.parse(blogContentRAW);
    }
    catch (error)
    {
        res.redirect('/404');
    }

    let currentYear = new Date().getFullYear();
    Date.prototype.today = function () { 
        return (((this.getUTCMonth()+1) < 10)?"0":"") + (this.getUTCMonth()+1) + "/" +((this.getUTCDate() < 10)?"0":"") + this.getUTCDate() + "/" + this.getUTCFullYear();
    }

    // Get the content list for the current year from the JSON file.
    let currentYearsContent = undefined
    for (let i = 0; i < blogContent.length; i++) {
        if (blogContent[i].year == currentYear) {
            currentYearsContent = blogContent[i].posts;
            break
        }
    }

    let newPost = {
        date: `${req.body.date}`,
        title: `${req.body.title}`,
        author: `${req.body.author}`,
        body: `${req.body.content}`
    };

    currentYearsContent.push(newPost);

    fs.writeFileSync(path.join(__dirname, '..', 'public', 'blog-content', 'posts.json'), JSON.stringify(blogContent));

    res.render('ka-views/blog');
});

router.get('/programming-reference', (req, res) => {
    res.render('ka-views/programming-reference');
});

router.get('/interesting-sites', (req, res) => {
    res.render('ka-views/interesting-sites');
});

router.get('/guestbook', (req, res) => {
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

// TODO: Read up on why we need to export the router object from the "routes" files.
module.exports = router;