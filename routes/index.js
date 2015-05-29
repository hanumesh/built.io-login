var express = require('express');
var router = express.Router();

// built.io sdk initialization
var Built = require ('built.io');
var Builtapp = Built.App('blt07bf06f5ef0754cb').setMasterKey('blt68fc7fbb4a8579ca').setHost('api.built.io');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'TestApp' });
});

/* register an user to built.io */
router.post("/login", function(req, res){
    var user = Builtapp.User();
    user.register(req.body.email, req.body.username,req.body.password)
        .then(function(user) {
            res.redirect('getusers');
        }, function(error) {
            res.render('index', { title: 'TestApp', error: error });
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
router.get('/edit/:uid', function(req, res) {
    var query  = Builtapp.Class('built_io_application_user').Query();
    query.where('uid', req.params.uid).toJSON().exec()
        .then(function(user){
            res.render ('edit', {user: user[0]});
        });

});

/*delete user*/
router.delete('/delete/:uid' , function (req,res) {
    var Query = Builtapp.Class('built_io_application_user').Query;
    var query = Query();
    query = query.containedIn('uid', [req.params.uid]);
    query.delete()
        .then(function (deluser) {
            console.log(deluser)
           // res.render ('edit', {deluser: deluser[0]});
        });
});

/*updates an user*/
router.post('/update', function(req, res){
    var user = Builtapp.User();
    user.updateUserProfile({
            email: req.body.email,
            first_name: "john",
            last_name: "joseph"
        })
        .then(function(user) {
            console.log(user.toJSON())
        }, function(error) {

        });
});

/*display usernames after delete and update operations are done */
router.get('/display', function(req, res) {
    var query = Builtapp.Class('built_io_application_user').Query();
    query.toJSON().exec()
        .then(function (objects) {
            res.render('display', {
                disJson: objects
            });
        })
});

/*var user = Builtapp.User(user.).updateUserProfile(
 {
 email : req.body.email,
 Username : req.body.username
 }).then(function(user) {
 console.log(user.toJSON());
 console.log (value );
 console.log ("user : " + user)
 res.redirect('display');
 });*/



/*router.get('/edit', function(req, res) {
 var query  = Bapp.Class('built_io_application_user').Query();
 query.where('uid', value).toJSON().exec()
 .then(function(objects){
 console.log (objects);
 });

 });*/

// todo -- prefetch values of email  and username

/*var Project  = Builtapp.Class('built_io_application_user').Object;
 var projectWithUid  = Project({
 uid: value,
 //   email : req.body.email,
 username : req.body.username,
 Password : req.body.password
 });
 projectWithUid.save()
 .then(function(object){
 })*/

/*

 var Project  = Builtapp.Class('built_io_application_user').Object;
var projectWithoutUid = Project({
    email : req.body.email,
    Username : req.body.username,
    Password : req.body.password
});
projectWithoutUid.save()
    .then(function(object){
    })
*/

/*
var user = Builtapp.Class('built_io_application_user').Query();
     user.fetchUserUidByEmail(req.params.uid)
         .then(function(user){
             var user =  user;
          console.log(value);

         })
*/

module.exports = router;
