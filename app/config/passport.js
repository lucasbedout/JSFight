var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user');

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Local signup, if we have time, we'll set Facebook/Twitter signup
    passport.use('local-signup', new LocalStrategy({
            usernameField : 'username', // Just to be sure :)
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {

            process.nextTick(function() {

                // Username must be unique
                User.findOne({ 'local.username' :  username }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, false, {message: 'This username is already taken'});
                    } else {
                        // create the user
                        var newUser            = new User();
                        newUser.local.username    = username;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }

                });

            });

        }));

    passport.use('local-login', new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {

            User.findOne({ 'local.username' :  username }, function(err, user) {
                if (err)
                    return done(err);

                if (!user)
                    return done(null, false, {message: 'No user with this username'});

                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, {message: 'Wrong password'});

                // Credentials ok, return the user
                return done(null, user);
            });

        }));


};