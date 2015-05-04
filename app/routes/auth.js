var express = require('express');
var router = express.Router();

module.exports = function(passport) {

    router.post('/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, message) {
            if (err) {
                return next(err);
            }
            // Generate a JSON response reflecting authentication status
            if (!user) {
                return res.send({ success : false, message : message });
            }
            return res.send({ success : true, user: user });
        })(req, res, next);
    });

    router.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, message) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.send({ success : false, message : message });
            }
            // Credentials ok, manual login
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.send({user: user});
            });
        })(req, res, next);
    });

    router.get('/logout', auth, function(req, res, next) {
       req.logout();
       res.send({success: true});
    });

    // route middleware to make sure a user is logged in
    function auth(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.send('Boloss');
    }

    return router;
}

