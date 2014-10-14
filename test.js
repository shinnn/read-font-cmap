'use strict';

var isPlainObject = require('lodash').isPlainObject;
var noop = require('nop');
var readFontCmap = require('./');
var test = require('tape');

var fontPath = 'node_modules/font-awesome/fonts/FontAwesome.otf';

test('readFontCmap()', function(t) {
  t.plan(8);

  readFontCmap(fontPath, function(err, map) {
    t.error(err, 'should read a font file.');
    t.ok(isPlainObject(map), 'should create glyph map object.');
  });

  t.throws(
    readFontCmap.bind(null), /function/,
    'should throw an error when it takes no arguments.'
  );

  t.throws(
    readFontCmap.bind(null, 1, noop), /path/,
    'should throw an error when it takes non-string argument.'
  );

  t.throws(
    readFontCmap.bind(null, fontPath), /function/,
    'should throw an error when it doesn\'t take the second argument.'
  );

  t.throws(
    readFontCmap.bind(null, fontPath, {foo: true}),
    /function/,
    'should throw an error when the second argument is not a function.'
  );

  readFontCmap('foo', function(err) {
    t.equal(err.code, 'ENOENT', 'should pass an error when the file doesn\'t exist.');
  });

  readFontCmap('package.json', function(err) {
    t.ok(
      /Unsupported OpenType version/.test(err),
      'should pass an error when the file is not a valid font file.'
    );
  });
});

test('readFontCmap.sync()', function(t) {
  t.plan(5);

  t.ok(
    isPlainObject(readFontCmap.sync(fontPath)),
    'should should create glyph map object.'
  );

  t.throws(
    readFontCmap.sync.bind(null), /path/,
    'should throw an error when it takes no arguments.'
  );

  t.throws(
    readFontCmap.sync.bind(null, [fontPath]), /path/,
    'should throw an error when it takes non-string argument.'
  );

  t.throws(
    readFontCmap.sync.bind(null, 'foo'), /ENOENT/,
    'should throw an error when the file doesn\'t exist.'
  );

  t.throws(
    readFontCmap.sync.bind(null, __filename), /Unsupported OpenType version/,
    'should pass an error when the file is not a valid font file.'
  );
});
