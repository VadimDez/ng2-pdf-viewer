/* Copyright 2017 Mozilla Foundation
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
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PDFSidebarResizer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ui_utils = require('./ui_utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SIDEBAR_WIDTH_VAR = '--sidebar-width';
var SIDEBAR_MIN_WIDTH = 200;
var SIDEBAR_RESIZING_CLASS = 'sidebarResizing';

var PDFSidebarResizer = function () {
  function PDFSidebarResizer(options, eventBus) {
    var _this = this;

    var l10n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _ui_utils.NullL10n;

    _classCallCheck(this, PDFSidebarResizer);

    this.enabled = false;
    this.isRTL = false;
    this.sidebarOpen = false;
    this.doc = document.documentElement;
    this._width = null;
    this._outerContainerWidth = null;
    this._boundEvents = Object.create(null);
    this.outerContainer = options.outerContainer;
    this.resizer = options.resizer;
    this.eventBus = eventBus;
    this.l10n = l10n;
    if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function' || !CSS.supports(SIDEBAR_WIDTH_VAR, 'calc(-1 * ' + SIDEBAR_MIN_WIDTH + 'px)')) {
      console.warn('PDFSidebarResizer: ' + 'The browser does not support resizing of the sidebar.');
      return;
    }
    this.enabled = true;
    this.resizer.classList.remove('hidden');
    this.l10n.getDirection().then(function (dir) {
      _this.isRTL = dir === 'rtl';
    });
    this._addEventListeners();
  }

  _createClass(PDFSidebarResizer, [{
    key: '_updateWidth',
    value: function _updateWidth() {
      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (!this.enabled) {
        return false;
      }
      var maxWidth = Math.floor(this.outerContainerWidth / 2);
      if (width > maxWidth) {
        width = maxWidth;
      }
      if (width < SIDEBAR_MIN_WIDTH) {
        width = SIDEBAR_MIN_WIDTH;
      }
      if (width === this._width) {
        return false;
      }
      this._width = width;
      this.doc.style.setProperty(SIDEBAR_WIDTH_VAR, width + 'px');
      return true;
    }
  }, {
    key: '_mouseMove',
    value: function _mouseMove(evt) {
      var width = evt.clientX;
      if (this.isRTL) {
        width = this.outerContainerWidth - width;
      }
      this._updateWidth(width);
    }
  }, {
    key: '_mouseUp',
    value: function _mouseUp(evt) {
      this.outerContainer.classList.remove(SIDEBAR_RESIZING_CLASS);
      this.eventBus.dispatch('resize', { source: this });
      var _boundEvents = this._boundEvents;
      window.removeEventListener('mousemove', _boundEvents.mouseMove);
      window.removeEventListener('mouseup', _boundEvents.mouseUp);
    }
  }, {
    key: '_addEventListeners',
    value: function _addEventListeners() {
      var _this2 = this;

      if (!this.enabled) {
        return;
      }
      var _boundEvents = this._boundEvents;
      _boundEvents.mouseMove = this._mouseMove.bind(this);
      _boundEvents.mouseUp = this._mouseUp.bind(this);
      this.resizer.addEventListener('mousedown', function (evt) {
        if (evt.button !== 0) {
          return;
        }
        _this2.outerContainer.classList.add(SIDEBAR_RESIZING_CLASS);
        window.addEventListener('mousemove', _boundEvents.mouseMove);
        window.addEventListener('mouseup', _boundEvents.mouseUp);
      });
      this.eventBus.on('sidebarviewchanged', function (evt) {
        _this2.sidebarOpen = !!(evt && evt.view);
      });
      this.eventBus.on('resize', function (evt) {
        if (evt && evt.source === window) {
          _this2._outerContainerWidth = null;
          if (_this2._width) {
            if (_this2.sidebarOpen) {
              _this2.outerContainer.classList.add(SIDEBAR_RESIZING_CLASS);
              var updated = _this2._updateWidth(_this2._width);
              Promise.resolve().then(function () {
                _this2.outerContainer.classList.remove(SIDEBAR_RESIZING_CLASS);
                if (updated) {
                  _this2.eventBus.dispatch('resize', { source: _this2 });
                }
              });
            } else {
              _this2._updateWidth(_this2._width);
            }
          }
        }
      });
    }
  }, {
    key: 'outerContainerWidth',
    get: function get() {
      if (!this._outerContainerWidth) {
        this._outerContainerWidth = this.outerContainer.clientWidth;
      }
      return this._outerContainerWidth;
    }
  }]);

  return PDFSidebarResizer;
}();

exports.PDFSidebarResizer = PDFSidebarResizer;