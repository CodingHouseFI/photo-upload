'use strict';

var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({ storage: multer.memoryStorage() });

var Photo = require('../models/photo');

router.post('/', upload.single('photo'), function(req, res, next) {
  Photo.upload(req.file, function(err, photo){
    console.log(err || photo);
    res.redirect('/#/photos');
  });
});

router.get('/', function(req,res) {
  Photo.find({}, function(err, photos) {
    res.status(err ? 400 : 200).send(err || photos);
  });
});

module.exports = router;
