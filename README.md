# read-font-cmap

[![NPM version](https://img.shields.io/npm/v/read-font-cmap.svg)](https://www.npmjs.com/package/read-font-cmap)
[![Build Status](https://travis-ci.org/shinnn/read-font-cmap.svg?branch=master)](https://travis-ci.org/shinnn/read-font-cmap)
[![Build status](https://ci.appveyor.com/api/projects/status/507uq9x81gspk8wb?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/read-font-cmap)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/read-font-cmap.svg)](https://coveralls.io/r/shinnn/read-font-cmap)
[![Dependency Status](https://img.shields.io/david/shinnn/read-font-cmap.svg?label=deps)](https://david-dm.org/shinnn/read-font-cmap)
[![devDependency Status](https://img.shields.io/david/dev/shinnn/read-font-cmap.svg?label=devDeps)](https://david-dm.org/shinnn/read-font-cmap#info=devDependencies)

A [Node](http://nodejs.org/) module to parse [CMap](https://www.microsoft.com/typography/otspec/cmap.htm) of a TrueType/OpenType font file

```javascript
const readFontCmap = require('read-font-cmap');

readFontCmap('bower_components/font-awesome/fonts/FontAwesome.otf', (err, map) => {
  if (err) {
    throw err;
  }

  console.log(map); // yields: '{"32": 1, "168": 6, "169": 12, "174": 10, ... }'
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install read-font-cmap
```

## API

```javascript
const readFontCmap = require('read-font-cmap');
```

### readFontCmap(*filePath*, *callback*)

*filePath*: `String` (font file path)  
*callback*: `Function`

It reads and parses a TrueType/OpenType font file asynchronously, then runs callback function.

#### callback(*error*, *cmap*)

*error*: `Object` (an error if it fails to parse the font, otherwise `null`)  
*cmap*: `Object`

The second argument represents CMap table in the form:

```json
{
  "Unicode value (integer)": "Glyph ID (integer)"
}
```

[Here](https://raw.githubusercontent.com/shinnn/read-font-cmap/master/test/fixture.json) is a real-life example, the result of parsing [Font Awesome](https://fortawesome.github.io/Font-Awesome/) CMap table.

### readFontCmap.sync(*filePath*)

*filePath*: `String` (font file path)  
Return: `Object` (CMap table)

Synchronous version of [`readFontCmap`](#readfontcmapfilepath-callback).

```javascript
const readFontCmap = require('read-font-cmap');
readFontCmap.sync('bower_components/font-awesome/fonts/FontAwesome.otf');
//=> {"32": 1, "168": 6, "169": 12, "174": 10, ... }
```

## License

Copyright (c) 2014 - 2015 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
