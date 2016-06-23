var sourceMap = require('source-map');
var path = require('path');
var fs = require('fs');

var toFileURL = require('./utils').toFileURL;
var fromFileURL = require('./utils').fromFileURL;

var wrapSourceMap = function(map) {
  return new sourceMap.SourceMapConsumer(map);
};

var sourceMapRegEx = /\/\/[@#] ?(sourceURL|sourceMappingURL)=([^\n'"]+)/;
exports.removeSourceMaps = function(source) {
  return source.replace(sourceMapRegEx, '');
};

function getMapObject(map) {
  if (typeof map != 'string')
    return map;

  try {
    return JSON.parse(map);
  }
  catch(error) {
    throw new Error('Invalid JSON: ' + map);
  }
}

function isFileURL(url) {
  return url.substr(0, 8) == 'file:///';
}

exports.concatenateSourceMaps = function(outFile, mapsWithOffsets, basePath, sourceMapContents) {
  var generated = new sourceMap.SourceMapGenerator({
    file: path.basename(outFile)
  });

  var outPath = path.dirname(outFile);

  var contentsBySource = sourceMapContents ? {} : null;

  mapsWithOffsets.forEach(function(pair) {
    var offset = pair[0];
    var map = getMapObject(pair[1]);

    if (sourceMapContents && map.sourcesContent) {
      for (var i=0; i<map.sources.length; i++) {
        var source = (map.sourceRoot || '') + map.sources[i];
        if (!source.match(/\/@traceur/)) {
          if (!contentsBySource[source]) {
            contentsBySource[source] = map.sourcesContent[i];
          } else {
            if (contentsBySource[source] != map.sourcesContent[i]) {
              throw new Error("Mismatched sourcesContent for: " + source);
            }
          }
        }
      }
    }

    wrapSourceMap(map).eachMapping(function(mapping) {
      if (!mapping.originalLine || !mapping.originalColumn || !mapping.source || mapping.source.match(/(\/|^)@traceur/))
        return;

      generated.addMapping({
        generated: {
          line: offset + mapping.generatedLine,
          column: mapping.generatedColumn
        },
        original: {
          line: mapping.originalLine,
          column: mapping.originalColumn
        },
        source: mapping.source,
        name: mapping.name
      });
    });
  });

  // normalize source paths and inject sourcesContent if necessary
  var normalized = JSON.parse(JSON.stringify(generated));

  if (sourceMapContents) {
    normalized.sourcesContent = normalized.sources.map(function(source) {
      if (contentsBySource[source])
        return contentsBySource[source];

      try {
        return fs.readFileSync(path.resolve(basePath, source)).toString();
      }
      catch (e) {
        return "";
      }
    });
  }

  normalized.sources = normalized.sources.map(function(source) {
    if (isFileURL(source))
      source = fromFileURL(source);

    return path.relative(outPath, path.resolve(basePath, source)).replace(/\\/g, '/');
  });

  return JSON.stringify(normalized);
};
