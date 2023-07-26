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

router.get('/post-creator', utils.checkAuthenticated, (req, res) => {
    res.render('admin-views/post-creator.ejs')
});

router.get('/post-manager', utils.checkAuthenticated, (req, res) => {
    res.render('admin-views/post-manager.ejs')
});

router.get('/post-editor/:postID', utils.checkAuthenticated, (req, res) => {
    // console.log('AT: /post-editor/:postID')
    // console.log("postID: ", req.params.postID)

    // TODO: Pull the correct post from the JSON data and then put that into the post object below.

    let post = {
        postID: req.params.postID,
        title: "Lorem Ipsum: Sit dolor amet",
        content: "Lorem ipsum sit dolor amet.",
        author: "Cicero"
    }

    // TODO: I need to get the post data from the JSON file and pass that into the .render() function as options.
    res.render('admin-views/post-editor.ejs', { postID: post.postID, title: post.title, content: post.content, author: post.author })
});

router.put('/edit-post', utils.checkAuthenticated, (req, res) => {
    console.log('AT: /edit-post')
    // TODO: Make sure to pass the right data to the utils.editPost() function (if necessary).
    // TODO: Finish the utils.editPost() function.
    // utils.editPost(req, res, req.params.postID)
    utils.editPost(req, res, req.query.postID)
});

router.delete('/delete-post/:postID', utils.checkAuthenticated, (req, res) => {
    utils.deletePost(req, res, req.params.postID)
});

router.post('/create-post', utils.checkAuthenticated, (req, res) => {
    utils.createPost(req, res)
});

module.exports = router;