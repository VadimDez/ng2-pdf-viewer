(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(${JSON.stringify(deps)}, factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(${deps.map(function(dep) {
    return 'require("' + dep + '")';
  }).join(', ')});
  else
    ${ deps.length && !globalDeps.length
      ? 'throw new Error("Module must be loaded as AMD or CommonJS")'
      : (globalName ? globalName + ' = ' : '') + 'factory(' + (globalDeps.length ? globalDeps.join(', ') : '') + ')'};
});