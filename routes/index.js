
var express = require('express');
var router = express.Router();

// built.io sdk initialization
var Built = require ('built.io');
var Builtapp = Built.App('blt07bf06f5ef0754cb').setMasterKey('blt68fc7fbb4a8579ca').setHost('api.built.io');
var auth = require ('./auth')

var passport = require ('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// load up the user model
var User       = require('./users');

// load the auth variables
var configAuth = require('./auth');

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

    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))
    // code for facebook (use('facebook', new FacebookStrategy))
    // code for twitter (use('twitter', new TwitterStrategy))

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

            clientID        : configAuth.googleAuth.clientID,
            clientSecret    : configAuth.googleAuth.clientSecret,
            callbackURL     : configAuth.googleAuth.callbackURL,

        },
        function(token, refreshToken, profile, done) {

            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Google
            process.nextTick(function() {

                // try to find the user based on their google id
                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        var id_token = user.getAuthResponse().id_token;
                        var id_token1 = getAuthResponse().id_token
                        console.log("ID Token: " + id_token);
                        console.log ("ID1 : " + id_token1 );

                        return done(null, user);
                    } else {
                        // if the user isnt in our database, create a new user
                        var newUser          = new User();

                        // set all of the relevant information
                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = profile.emails[0].value; // pull the first email

                        // save the user
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });

        }));


    // route for showing the profile page
    router.get('/show', isLoggedIn, function(req, res) {
        res.render('show', {user : req.user});
        console.log ("user :" + user );

        console.log (req,user);
        var user = Builtapp.User();
        user.loginWithGoogle('7e5a6c7b3919854d7e5a6c7b3919854d')
            .then(function(user) {
                console.log ("google login " + user.toJSON());
            }, function(error) {
                res.status(error.status || 500);
                res.render('error', {
                    message: error.message,
                    error: error
                });
            });
    });

    // route for logging out
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] })
    );

    // the callback after google has authenticated the user
    router.get('/auth/google/built-login/', passport.authenticate('google', {failureRedirect : '/'}),
        function (req , res ){
            function onSignIn(googleUser) {
                // Useful data for your client-side scripts:
                var profile = googleUser.getBasicProfile();
                console.log("ID: " + profile.getId()); // Don't send this directly to your server!
                console.log("Name: " + profile.getName());
                console.log("Image URL: " + profile.getImageUrl());
                console.log("Email: " + profile.getEmail());

                // The ID token you need to pass to your backend:
                var id_token = googleUser.getAuthResponse().id_token;
                console.log("ID Token: " + id_token);
            };

            res.redirect('/getusers');
        });

    //console.log ("token :" + token );

        function isLoggedIn(req, res, next) {

            // if user is authenticated in the session, carry on
            if (req.isAuthenticated())
                return next();

            // if they aren't redirect them to the home page
            res.redirect('/');
        }


router.get('/', function(req, res, next) {
    res.render('index', { title: 'TestApp' });
});


router.post("/googlelogin", function(req, res){
    var user = Builtapp.User();
    user.loginWithGoogle('-57116eb6c37ce984')
        .then(function(user) {
            console.log ("google login " + user.toJSON());
        }, function(error) {
            res.status(error.status || 500);
            res.render('error', {
                message: error.message,
                error: error
            });
        });
});



router.post("/login", function(req, res){
    var user = Builtapp.User();
    user.register(req.body.email, req.body.Username,req.body.password)
        .then(function(user) {
            res.redirect('getusers');
        }, function(error) {
            res.status(error.status || 500);
            res.render('error', {
                message: error.message,
                error: error
            });
        });
});


/*get all registered users*/
router.get('/getusers', function(req, res) {
       var query = Builtapp.Class('built_io_application_user').Query();
        query.toJSON().exec()
        .then(function (objects) {
                res.render('getusers', { users: objects});
            })
});

/*edit user*/
router.get('/edit/:uid', function (req, res) {
    var query = Builtapp.Class('built_io_application_user').Query();
    value =  req.params.uid;
    query.where('uid', req.params.uid).toJSON().exec()
        .then(function (user) {
            res.render('edit', {user: user[0]});
        });
});

/*delete user*/

router.get('/delete/:uid', function (req, res) {
    var Query = Builtapp.Class('built_io_application_user').Query;
    var query = Query();
    query = query.where('uid', req.params.uid);
    query.delete()
        .then(function (deluser) {
            console.log("user deleted successfully");
            res.redirect('/getusers');
        });
});

/*updates an user*/
router.post('/update', function(req, res){
    var Project = Builtapp.Class('built_io_application_user').Object;
    var project = Project(value);
    console.log ("value : " + value );
    project = project.set('Username', req.body.Username );
    console.log ("req.body.Username :" + req.body.Username );
    project.save()
        .then(function(project) {
            console.log("after update: " + project.toJSON())
         //   res.redirect('/getusers');
            }, function(error) {
            });
});


module.exports = router;
