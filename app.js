// ██╗  ██╗██████╗  █████╗ ██████╗  ██████╗ 
// ██║ ██╔╝╚════██╗██╔══██╗╚════██╗██╔════╝ 
// █████╔╝  █████╔╝███████║ █████╔╝███████╗ 
// ██╔═██╗  ╚═══██╗██╔══██║██╔═══╝ ██╔═══██╗
// ██║  ██╗██████╔╝██║  ██║███████╗╚██████╔╝
// ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝ ╚═════╝  ╦╔═╦═╗╦╔═╗╔═╗╦╦═╗╔╦╗╔═╗╔╗╔╔═╗╔═╗╦═╗
// v0.1.2                                    ╠╩╗╠╦╝║╚═╗╠═╣║╠╦╝ ║║╠═╣║║║║  ║╣ ╠╦╝
//                                           ╩ ╩╩╚═╩╚═╝╩ ╩╩╩╚══╩╝╩ ╩╝╚╝╚═╝╚═╝╩╚═ 

const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session')
const passport = require('passport')
const initializePassport = require('./passport-config')
const methodOverride = require('method-override')
const bcrypt = require('bcrypt') // TODO: Hash the password in the environment variables after I get the basics working. Or just remove bcrypt.

require('dotenv').config()

/***** ROUTING IMPORTS *****/

const portfolioRoutes = require('./routes/portfolio-routes');
const kaRoutes = require('./routes/ka-routes');
const adminRoutes = require('./routes/admin-routes');

/***** SETUP PASSPORT.JS AND AUTHENTICATION *****/

const adminUser = {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    id: process.env.ADMIN_ID
}

// This is a function call. Not a function declaration.
initializePassport(passport, 
    username => { // This is a function declaration.
        return adminUser
    },
    id => { // This is a function declaration.
        return adminUser
    }
)

/***** CONFIGURATIONS *****/

const PORT = 11001;

/***** APPLICATION SETUP *****/

const app = express();

// Expose public directory
app.use(express.static(path.join(__dirname, 'public')));

// Setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Not yet sure if I need this
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup the server to use Passport.js
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// Setup Method Override to allow us to send DELETE requests from forms.
app.use(methodOverride('_method')) // This allows us to change the request type from forms.

/***** FUNCTIONS *****/

// // This function prevents non-logged in users from accessing protected pages.
// function checkAuthenticated(req, res, next) // Next is a function that is called after the user has been authenticated.
// {
//     if (req.isAuthenticated)
//     {
//         return next()
//     }
//     else
//     {
//         return res.redirect('/login')
//     }
// }

// // This function prevents logged in users from accessing certain pages. Such as the login page.
// function checkNotAuthenticated()
// {
//     if (req.isAuthenticated)
//     {
//         res.redirect('/post-editor')
//     }
//     next() // Continue with the call if the user is not authenticated. Allow them to access the page they accessed.
// }

/***** ROUTING *****/

app.use('/', portfolioRoutes);
app.use('/ka', kaRoutes);
app.use('/admin', adminRoutes);

app.use((req, res) => { 
    res.status(404).render('404', { title: '404'} );
});

/***** LAUNCH APPLICATION *****/

app.listen(PORT, error => {
    if (error) {
        // TODO: Log the error instead.
        throw error;
    }
    console.log(`Listening on port ${PORT}.`)
})