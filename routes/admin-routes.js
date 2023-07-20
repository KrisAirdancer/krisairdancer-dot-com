const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin-views/admin-login.ejs');
});

router.get('/admin-login', (req, res) => {
    res.render('admin-views/admin-login.ejs');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin/post-editor',
    failureRedirect: '/admin/admin-login'
}));

// https://stackoverflow.com/questions/72336177/error-reqlogout-requires-a-callback-function
router.delete('/logout', (req, res) => {
    req.logOut((err) => {
        if (err) { return next(err) }
        res.redirect('/admin/admin-login')
    })
});

router.get('/post-editor', (req, res) => {
    res.render('admin-views/post-editor.ejs')
});

module.exports = router;

// 32:45