function hasProperties(obj) {
  for (var p in obj)
    return true;
  return false;
}

exports.compile = function(load, opts, loader) {
  try {
    var json = JSON.parse(load.source)
  }
  catch(e) {
    throw new Error('Unable to parse JSON module ' + load.name + ' contents as JSON.');
  }

  if (load.isPackageConfig)
    json = optimizePackageConfig(json);

  return Promise.resolve({
    source: opts.systemGlobal + '.registerDynamic(' + (opts.anonymous ? '' : '"' + load.name + '", ') + '[], false, function() {\n' +
            '  return ' + JSON.stringify(json, null, 2).replace(/\n/g, '\n  ') + ';\n' + 
            '});\n'
  });
};

// because bundles are for the browser only
// if this is a package config file json we are compiling
// then we can optimize out the node-only configurations to make it smaller
function optimizePackageConfig(json) {
  if (json.systemjs)
    json = json.systemjs;

  // remove non SystemJS package config properties
  var loaderConfigProperties = ['baseDir', 'defaultExtension', 'format', 'meta', 'map', 'main'];
  for (var p in json)
    if (loaderConfigProperties.indexOf(p) == -1)
      delete json[p];

  if (json.map && !json.map['@env']) {
    Object.keys(json.map).forEach(function(target) {
      var mapped = json.map[target];

      if (typeof mapped == 'string' && mapped.substr(0, 6) == '@node/')
        delete json.map[target];

      if (typeof mapped == 'object') {
        Object.keys(mapped).forEach(function(condition) {
          if (condition == 'node')
            delete mapped[condition];
        });
        if (!hasProperties(mapped))
          delete json.map[target];
      }
    });

    if (!hasProperties(json.map))
      delete json.map;
  }

  return json;
}

