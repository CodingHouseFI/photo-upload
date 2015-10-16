'use strict';

var mongoose = require('mongoose');
var _ = require('lodash');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var uuid = require('node-uuid');

var Photo;

var photoSchema = new mongoose.Schema({
  url: String,
  createdAt: { type: Date, default: Date.now() },
  filename: String
});

photoSchema.statics.upload = function(file, cb) {
  var bucketName = process.env.AWS_BUCKET;
  var filename = file.originalname;
  var ext = _.last(filename.split('.'))
  var keyName = uuid.v4() + '.' + ext;
  var url = process.env.AWS_URL + bucketName + '/' + keyName;
  var params = { Bucket: bucketName, Key: keyName, Body: file.buffer, ACL: 'public-read' };
  s3.putObject(params, function(err, data) {
    if (err){
      cb(err);
    } else {
      var photo = new Photo({url: url, filename: filename});
      photo.save(function(err, savedPhoto) {
        if(err) {
          cb(err);
        } else {
          cb(null, savedPhoto);
        }
      });
    }
  });
};

Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;
