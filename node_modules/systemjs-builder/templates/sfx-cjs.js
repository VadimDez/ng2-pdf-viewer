(function(factory) {
  module.exports = factory(${deps.map(function(dep) {
    return 'require("' + dep + '")';
  }).join(', ')});
});