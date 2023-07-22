// This function prevents non-logged in users from accessing protected pages.
const checkAuthenticated = function(req, res, next) // Next is a function that is called after the user has been authenticated.
{
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
const checkNotAuthenticated = function(req, res, next)
{
    if (req.isAuthenticated())
    {
        return res.redirect('/admin/post-editor')
    }
    next() // Continue with the call if the user is not authenticated. Allow them to access the page they accessed.
}

module.exports = { checkAuthenticated, checkNotAuthenticated }