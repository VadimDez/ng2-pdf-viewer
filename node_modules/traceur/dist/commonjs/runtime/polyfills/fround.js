"use strict";
var $isFinite = isFinite;
var $isNaN = isNaN;
var $__2 = Math,
    LN2 = $__2.LN2,
    abs = $__2.abs,
    floor = $__2.floor,
    log = $__2.log,
    min = $__2.min,
    pow = $__2.pow;
function packIEEE754(v, ebits, fbits) {
  var bias = (1 << (ebits - 1)) - 1,
      s,
      e,
      f,
      ln,
      i,
      bits,
      str,
      bytes;
  function roundToEven(n) {
    var w = floor(n),
        f = n - w;
    if (f < 0.5)
      return w;
    if (f > 0.5)
      return w + 1;
    return w % 2 ? w + 1 : w;
  }
  if (v !== v) {
    e = (1 << ebits) - 1;
    f = pow(2, fbits - 1);
    s = 0;
  } else if (v === Infinity || v === -Infinity) {
    e = (1 << ebits) - 1;
    f = 0;
    s = (v < 0) ? 1 : 0;
  } else if (v === 0) {
    e = 0;
    f = 0;
    s = (1 / v === -Infinity) ? 1 : 0;
  } else {
    s = v < 0;
    v = abs(v);
    if (v >= pow(2, 1 - bias)) {
      e = min(floor(log(v) / LN2), 1023);
      f = roundToEven(v / pow(2, e) * pow(2, fbits));
      if (f / pow(2, fbits) >= 2) {
        e = e + 1;
        f = 1;
      }
      if (e > bias) {
        e = (1 << ebits) - 1;
        f = 0;
      } else {
        e = e + bias;
        f = f - pow(2, fbits);
      }
    } else {
      e = 0;
      f = roundToEven(v / pow(2, 1 - bias - fbits));
    }
  }
  bits = [];
  for (i = fbits; i; i -= 1) {
    bits.push(f % 2 ? 1 : 0);
    f = floor(f / 2);
  }
  for (i = ebits; i; i -= 1) {
    bits.push(e % 2 ? 1 : 0);
    e = floor(e / 2);
  }
  bits.push(s ? 1 : 0);
  bits.reverse();
  str = bits.join('');
  bytes = [];
  while (str.length) {
    bytes.push(parseInt(str.substring(0, 8), 2));
    str = str.substring(8);
  }
  return bytes;
}
function unpackIEEE754(bytes, ebits, fbits) {
  var bits = [],
      i,
      j,
      b,
      str,
      bias,
      s,
      e,
      f;
  for (i = bytes.length; i; i -= 1) {
    b = bytes[i - 1];
    for (j = 8; j; j -= 1) {
      bits.push(b % 2 ? 1 : 0);
      b = b >> 1;
    }
  }
  bits.reverse();
  str = bits.join('');
  bias = (1 << (ebits - 1)) - 1;
  s = parseInt(str.substring(0, 1), 2) ? -1 : 1;
  e = parseInt(str.substring(1, 1 + ebits), 2);
  f = parseInt(str.substring(1 + ebits), 2);
  if (e === (1 << ebits) - 1) {
    return f !== 0 ? NaN : s * Infinity;
  } else if (e > 0) {
    return s * pow(2, e - bias) * (1 + f / pow(2, fbits));
  } else if (f !== 0) {
    return s * pow(2, -(bias - 1)) * (f / pow(2, fbits));
  } else {
    return s < 0 ? -0 : 0;
  }
}
function unpackF32(b) {
  return unpackIEEE754(b, 8, 23);
}
function packF32(v) {
  return packIEEE754(v, 8, 23);
}
function fround(x) {
  if (x === 0 || !$isFinite(x) || $isNaN(x)) {
    return x;
  }
  return unpackF32(packF32(Number(x)));
}
Object.defineProperties(module.exports, {
  fround: {get: function() {
      return fround;
    }},
  __esModule: {value: true}
});
