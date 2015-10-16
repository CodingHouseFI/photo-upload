'use strict';

var mongoose = require('mongoose');
var async = require('async');
var Photo = require('./photo');

var AlbumSchema = mongoose.Schema({
  userId: { type: Mongoose.Schema.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  createdAt: { type: Date, required: true, default: new Date() },
  photos: [{ type: Mongoose.Schema.ObjectId, ref: 'Photo' }]
});

AlbumSchema.methods.addPhotos = function(photos, cb) {

  


};


module.exports = mongoose.model('Album', AlbumSchema);
