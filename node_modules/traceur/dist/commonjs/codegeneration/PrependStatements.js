"use strict";
function prependStatements(statements) {
  var $__3;
  for (var statementsToPrepend = [],
      $__2 = 1; $__2 < arguments.length; $__2++)
    statementsToPrepend[$__2 - 1] = arguments[$__2];
  if (!statements.length)
    return statementsToPrepend;
  if (!statementsToPrepend.length)
    return statements;
  var transformed = [];
  var inProlog = true;
  statements.forEach(function(statement) {
    var $__3;
    if (inProlog && !statement.isDirectivePrologue()) {
      ($__3 = transformed).push.apply($__3, $traceurRuntime.spread(statementsToPrepend));
      inProlog = false;
    }
    transformed.push(statement);
  });
  if (inProlog) {
    ($__3 = transformed).push.apply($__3, $traceurRuntime.spread(statementsToPrepend));
  }
  return transformed;
}
Object.defineProperties(module.exports, {
  prependStatements: {get: function() {
      return prependStatements;
    }},
  __esModule: {value: true}
});
