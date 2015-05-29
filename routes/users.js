var express = require('express');
var router = express.Router();

var Built = require ('built.io');
var Builtapp = Built.App('blt07bf06f5ef0754cb').setMasterKey('blt68fc7fbb4a8579ca').setHost('api.built.io');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
