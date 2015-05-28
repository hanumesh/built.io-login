var express = require('express');
var router = express.Router();

// built.io sdk initialization
var Built = require ('built.io');
var Bapp = Built.App('blt07bf06f5ef0754cb').setMasterKey('blt68fc7fbb4a8579ca').setHost('api.built.io');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post("/login", function(req, res){
    var user = Bapp.User();
    user.register(req.body.email, req.body.username,req.body.password)
        .then(function(user) {
        //   console.log(user.toJSON())
        }, function(error) {

        });

    res.redirect('getusers');
});

router.get('/getusers', function(req, res) {
       var query = Bapp.Class('built_io_application_user').Query();
        query.toJSON().exec()
        .then(function (objects) {
            res.render('getusers', {
                    vizJson: objects
                });
        })
});

router.get('/edit/:uid', function(req, res) {

   var user = Bapp.User();
        user.fetchUserUidByEmail(req.params.uid)
            .then(function(user){
                value =  req.params.uid ;
             //   console.log(value);
            })
    res.render ('edit');
})

router.get('/edit', function(req, res) {
var query  = Bapp.Class('built_io_application_user').Query();
query.where('email', value).toJSON().exec()
    .then(function(objects){
        console.log (objects);
    });

})

// todo -- prefetch values of email  and username

router.post("/edit", function(req, res){
    var user = Bapp.User(value).updateUserProfile(
        {
          //  email : req.body.email,
            username : req.body.username
            /*first_name: "john",
            last_name: "joseph*/
        })
        .then(function(user) {
            console.log(user.toJSON())
        }, function(error) {

        });
    res.redirect('display');
});


router.get('/display', function(req, res) {
    var query = Bapp.Class('built_io_application_user').Query();
    query.toJSON().exec()
        .then(function (objects) {
            res.render('display', {
                disJson: objects
            });
        })
});


/*var Project  = Bapp.Class('built_io_application_user').Object;
 var projectWithUid  = Project({
 uid: value,
 //   email : req.body.email,
 username : req.body.username,
 Password : req.body.password
 });
 projectWithUid.save()
 .then(function(object){
 })*/


/*  var Project  = Bapp.Class('built_io_application_user').Object;
 var projectWithoutUid = Project({
 email : req.body.email,
 Username : req.body.username,
 Password : req.body.password
 });
 projectWithoutUid.save()
 .then(function(object){
 })*/

module.exports = router;
