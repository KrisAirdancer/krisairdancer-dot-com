const express = require('express');
const passport = require('passport');
const utils = require('../utils'); // Import my custom utilities library.

const router = express.Router();

router.get('/', utils.checkAuthenticated, (req, res) => {
    res.render('admin-views/admin-home.ejs');
});

router.get('/home', utils.checkAuthenticated, (req, res) => {
    res.render('admin-views/admin-home.ejs');
});

router.get('/admin-login', utils.checkNotAuthenticated, (req, res) => {
    res.render('admin-views/admin-login.ejs');
});

router.post('/login', utils.checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/admin/home',
    failureRedirect: '/admin/admin-login'
}));

// https://stackoverflow.com/questions/72336177/error-reqlogout-requires-a-callback-function
router.delete('/logout', utils.checkAuthenticated, (req, res) => {
    req.logOut((err) => {
        if (err) { return next(err) }
        res.redirect('/admin/admin-login')
    })
});

/***** BLOG ADMIN ROUTES *****/

router.get('/post-editor', utils.checkAuthenticated, (req, res) => {
    res.render('admin-views/post-editor.ejs')
});

router.get('/post-manager', utils.checkAuthenticated, (req, res) => {
    res.render('admin-views/post-manager.ejs')
});

router.delete('/delete-post/:postID', utils.checkAuthenticated, (req, res) => {
    utils.deletePost(req, res, req.params.postID)
});

router.post('/create-post', utils.checkAuthenticated, (req, res) => {
    console.log('AT: /create-post')
    utils.createPost(req, res)
});

module.exports = router;