const express = require('express');
require('dotenv').config();

const router = express.Router();

router.get('/', (req, res) => {
    console.log('AT: /')
    
    res.render('admin-views/admin-login.ejs');
});

router.post('/login', (req, res) => {
    // TODO: Handle the login request. This route should authenticate the user.
    console.log('AT: /login');

    console.log('Username: ' + process.env.ADMIN_USERNAME + ", Password: " + process.env.ADMIN_PASSWORD)

    if (req.body['username'] === process.env.ADMIN_USERNAME && req.body['password'] == process.env.ADMIN_PASSWORD)
    {
        console.log('WIN')
        // TODO: Randomly generate the session cookie.
        // TODO: Add an expiry date to the session cookie. https://www.w3schools.com/js/js_cookies.asp
        let sessionCookie = Math.random().toString(36).slice(2) // Generate a random alphanumeric string. https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
        res.cookie('sessionCookie', sessionCookie)
        res.render('admin-views/post-editor.ejs')
    }
    else
    {
        console.log('LOSE')
        res.send(401)
    }
});

router.get('/admin-login', (req, res) => {
    res.render('admin-views/admin-login.ejs');
});

router.get('/post-editor', (req, res) => {
    res.render('admin-views/post-editor.ejs')
});

module.exports = router;

// TODO: Remove all of the semi-colons from the entire project.