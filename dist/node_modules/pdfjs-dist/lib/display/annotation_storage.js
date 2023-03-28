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
exports.AnnotationStorage = void 0;

var _murmurhash = require("../shared/murmurhash3.js");

var _util = require("../shared/util.js");

class AnnotationStorage {
  constructor() {
    this._storage = new Map();
    this._modified = false;
    this.onSetModified = null;
    this.onResetModified = null;
  }

  getValue(key, defaultValue) {
    const value = this._storage.get(key);

    if (value === undefined) {
      return defaultValue;
    }

    return Object.assign(defaultValue, value);
  }

  getRawValue(key) {
    return this._storage.get(key);
  }

  setValue(key, value) {
    const obj = this._storage.get(key);

    let modified = false;

    if (obj !== undefined) {
      for (const [entry, val] of Object.entries(value)) {
        if (obj[entry] !== val) {
          modified = true;
          obj[entry] = val;
        }
      }
    } else {
      modified = true;

      this._storage.set(key, value);
    }

    if (modified) {
      this._setModified();
    }
  }

  getAll() {
    return this._storage.size > 0 ? (0, _util.objectFromMap)(this._storage) : null;
  }

  get size() {
    return this._storage.size;
  }

  _setModified() {
    if (!this._modified) {
      this._modified = true;

      if (typeof this.onSetModified === "function") {
        this.onSetModified();
      }
    }
  }

  resetModified() {
    if (this._modified) {
      this._modified = false;

      if (typeof this.onResetModified === "function") {
        this.onResetModified();
      }
    }
  }

  get serializable() {
    return this._storage.size > 0 ? this._storage : null;
  }

  get hash() {
    const hash = new _murmurhash.MurmurHash3_64();

    for (const [key, value] of this._storage) {
      hash.update(`${key}:${JSON.stringify(value)}`);
    }

    return hash.hexdigest();
  }

}

exports.AnnotationStorage = AnnotationStorage;