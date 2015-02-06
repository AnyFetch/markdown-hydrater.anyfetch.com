'use strict';

var fs = require('fs');
var async = require('async');
var markdown = require('markdown').markdown;
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();


/**
 * Extract the content in html of the specified markdown file
 *
 * @param {string} path Path of the specified file
 * @param {string} document to hydrate
 * @param {function} finalCb Callback, first parameter, is the error if any, then the processed data
 */
module.exports = function(path, document, changes, finalCb) {
  async.waterfall([
    function(cb) {
      fs.readFile(path, cb);
    },
    function(data, cb) {
      changes.data.html = markdown.toHTML(data.toString());
      changes.metadata.text = entities.decode(changes.data.html.replace(/<\/?[a-z1-9]+\/?>/g, ' ').replace(/ +/g, ' ').replace(/ ?\n ?/g, '\n').trim());
      changes.document_type = 'document';
      cb(null, changes);
    }
  ], finalCb);
};
