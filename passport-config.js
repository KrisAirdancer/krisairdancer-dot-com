const LocalStrategy = require('passport-local').Strategy

function initialize(passport, getUserByUsername, getUserById)
{
    // done is a function that we call once we've authenticated the user.
    const authenticateUser = (username, password, done) => {
        const user = getUserByUsername(username)
        if (user == null)
        {
            return done(null, false, { message: 'Incorrect username or password.' })
        }
        
        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD)
        {
            return done(null, user, { message: 'Incorrect username or password.' })
        }
        else
        {
            return done(null, false, { message: 'Incorrect username or password.' })
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, authenticateUser))
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize