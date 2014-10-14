/*!
 * read-font-cmap | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/read-font-cmap
*/
'use strict';

var fs = require('fs');

var fontCmap = require('font-cmap');

module.exports = function readFontCmap(filePath, cb) {
  if (typeof cb !== 'function') {
    throw new TypeError('Expecting a callback function as a second argument.');
  }

  fs.readFile(filePath, function(err, buf) {
    if (err) {
      cb(err);
      return;
    }

    var map;

    try {
      map = fontCmap(buf);
    } catch (e) {
      err = e;
    }

    cb(err, map);
  });
};

module.exports.sync = function readFontCmap(filePath) {
  return fontCmap(fs.readFileSync(filePath));
};
