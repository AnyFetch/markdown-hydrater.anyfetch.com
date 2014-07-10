'use strict';

require('should');
var anyfetchHydrater = require('anyfetch-hydrater');
var markdown = require('../lib/');

describe('Test markdown results', function() {
  it('returns the correct informations', function(done) {
    var document = {
      data: {},
    };

    var changes = anyfetchHydrater.defaultChanges();

    markdown(__dirname + "/samples/document.md", document, changes, function(err, changes) {
      if(err) {
        done(new Error("It should not have an error"));
      }

      changes.should.have.property('data');
      changes.should.have.property('metadata');
      changes.should.have.property('document_type', 'document');
      changes.data.should.have.property('html');
      changes.metadata.should.have.property('text');

      changes.data.html.should.containDeep('<h1>Test document</h1>');
      changes.data.html.should.containDeep('<blockquote><p>Citation</p></blockquote>');
      changes.data.html.should.containDeep('<p>Normal text</p>');
      changes.metadata.text.should.containDeep('Test document\n\nCitation\n\nNormal text');

      done();
    });
  });

  it('should return an error', function(done) {
    var document = {
      data: {},
    };

    var changes = anyfetchHydrater.defaultChanges();

    markdown(__dirname + "/samples/notfound.md", document, changes, function(err) {
      if(err) {
        done();
      } else {
        done(new Error("It should have an error"));
      }
    });
  });
});