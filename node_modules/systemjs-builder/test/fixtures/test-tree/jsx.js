var babel = require('babel');

exports.translate = function(load) {
  var output = babel.transform(load.source, { modules: 'system', sourceMaps: true });
	load.source = output.code;
  load.metadata.sourceMap = output.map;
};
