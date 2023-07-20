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
const bcrypt = require('bcrypt') // TODO: Hash the password in the environment variables after I get the basics working.

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
console.log(adminUser)

initializePassport(passport, 
    username => { return adminUser.username },
    id => {
        console.log('005: ' + id)
        return adminUser.id
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