const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('admin-views/admin-login.ejs');
});

// TODO: Handle the login request. This route should authenticate the user.
router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin/post-editor',
    failureRedirect: '/admin/admin-login'
}));

router.get('/admin-login', (req, res) => {
    res.render('admin-views/admin-login.ejs');
});

router.get('/post-editor', (req, res) => {
    res.render('admin-views/post-editor.ejs')
});

module.exports = router;