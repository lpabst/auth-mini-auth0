var express = require('express')
, session = require('express-session')
, bodyParser = require('body-parser')
, passport = require('passport')
, Auth0Strategy = require('passport-auth0')
, config = require('./config.js')


// ALWAYS DO THESE IN THIS PROPER ORDER
var app = module.exports = express();

app.use(session({
    secret: config.secret,
    resave: true,
    saveUnitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
// ALWAYS DO THESE (ABOVE) IN THE PROPER ORDER


passport.use(new Auth0Strategy({
    domain: 'lpabst.auth0.com',
    clientID: 'y13ieT4V4Bw4qrqCPh4k76SAyxMa0QqH',
    clientSecret: 'S09J-TgXMa39t_lRGO2iUtTQag3dmodFTmhKIz38YMz6cG_3r5i8bh6dZjHfpIwv',
    callbackURL: '/auth/callback'
}, function(accessToken, refreshToken, extraParams, profile, done){
    // Normally we would find the user in the DB here, then return/invoke done;
    return done(null, profile);
}));

// This user that is returned is what we will pass into express sessions for Authentication
passport.serializeUser(function(user, done){
    return done(null, user);
});

// the deserializer is what puts the user object onto req.user;
passport.deserializeUser(function(userObj, done){
    return done(null, userObj);
});

//This is how we start the auth0 process
app.get('/auth', 
    passport.authenticate('auth0')
);

//This is where the auth0 returns user. this must match the callbackURL above from passport.use;
app.get('/auth/callback', 
    passport.authenticate('auth0', {successRedirect: '/', failureRedirect: '/login'}), function(req, res){
        res.status(200).send(req.user);
    }
);

// This creates a viewer endpoint that displays the whole user object that Auth0 sends back;
app.get('/me', function(req, res, next){
    res.send( req.user );
});









app.listen(3000, console.log('3000 yo'));

