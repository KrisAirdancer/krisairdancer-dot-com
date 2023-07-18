const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin-views/admin-login.ejs');
});

router.get('/login', (req, res) => {
    // TODO: Handle the login request. This route should authenticate the user.
});

router.get('/admin-login', (req, res) => {
    res.render('admin-views/admin-login.ejs');
});

router.get('/post-editor', (req, res) => {
    res.render('admin-views/post-editor.ejs')
});

module.exports = router;