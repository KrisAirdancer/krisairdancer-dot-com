const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('admin-views/admin-login.ejs');
});

router.get('/admin-login', checkNotAuthenticated, (req, res) => {
    res.render('admin-views/admin-login.ejs');
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/admin/post-editor',
    failureRedirect: '/admin/admin-login'
}));

// https://stackoverflow.com/questions/72336177/error-reqlogout-requires-a-callback-function
router.delete('/logout', checkAuthenticated, (req, res) => {
    req.logOut((err) => {
        if (err) { return next(err) }
        res.redirect('/admin/admin-login')
    })
});

router.get('/post-editor', checkAuthenticated, (req, res) => {
    res.render('admin-views/post-editor.ejs')
});

/***** FUNCTIONS *****/
// TODO: Move these two functions into the app.js file and export them into the route files. That way I don't have to have multiple copies of them.

// This function prevents non-logged in users from accessing protected pages.
function checkAuthenticated(req, res, next) // Next is a function that is called after the user has been authenticated.
{
    console.log('HERE')
    if (req.isAuthenticated())
    {
        return next()
    }
    else
    {
        return res.redirect('/admin/admin-login')
    }
}

// This function prevents logged in users from accessing certain pages. Such as the login page.
function checkNotAuthenticated(req, res, next)
{
    console.log('THERE')
    if (req.isAuthenticated())
    {
        return res.redirect('/admin/post-editor')
    }
    next() // Continue with the call if the user is not authenticated. Allow them to access the page they accessed.
}

module.exports = router;