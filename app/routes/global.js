var express = require('express');
var router = express.Router();
var Message = require('../models/message');

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

    router.get('/current_user', auth, function(req, res, next) {
        res.send(req.user);
    });

    router.get('/messages', auth, function(req, res) {
        Message.find(function(err, messages) {
            if (err)
                res.send(err);
            res.json(messages);
        })
    })

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

