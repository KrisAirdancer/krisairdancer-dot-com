const express = require('express');
const passport = require('passport');
const utils = require('../utils'); // Import my custom utilities library.
const path = require('path');
const fs = require('fs');

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

router.get('/post-editor', utils.checkAuthenticated, (req, res) => {
    res.render('admin-views/post-editor.ejs')
});

router.post('/create-post', utils.checkAuthenticated, (req, res) => {
    // TODO: Move the logic in this route into utils.js so the routing file stays clean and easy to read.
    let blogContent = undefined;

    try
    {
        let blogContentRAW = fs.readFileSync(path.join(__dirname, '..', 'public', 'blog-content', 'posts.json'), 'utf-8');
        blogContent = JSON.parse(blogContentRAW);
    
        let date = new Date()
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        
        // Get the content list for the current year from the JSON file.
        let currentYearsContent = undefined
        let currentYear = date.getFullYear()
        for (let i = 0; i < blogContent.length; i++) {
            if (blogContent[i].year == currentYear) {
                currentYearsContent = blogContent[i].posts;
                break
            }
        }
        // If the current year doesn't have an entry in the JSON file, make a new entry for it.
        if (!currentYearsContent)
        {
            let newYear = {
                year: currentYear,
                posts: []
            }
    
            blogContent.unshift(newYear)
            currentYearsContent = newYear.posts
        }

        // Generate random ID for new post.
        
        // Get all current IDs
        let currentIDs = new Set()
        for (let i = 0; i < blogContent.length; i++) // For each year in the posts JSON.
        {
            let year = blogContent[i].posts
            for (let j = 0; j < year.length; j++) // For each post in the current year.
            {
                currentIDs.add(year[j].id)
            }
        }

        // Generate a new ID and ensure that it is unique.
        let postID = utils.generateID()
        while (currentIDs.has(postID))
        {
            postID = utils.generateID()
        }

        // Generate the post object.
        let postDate = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
        let newPost = {
            id: `${postID}`,
            date: `${postDate}`,
            title: `${req.body.title}`,
            author: `${req.body.author}`,
            body: `${req.body.content}`
        };
        
        // Insert the post object to the beginning of the current year's JSON (this goes directly into the whole JSON object b/c we have a reference to a subset of the whole JSON object).
        currentYearsContent.unshift(newPost);
    
        fs.writeFileSync(path.join(__dirname, '..', 'public', 'blog-content', 'posts.json'), JSON.stringify(blogContent));
    
        res.redirect('/admin/post-editor');
    }
    catch (error)
    {
        // console.log(error)
        res.redirect('/404');
    }
});

module.exports = router;