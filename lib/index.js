'use strict';

var fs = require('fs');
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
 	fs.readFile(path, function(err, data) {
 		if (err)
 			finalCb(err, changes);
 		changes.data.html = markdown.toHTML(data.toString());
 	});
 };