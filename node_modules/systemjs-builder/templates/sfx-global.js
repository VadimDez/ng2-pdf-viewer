(function(factory) {
  ${globalName ? globalName + ' = ' : ''}factory(${globalDeps.join(', ')});
});