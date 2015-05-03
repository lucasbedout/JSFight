var authController = require('./controllers/auth.js');

// app/routes.js
module.exports = function(app, passport) {

    // Signup
    app.post('/signup', authController.signup);


    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        //res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    //res.redirect('/');
}