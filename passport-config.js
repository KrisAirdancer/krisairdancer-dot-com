const LocalStrategy = require('passport-local').Strategy

function initialize(passport, getUserByUsername, getUserById)
{
    // done is a function that we call once we've authenticated the user.
    const authenticateUser = (username, password, done) => {
        const user = getUserByUsername(username)
        console.log("001: " + user)
        if (user == null)
        {
            return done(null, false, { message: 'Incorrect username or password.' })
        }
        
        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD)
        {
            console.log('AUTHENTICATED')
            // TODO: We are going to have to create a user somewhere to use for session purposes. Instead of creating one with register, we'll create on that is generated each time the server starts up.
            return done(null, user, { message: 'Incorrect username or password.' })
        }
        else
        {
            console.log('FAILURE')
            return done(null, false, { message: 'Incorrect username or password.' })
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, authenticateUser))
    passport.serializeUser((user, done) => {
        console.log("002: " + user)
        done(null, user)
    })
    passport.deserializeUser((id, done) => {
        console.log("003: " + id)
        console.log("004: " + getUserById(id))
        return done(null, getUserById(id))
    })
}

module.exports = initialize

// 28:22