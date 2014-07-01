'use strict';

var fs = require('fs');
var async = require('async');
var config = require('../config/configuration.js');
var markdown = require('markdown').markdown;

/**
 * Extract the content in html of the specified markdown file
 *
 * @param {string} path Path of the specified file
 * @param {string} document to hydrate
 * @param {function} finalCb Callback, first parameter, is the error if any, then the processed data
 */

module.exports = function(path, document, changes, finalCb) {
  async.waterfall([
    function (cb) {
      fs.readFile(path, function(err, data) {
        if (err)
          return cb(err);
        cb(null, data);
      });
    }, function (data) {
      changes.data.html = markdown.toHTML(data.toString());
      changes.document_type = 'document';
      finalCb(null, changes);
    }
  ], function(err) {
    finalCb(err, changes);
  });
};
