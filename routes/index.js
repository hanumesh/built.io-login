var express = require('express');
var router = express.Router();

// built.io sdk initialization
var Built = require ('built.io');
var Builtapp = Built.App('blt07bf06f5ef0754cb').setMasterKey('blt68fc7fbb4a8579ca').setHost('api.built.io');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'TestApp' });
});


/*
/!* register an user to built.io *!/
router.post("/login", function(err, req, res , next) {
    var user = Builtapp. Builtapp.Class('built_io_application_user').Query();
    user.register(req.body.email, req.body.username, req.body.password)
        .then(function (user) {
            res.redirect('getusers');
        }, function (error) {
                res.status(error.status || 500);
                res.render('error', {
                    message: error.message,
                    error: error
                });
    });
});
*/

router.post("/login", function(req, res){
    var user = Builtapp.User();
    user.register(req.body.email, req.body.username,req.body.password)
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
    var user = Builtapp.User();
    user.updateUserProfile({
        email: req.body.email,
        Username: req.body.username
             })
        .then(function(user) {
            console.log(user.toJSON())
        }, function(error) {

        });
});

module.exports = router;
