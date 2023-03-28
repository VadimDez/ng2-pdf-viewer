/**
 * @licstart The following is the entire license notice for the
 * JavaScript code in this page
 *
 * Copyright 2022 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * JavaScript code in this page
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XRefParseException = exports.XRefEntryException = exports.ParserEOFException = exports.MissingDataException = exports.DocStats = void 0;
exports.collectActions = collectActions;
exports.encodeToXmlString = encodeToXmlString;
exports.escapePDFName = escapePDFName;
exports.getArrayLookupTableFactory = getArrayLookupTableFactory;
exports.getInheritableProperty = getInheritableProperty;
exports.getLookupTableFactory = getLookupTableFactory;
exports.isWhiteSpace = isWhiteSpace;
exports.log2 = log2;
exports.parseXFAPath = parseXFAPath;
exports.readInt8 = readInt8;
exports.readUint16 = readUint16;
exports.readUint32 = readUint32;
exports.recoverJsURL = recoverJsURL;
exports.toRomanNumerals = toRomanNumerals;
exports.validateCSSFont = validateCSSFont;

var _util = require("../shared/util.js");

var _primitives = require("./primitives.js");

var _base_stream = require("./base_stream.js");

function getLookupTableFactory(initializer) {
  let lookup;
  return function () {
    if (initializer) {
      lookup = Object.create(null);
      initializer(lookup);
      initializer = null;
    }

    return lookup;
  };
}

function getArrayLookupTableFactory(initializer) {
  let lookup;
  return function () {
    if (initializer) {
      let arr = initializer();
      initializer = null;
      lookup = Object.create(null);

      for (let i = 0, ii = arr.length; i < ii; i += 2) {
        lookup[arr[i]] = arr[i + 1];
      }

      arr = null;
    }

    return lookup;
  };
}

class MissingDataException extends _util.BaseException {
  constructor(begin, end) {
    super(`Missing data [${begin}, ${end})`, "MissingDataException");
    this.begin = begin;
    this.end = end;
  }

}

exports.MissingDataException = MissingDataException;

class ParserEOFException extends _util.BaseException {
  constructor(msg) {
    super(msg, "ParserEOFException");
  }

}

exports.ParserEOFException = ParserEOFException;

class XRefEntryException extends _util.BaseException {
  constructor(msg) {
    super(msg, "XRefEntryException");
  }

}

exports.XRefEntryException = XRefEntryException;

class XRefParseException extends _util.BaseException {
  constructor(msg) {
    super(msg, "XRefParseException");
  }

}

exports.XRefParseException = XRefParseException;

class DocStats {
  constructor(handler) {
    this._handler = handler;
    this._streamTypes = new Set();
    this._fontTypes = new Set();
  }

  _send() {
    const streamTypes = Object.create(null),
          fontTypes = Object.create(null);

    for (const type of this._streamTypes) {
      streamTypes[type] = true;
    }

    for (const type of this._fontTypes) {
      fontTypes[type] = true;
    }

    this._handler.send("DocStats", {
      streamTypes,
      fontTypes
    });
  }

  addStreamType(type) {
    if (this._streamTypes.has(type)) {
      return;
    }

    this._streamTypes.add(type);

    this._send();
  }

  addFontType(type) {
    if (this._fontTypes.has(type)) {
      return;
    }

    this._fontTypes.add(type);

    this._send();
  }

}

exports.DocStats = DocStats;

function getInheritableProperty({
  dict,
  key,
  getArray = false,
  stopWhenFound = true
}) {
  let values;
  const visited = new _primitives.RefSet();

  while (dict instanceof _primitives.Dict && !(dict.objId && visited.has(dict.objId))) {
    if (dict.objId) {
      visited.put(dict.objId);
    }

    const value = getArray ? dict.getArray(key) : dict.get(key);

    if (value !== undefined) {
      if (stopWhenFound) {
        return value;
      }

      if (!values) {
        values = [];
      }

      values.push(value);
    }

    dict = dict.get("Parent");
  }

  return values;
}

const ROMAN_NUMBER_MAP = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM", "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC", "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

function toRomanNumerals(number, lowerCase = false) {
  (0, _util.assert)(Number.isInteger(number) && number > 0, "The number should be a positive integer.");
  const romanBuf = [];
  let pos;

  while (number >= 1000) {
    number -= 1000;
    romanBuf.push("M");
  }

  pos = number / 100 | 0;
  number %= 100;
  romanBuf.push(ROMAN_NUMBER_MAP[pos]);
  pos = number / 10 | 0;
  number %= 10;
  romanBuf.push(ROMAN_NUMBER_MAP[10 + pos]);
  romanBuf.push(ROMAN_NUMBER_MAP[20 + number]);
  const romanStr = romanBuf.join("");
  return lowerCase ? romanStr.toLowerCase() : romanStr;
}

function log2(x) {
  if (x <= 0) {
    return 0;
  }

  return Math.ceil(Math.log2(x));
}

function readInt8(data, offset) {
  return data[offset] << 24 >> 24;
}

function readUint16(data, offset) {
  return data[offset] << 8 | data[offset + 1];
}

function readUint32(data, offset) {
  return (data[offset] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3]) >>> 0;
}

function isWhiteSpace(ch) {
  return ch === 0x20 || ch === 0x09 || ch === 0x0d || ch === 0x0a;
}

function parseXFAPath(path) {
  const positionPattern = /(.+)\[(\d+)\]$/;
  return path.split(".").map(component => {
    const m = component.match(positionPattern);

    if (m) {
      return {
        name: m[1],
        pos: parseInt(m[2], 10)
      };
    }

    return {
      name: component,
      pos: 0
    };
  });
}

function escapePDFName(str) {
  const buffer = [];
  let start = 0;

  for (let i = 0, ii = str.length; i < ii; i++) {
    const char = str.charCodeAt(i);

    if (char < 0x21 || char > 0x7e || char === 0x23 || char === 0x28 || char === 0x29 || char === 0x3c || char === 0x3e || char === 0x5b || char === 0x5d || char === 0x7b || char === 0x7d || char === 0x2f || char === 0x25) {
      if (start < i) {
        buffer.push(str.substring(start, i));
      }

      buffer.push(`#${char.toString(16)}`);
      start = i + 1;
    }
  }

  if (buffer.length === 0) {
    return str;
  }

  if (start < str.length) {
    buffer.push(str.substring(start, str.length));
  }

  return buffer.join("");
}

function _collectJS(entry, xref, list, parents) {
  if (!entry) {
    return;
  }

  let parent = null;

  if (entry instanceof _primitives.Ref) {
    if (parents.has(entry)) {
      return;
    }

    parent = entry;
    parents.put(parent);
    entry = xref.fetch(entry);
  }

  if (Array.isArray(entry)) {
    for (const element of entry) {
      _collectJS(element, xref, list, parents);
    }
  } else if (entry instanceof _primitives.Dict) {
    if ((0, _primitives.isName)(entry.get("S"), "JavaScript")) {
      const js = entry.get("JS");
      let code;

      if (js instanceof _base_stream.BaseStream) {
        code = js.getString();
      } else if (typeof js === "string") {
        code = js;
      }

      code = code && (0, _util.stringToPDFString)(code);

      if (code) {
        list.push(code);
      }
    }

    _collectJS(entry.getRaw("Next"), xref, list, parents);
  }

  if (parent) {
    parents.remove(parent);
  }
}

function collectActions(xref, dict, eventType) {
  const actions = Object.create(null);
  const additionalActionsDicts = getInheritableProperty({
    dict,
    key: "AA",
    stopWhenFound: false
  });

  if (additionalActionsDicts) {
    for (let i = additionalActionsDicts.length - 1; i >= 0; i--) {
      const additionalActions = additionalActionsDicts[i];

      if (!(additionalActions instanceof _primitives.Dict)) {
        continue;
      }

      for (const key of additionalActions.getKeys()) {
        const action = eventType[key];

        if (!action) {
          continue;
        }

        const actionDict = additionalActions.getRaw(key);
        const parents = new _primitives.RefSet();
        const list = [];

        _collectJS(actionDict, xref, list, parents);

        if (list.length > 0) {
          actions[action] = list;
        }
      }
    }
  }

  if (dict.has("A")) {
    const actionDict = dict.get("A");
    const parents = new _primitives.RefSet();
    const list = [];

    _collectJS(actionDict, xref, list, parents);

    if (list.length > 0) {
      actions.Action = list;
    }
  }

  return (0, _util.objectSize)(actions) > 0 ? actions : null;
}

const XMLEntities = {
  0x3c: "&lt;",
  0x3e: "&gt;",
  0x26: "&amp;",
  0x22: "&quot;",
  0x27: "&apos;"
};

function encodeToXmlString(str) {
  const buffer = [];
  let start = 0;

  for (let i = 0, ii = str.length; i < ii; i++) {
    const char = str.codePointAt(i);

    if (0x20 <= char && char <= 0x7e) {
      const entity = XMLEntities[char];

      if (entity) {
        if (start < i) {
          buffer.push(str.substring(start, i));
        }

        buffer.push(entity);
        start = i + 1;
      }
    } else {
      if (start < i) {
        buffer.push(str.substring(start, i));
      }

      buffer.push(`&#x${char.toString(16).toUpperCase()};`);

      if (char > 0xd7ff && (char < 0xe000 || char > 0xfffd)) {
        i++;
      }

      start = i + 1;
    }
  }

  if (buffer.length === 0) {
    return str;
  }

  if (start < str.length) {
    buffer.push(str.substring(start, str.length));
  }

  return buffer.join("");
}

function validateCSSFont(cssFontInfo) {
  const DEFAULT_CSS_FONT_OBLIQUE = "14";
  const DEFAULT_CSS_FONT_WEIGHT = "400";
  const CSS_FONT_WEIGHT_VALUES = new Set(["100", "200", "300", "400", "500", "600", "700", "800", "900", "1000", "normal", "bold", "bolder", "lighter"]);
  const {
    fontFamily,
    fontWeight,
    italicAngle
  } = cssFontInfo;

  if (/^".*"$/.test(fontFamily)) {
    if (/[^\\]"/.test(fontFamily.slice(1, fontFamily.length - 1))) {
      (0, _util.warn)(`XFA - FontFamily contains some unescaped ": ${fontFamily}.`);
      return false;
    }
  } else if (/^'.*'$/.test(fontFamily)) {
    if (/[^\\]'/.test(fontFamily.slice(1, fontFamily.length - 1))) {
      (0, _util.warn)(`XFA - FontFamily contains some unescaped ': ${fontFamily}.`);
      return false;
    }
  } else {
    for (const ident of fontFamily.split(/[ \t]+/)) {
      if (/^(\d|(-(\d|-)))/.test(ident) || !/^[\w-\\]+$/.test(ident)) {
        (0, _util.warn)(`XFA - FontFamily contains some invalid <custom-ident>: ${fontFamily}.`);
        return false;
      }
    }
  }

  const weight = fontWeight ? fontWeight.toString() : "";
  cssFontInfo.fontWeight = CSS_FONT_WEIGHT_VALUES.has(weight) ? weight : DEFAULT_CSS_FONT_WEIGHT;
  const angle = parseFloat(italicAngle);
  cssFontInfo.italicAngle = isNaN(angle) || angle < -90 || angle > 90 ? DEFAULT_CSS_FONT_OBLIQUE : italicAngle.toString();
  return true;
}

function recoverJsURL(str) {
  const URL_OPEN_METHODS = ["app.launchURL", "window.open", "xfa.host.gotoURL"];
  const regex = new RegExp("^\\s*(" + URL_OPEN_METHODS.join("|").split(".").join("\\.") + ")\\((?:'|\")([^'\"]*)(?:'|\")(?:,\\s*(\\w+)\\)|\\))", "i");
  const jsUrl = regex.exec(str);

  if (jsUrl && jsUrl[2]) {
    const url = jsUrl[2];
    let newWindow = false;

    if (jsUrl[3] === "true" && jsUrl[1] === "app.launchURL") {
      newWindow = true;
    }

    return {
      url,
      newWindow
    };
  }

  return null;
}