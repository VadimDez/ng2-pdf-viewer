"use strict";
var $__fround_46_js__,
    $__utils_46_js__;
var jsFround = ($__fround_46_js__ = require("./fround.js"), $__fround_46_js__ && $__fround_46_js__.__esModule && $__fround_46_js__ || {default: $__fround_46_js__}).fround;
var $__1 = ($__utils_46_js__ = require("./utils.js"), $__utils_46_js__ && $__utils_46_js__.__esModule && $__utils_46_js__ || {default: $__utils_46_js__}),
    maybeAddFunctions = $__1.maybeAddFunctions,
    registerPolyfill = $__1.registerPolyfill,
    toUint32 = $__1.toUint32;
var $isFinite = isFinite;
var $isNaN = isNaN;
var $__4 = Math,
    abs = $__4.abs,
    ceil = $__4.ceil,
    exp = $__4.exp,
    floor = $__4.floor,
    log = $__4.log,
    pow = $__4.pow,
    sqrt = $__4.sqrt;
function clz32(x) {
  x = toUint32(+x);
  if (x == 0)
    return 32;
  var result = 0;
  if ((x & 0xFFFF0000) === 0) {
    x <<= 16;
    result += 16;
  }
  ;
  if ((x & 0xFF000000) === 0) {
    x <<= 8;
    result += 8;
  }
  ;
  if ((x & 0xF0000000) === 0) {
    x <<= 4;
    result += 4;
  }
  ;
  if ((x & 0xC0000000) === 0) {
    x <<= 2;
    result += 2;
  }
  ;
  if ((x & 0x80000000) === 0) {
    x <<= 1;
    result += 1;
  }
  ;
  return result;
}
function imul(x, y) {
  x = toUint32(+x);
  y = toUint32(+y);
  var xh = (x >>> 16) & 0xffff;
  var xl = x & 0xffff;
  var yh = (y >>> 16) & 0xffff;
  var yl = y & 0xffff;
  return xl * yl + (((xh * yl + xl * yh) << 16) >>> 0) | 0;
}
function sign(x) {
  x = +x;
  if (x > 0)
    return 1;
  if (x < 0)
    return -1;
  return x;
}
function log10(x) {
  return log(x) * 0.434294481903251828;
}
function log2(x) {
  return log(x) * 1.442695040888963407;
}
function log1p(x) {
  x = +x;
  if (x < -1 || $isNaN(x)) {
    return NaN;
  }
  if (x === 0 || x === Infinity) {
    return x;
  }
  if (x === -1) {
    return -Infinity;
  }
  var result = 0;
  var n = 50;
  if (x < 0 || x > 1) {
    return log(1 + x);
  }
  for (var i = 1; i < n; i++) {
    if ((i % 2) === 0) {
      result -= pow(x, i) / i;
    } else {
      result += pow(x, i) / i;
    }
  }
  return result;
}
function expm1(x) {
  x = +x;
  if (x === -Infinity) {
    return -1;
  }
  if (!$isFinite(x) || x === 0) {
    return x;
  }
  return exp(x) - 1;
}
function cosh(x) {
  x = +x;
  if (x === 0) {
    return 1;
  }
  if ($isNaN(x)) {
    return NaN;
  }
  if (!$isFinite(x)) {
    return Infinity;
  }
  if (x < 0) {
    x = -x;
  }
  if (x > 21) {
    return exp(x) / 2;
  }
  return (exp(x) + exp(-x)) / 2;
}
function sinh(x) {
  x = +x;
  if (!$isFinite(x) || x === 0) {
    return x;
  }
  return (exp(x) - exp(-x)) / 2;
}
function tanh(x) {
  x = +x;
  if (x === 0)
    return x;
  if (!$isFinite(x))
    return sign(x);
  var exp1 = exp(x);
  var exp2 = exp(-x);
  return (exp1 - exp2) / (exp1 + exp2);
}
function acosh(x) {
  x = +x;
  if (x < 1)
    return NaN;
  if (!$isFinite(x))
    return x;
  return log(x + sqrt(x + 1) * sqrt(x - 1));
}
function asinh(x) {
  x = +x;
  if (x === 0 || !$isFinite(x))
    return x;
  if (x > 0)
    return log(x + sqrt(x * x + 1));
  return -log(-x + sqrt(x * x + 1));
}
function atanh(x) {
  x = +x;
  if (x === -1) {
    return -Infinity;
  }
  if (x === 1) {
    return Infinity;
  }
  if (x === 0) {
    return x;
  }
  if ($isNaN(x) || x < -1 || x > 1) {
    return NaN;
  }
  return 0.5 * log((1 + x) / (1 - x));
}
function hypot(x, y) {
  var length = arguments.length;
  var args = new Array(length);
  var max = 0;
  for (var i = 0; i < length; i++) {
    var n = arguments[i];
    n = +n;
    if (n === Infinity || n === -Infinity)
      return Infinity;
    n = abs(n);
    if (n > max)
      max = n;
    args[i] = n;
  }
  if (max === 0)
    max = 1;
  var sum = 0;
  var compensation = 0;
  for (var i = 0; i < length; i++) {
    var n = args[i] / max;
    var summand = n * n - compensation;
    var preliminary = sum + summand;
    compensation = (preliminary - sum) - summand;
    sum = preliminary;
  }
  return sqrt(sum) * max;
}
function trunc(x) {
  x = +x;
  if (x > 0)
    return floor(x);
  if (x < 0)
    return ceil(x);
  return x;
}
var fround,
    f32;
if (typeof Float32Array === 'function') {
  f32 = new Float32Array(1);
  fround = function(x) {
    f32[0] = Number(x);
    return f32[0];
  };
} else {
  fround = jsFround;
}
function cbrt(x) {
  x = +x;
  if (x === 0)
    return x;
  var negate = x < 0;
  if (negate)
    x = -x;
  var result = pow(x, 1 / 3);
  return negate ? -result : result;
}
function polyfillMath(global) {
  var Math = global.Math;
  maybeAddFunctions(Math, ['acosh', acosh, 'asinh', asinh, 'atanh', atanh, 'cbrt', cbrt, 'clz32', clz32, 'cosh', cosh, 'expm1', expm1, 'fround', fround, 'hypot', hypot, 'imul', imul, 'log10', log10, 'log1p', log1p, 'log2', log2, 'sign', sign, 'sinh', sinh, 'tanh', tanh, 'trunc', trunc]);
}
registerPolyfill(polyfillMath);
Object.defineProperties(module.exports, {
  clz32: {get: function() {
      return clz32;
    }},
  imul: {get: function() {
      return imul;
    }},
  sign: {get: function() {
      return sign;
    }},
  log10: {get: function() {
      return log10;
    }},
  log2: {get: function() {
      return log2;
    }},
  log1p: {get: function() {
      return log1p;
    }},
  expm1: {get: function() {
      return expm1;
    }},
  cosh: {get: function() {
      return cosh;
    }},
  sinh: {get: function() {
      return sinh;
    }},
  tanh: {get: function() {
      return tanh;
    }},
  acosh: {get: function() {
      return acosh;
    }},
  asinh: {get: function() {
      return asinh;
    }},
  atanh: {get: function() {
      return atanh;
    }},
  hypot: {get: function() {
      return hypot;
    }},
  trunc: {get: function() {
      return trunc;
    }},
  fround: {get: function() {
      return fround;
    }},
  cbrt: {get: function() {
      return cbrt;
    }},
  polyfillMath: {get: function() {
      return polyfillMath;
    }},
  __esModule: {value: true}
});
