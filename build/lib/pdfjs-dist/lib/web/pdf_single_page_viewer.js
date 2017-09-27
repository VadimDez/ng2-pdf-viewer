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
exports.PDFSinglePageViewer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _base_viewer = require('./base_viewer');

var _ui_utils = require('./ui_utils');

var _pdf = require('../pdf');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PDFSinglePageViewer = function (_BaseViewer) {
  _inherits(PDFSinglePageViewer, _BaseViewer);

  function PDFSinglePageViewer(options) {
    _classCallCheck(this, PDFSinglePageViewer);

    var _this = _possibleConstructorReturn(this, (PDFSinglePageViewer.__proto__ || Object.getPrototypeOf(PDFSinglePageViewer)).call(this, options));

    _this.eventBus.on('pagesinit', function (evt) {
      _this._ensurePageViewVisible();
    });
    return _this;
  }

  _createClass(PDFSinglePageViewer, [{
    key: '_resetView',
    value: function _resetView() {
      _get(PDFSinglePageViewer.prototype.__proto__ || Object.getPrototypeOf(PDFSinglePageViewer.prototype), '_resetView', this).call(this);
      this._previousPageNumber = 1;
      this._shadowViewer = document.createDocumentFragment();
    }
  }, {
    key: '_ensurePageViewVisible',
    value: function _ensurePageViewVisible() {
      var pageView = this._pages[this._currentPageNumber - 1];
      var previousPageView = this._pages[this._previousPageNumber - 1];
      var viewerNodes = this.viewer.childNodes;
      switch (viewerNodes.length) {
        case 0:
          this.viewer.appendChild(pageView.div);
          break;
        case 1:
          if (viewerNodes[0] !== previousPageView.div) {
            throw new Error('_ensurePageViewVisible: Unexpected previously visible page.');
          }
          if (pageView === previousPageView) {
            break;
          }
          this._shadowViewer.appendChild(previousPageView.div);
          this.viewer.appendChild(pageView.div);
          this.container.scrollTop = 0;
          break;
        default:
          throw new Error('_ensurePageViewVisible: Only one page should be visible at a time.');
      }
      this._previousPageNumber = this._currentPageNumber;
    }
  }, {
    key: '_scrollUpdate',
    value: function _scrollUpdate() {
      if (this._updateScrollDown) {
        this._updateScrollDown();
      }
      _get(PDFSinglePageViewer.prototype.__proto__ || Object.getPrototypeOf(PDFSinglePageViewer.prototype), '_scrollUpdate', this).call(this);
    }
  }, {
    key: '_scrollIntoView',
    value: function _scrollIntoView(_ref) {
      var _this2 = this;

      var pageDiv = _ref.pageDiv,
          _ref$pageSpot = _ref.pageSpot,
          pageSpot = _ref$pageSpot === undefined ? null : _ref$pageSpot,
          _ref$pageNumber = _ref.pageNumber,
          pageNumber = _ref$pageNumber === undefined ? null : _ref$pageNumber;

      if (pageNumber) {
        this._setCurrentPageNumber(pageNumber);
      }
      var scrolledDown = this._currentPageNumber >= this._previousPageNumber;
      var previousLocation = this._location;
      this._ensurePageViewVisible();
      (0, _ui_utils.scrollIntoView)(pageDiv, pageSpot);
      this._updateScrollDown = function () {
        _this2.scroll.down = scrolledDown;
        delete _this2._updateScrollDown;
      };
      setTimeout(function () {
        if (_this2._location === previousLocation) {
          if (_this2._updateScrollDown) {
            _this2._updateScrollDown();
          }
          _this2.update();
        }
      }, 0);
    }
  }, {
    key: '_getVisiblePages',
    value: function _getVisiblePages() {
      if (!this.pagesCount) {
        return { views: [] };
      }
      var pageView = this._pages[this._currentPageNumber - 1];
      var element = pageView.div;
      var view = {
        id: pageView.id,
        x: element.offsetLeft + element.clientLeft,
        y: element.offsetTop + element.clientTop,
        view: pageView
      };
      return {
        first: view,
        last: view,
        views: [view]
      };
    }
  }, {
    key: 'update',
    value: function update() {
      var visible = this._getVisiblePages();
      var visiblePages = visible.views,
          numVisiblePages = visiblePages.length;
      if (numVisiblePages === 0) {
        return;
      }
      this._resizeBuffer(numVisiblePages);
      this.renderingQueue.renderHighestPriority(visible);
      this._updateLocation(visible.first);
      this.eventBus.dispatch('updateviewarea', {
        source: this,
        location: this._location
      });
    }
  }, {
    key: '_setDocumentViewerElement',
    get: function get() {
      return (0, _pdf.shadow)(this, '_setDocumentViewerElement', this._shadowViewer);
    }
  }]);

  return PDFSinglePageViewer;
}(_base_viewer.BaseViewer);

exports.PDFSinglePageViewer = PDFSinglePageViewer;