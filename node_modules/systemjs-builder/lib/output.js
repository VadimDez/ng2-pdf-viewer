var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');
var Promise = require('bluebird');
var asp = require('bluebird').promisify;
var extend = require('./utils').extend;

var fromFileURL = require('./utils').fromFileURL;
var toFileURL = require('./utils').toFileURL;

function countLines(str) {
  return str.split(/\r\n|\r|\n/).length;
}

// Process compiler outputs, gathering:
//
//   concatOutputs:         list of source strings to concatenate
//   sourceMapsWithOffsets: list of [absolute offset,
//                                   source map string] pairs
//
//  Takes lists as empty references and populates via push.
function processOutputs(outputs) {
  var removeSourceMaps = require('./sourcemaps').removeSourceMaps;

  var offset = 0;

  var outputObj = {};

  var sources = outputObj.sources = [];
  var sourceMapsWithOffsets = outputObj.sourceMapsWithOffsets = [];

  outputs.forEach(function(output) {
    var source;
    if (typeof output == 'object') {
      source = output.source || '';
      var offset_ = output.sourceMapOffset || 0;
      var map = output.sourceMap;
      if (map) {
        sourceMapsWithOffsets.push([offset + offset_, map]);
      }
    }
    // NB perhaps we should enforce output is always an object down the chain?
    else if (typeof output == 'string') {
      source = output;
    }
    else {
      throw "Unexpected output format: " + output.toString();
    }
    source = removeSourceMaps(source || '');
    offset += countLines(source);
    sources.push(source);
  });

  return outputObj;
}

function createOutput(outFile, outputs, basePath, sourceMaps, sourceMapContents) {
  var concatenateSourceMaps = require('./sourcemaps').concatenateSourceMaps;

  var outputObj = processOutputs(outputs);

  if (sourceMaps)
    var sourceMap = concatenateSourceMaps(outFile, outputObj.sourceMapsWithOffsets, basePath, sourceMapContents);

  var output = outputObj.sources.join('\n');

  return {
    source: output,
    sourceMap: sourceMap
  };
}

function minify(output, fileName, mangle, uglifyOpts) {
  var uglify = require('uglify-js');
  var ast;
  try{
    ast = uglify.parse(output.source, { filename: fileName });
  } catch(e){
    throw new Error(e);
  }
  ast.figure_out_scope();
  
  ast = ast.transform(uglify.Compressor(uglifyOpts.compress));
  ast.figure_out_scope();
  if (mangle !== false)
    ast.mangle_names();

  var sourceMap;
  if (output.sourceMap) {
    if (typeof output.sourceMap === 'string')
      output.sourceMap = JSON.parse(output.sourceMap);

    var sourceMapIn = output.sourceMap;
    sourceMap = uglify.SourceMap({
      file: fileName,
      orig: sourceMapIn
    });

    if (uglifyOpts.sourceMapIncludeSources && sourceMapIn && Array.isArray(sourceMapIn.sourcesContent)) {
      sourceMapIn.sourcesContent.forEach(function(content, idx) {
        sourceMap.get().setSourceContent(sourceMapIn.sources[idx], content);
      });
    }
  }

  var outputOptions = uglifyOpts.beautify;
  // keep first comment
  outputOptions.comments = outputOptions.comments || function(node, comment) {
    return comment.line === 1 && comment.col === 0;
  };
  outputOptions.source_map = sourceMap;

  output.source = ast.print_to_string(outputOptions);
  output.sourceMap = sourceMap;

  return output;
}

function writeOutputFile(outFile, source, sourceMap) {
  var outDir = path.dirname(outFile);

  return asp(mkdirp)(path.dirname(outFile))
  .then(function() {
    if (!sourceMap)
      return;

    var sourceMapFileName = path.basename(outFile) + '.map';
    source += '\n//# sourceMappingURL=' + sourceMapFileName;
    
    return asp(fs.writeFile)(path.resolve(outDir, sourceMapFileName), sourceMap);
  })
  .then(function() {
    return asp(fs.writeFile)(outFile, source);
  });
}

exports.inlineSourceMap = inlineSourceMap;
function inlineSourceMap(source, sourceMap) {
  if (!sourceMap)
    throw new Error('NOTHING TO INLINE');
  return source + '\n//# sourceMappingURL=data:application/json;base64,'
      + new Buffer(sourceMap.toString()).toString('base64');
}

exports.writeOutputs = function(outputs, baseURL, outputOpts) {
  var outFile = outputOpts.outFile && path.resolve(outputOpts.outFile);
  var basePath = fromFileURL(baseURL);
  var fileName = outFile && path.basename(outFile) || 'output.js';

  var output = createOutput(outFile || path.resolve(basePath, fileName), outputs, basePath, outputOpts.sourceMaps, outputOpts.sourceMapContents);

  if (outputOpts.minify)
    output = minify(output, fileName, outputOpts.mangle, outputOpts.uglify);

  if (outputOpts.sourceMaps == 'inline') {
    output.source = inlineSourceMap(output.source, output.sourceMap);
    output.sourceMap = undefined;
  }

  if (!outputOpts.outFile)
    return Promise.resolve(output);

  return writeOutputFile(outFile, output.source, output.sourceMap).then(function() {
    return output;
  });
};
