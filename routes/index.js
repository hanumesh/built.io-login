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

router.get('/getusers', function(req, res) {

    var Query = Bapp.Class('user').Query;
    var query = Query();
    query = query.ascending('username');
    query.toJSON().exec()
        .then(function (objects) {
            var newjson = objects;
            res.render('getusers.jade', {
                vizJson: JSON.stringify(newjson)
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
