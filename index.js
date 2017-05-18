var express = require('express')
, bodyParser = require('body-parser')
, passport = require('passport')
, Auth0Strategy = require('passport-auth0')
, config = require('./config.js')


// ALWAYS DO THESE IN THIS PROPER ORDER
var app = modules.exports = express();

app.use(session({
    secret: config.secret,
    resave: true,
    saveUnitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
// ALWAYS DO THESE (ABOVE) IN THE PROPER ORDER


passport.use(new Auth0Strategy({
    domain: '',
    clientID: '',
    clientSecret: '',
    callbackURL: ''
}, function(accessToken, refreshToken, extraParams, profile, done){
    return done(null, profile);
}));






app.listen(3000, console.log('3000 yo'));

