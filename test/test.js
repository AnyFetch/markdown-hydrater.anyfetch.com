'use strict';

require('should');
var anyfetchFileHydrater = require('anyfetch-file-hydrater');
var markdown = require('../lib/');

var hydrationError = anyfetchFileHydrater.hydrationError;

describe('Test markdown results', function() {
  it('returns the correct informations', function(done) {
    var document = {
      data: {},
    };

    var changes = anyfetchFileHydrater.defaultChanges();

    markdown(__dirname + "/samples/document.md", document, changes, function(err, changes) {
      changes.should.have.property('data');
      changes.should.have.property('document_type', 'document');
      changes.data.should.have.property('html');

      changes.data.html.should.include('<h1>Test document</h1>');
      changes.data.html.should.include('<blockquote><p>Citation</p></blockquote>');
      changes.data.html.should.include('<p>Normal text</p>');

      done();
    });
  });

  it('should return an error', function(done) {
    var document = {
      data: {},
    };

    var changes = anyfetchFileHydrater.defaultChanges();

    markdown(__dirname + "/samples/notfound.md", document, changes, function(err) {
      if (err) {
        done();
      } else {
        done(new Error("invalid error"));
      }
    });
  });
});