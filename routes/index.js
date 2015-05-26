var express = require('express');
var router = express.Router();
var Built = require ('built.io');
var Bapp = Built.App('blt07bf06f5ef0754cb').setMasterKey('blt68fc7fbb4a8579ca').setHost('api.built.io');

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post("/login", function(req, res){
  var Project         = Bapp.Class('user').Object;
  var projectWithoutUid = Project({
    username : req.body.username,
    password : req.body.password

  });
  projectWithoutUid.save()
      .then(function(object){

      })
    res.redirect('getusers');
});

//built_io_application_user
// fetch all the users in class user

username = [];
newjson = [];


router.get('/getusers', function(req, res) {

    var query = Bapp.Class('user').Query();
    query.toJSON().exec()
        .then(function (objects) {

            for ( var i in objects) {
                 username[i] = objects[i].username;
                console.log(username[i]);
            }

            res.render('getusers', {
                    vizJson: username
                });
            /*var query = Bapp.Class('user').Query();
             query.toJSON().exec()
             .then(function(objects){
             console.log(objects);
             var newjson = objects;
             res.render('getusers.jade', {
             vizJson: JSON.stringify(newjson)
             });


             });*/

        })
});

// register
/*
var user = Bapp.User();
user.register("uname","pword","cpword")
    .then(function(user) {
        console.log(user);
    });
*/
/*
var query  = Bapp.Class('user').Query();
query.where('username','John').exec()
    .then(function(objects){

    });
*/

module.exports = router;
