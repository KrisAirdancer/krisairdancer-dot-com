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
    let postManagementListHTML = utils.generatePostManagementListHTML()
    res.render('admin-views/post-manager.ejs', { postsList: postManagementListHTML })
});

router.get('/post-editor/:postID', utils.checkAuthenticated, (req, res) => {
    let post = utils.getPostData(req, res, req.params.postID)
    res.render('admin-views/post-editor.ejs', { postID: post.id, title: post.title, content: post.content, author: post.author })
});

router.put('/edit-post', utils.checkAuthenticated, (req, res) => {
    utils.editPost(req, res, req.query.postID)
});

router.delete('/delete-post/:postID', utils.checkAuthenticated, (req, res) => {
    utils.deletePost(req, res, req.params.postID)
});

router.post('/create-post', utils.checkAuthenticated, (req, res) => {
    utils.createPost(req, res)
});

router.get('/file-uploader', utils.checkAuthenticated, (req, res) => {
    let fileListHTML = utils.generateFileListHTML()
    res.render('admin-views/file-uploader.ejs', { fileList: fileListHTML })
});

router.post('/upload-file', utils.checkAuthenticated, utils.fileUpload.single('imageInput'), (req, res) => {
    res.redirect('/admin/file-uploader')
});

module.exports = router;