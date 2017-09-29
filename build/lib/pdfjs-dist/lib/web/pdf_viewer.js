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
exports.PDFViewer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ui_utils = require('./ui_utils');

var _base_viewer = require('./base_viewer');

var _pdf = require('../pdf');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PDFViewer = function (_BaseViewer) {
  _inherits(PDFViewer, _BaseViewer);

  function PDFViewer() {
    _classCallCheck(this, PDFViewer);

    return _possibleConstructorReturn(this, (PDFViewer.__proto__ || Object.getPrototypeOf(PDFViewer)).apply(this, arguments));
  }

  _createClass(PDFViewer, [{
    key: '_scrollIntoView',
    value: function _scrollIntoView(_ref) {
      var pageDiv = _ref.pageDiv,
          _ref$pageSpot = _ref.pageSpot,
          pageSpot = _ref$pageSpot === undefined ? null : _ref$pageSpot;

      (0, _ui_utils.scrollIntoView)(pageDiv, pageSpot);
    }
  }, {
    key: '_getVisiblePages',
    value: function _getVisiblePages() {
      if (!this.isInPresentationMode) {
        return (0, _ui_utils.getVisibleElements)(this.container, this._pages, true);
      }
      var currentPage = this._pages[this._currentPageNumber - 1];
      var visible = [{
        id: currentPage.id,
        view: currentPage
      }];
      return {
        first: currentPage,
        last: currentPage,
        views: visible
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
      var currentId = this._currentPageNumber;
      var stillFullyVisible = false;
      for (var i = 0; i < numVisiblePages; ++i) {
        var page = visiblePages[i];
        if (page.percent < 100) {
          break;
        }
        if (page.id === currentId) {
          stillFullyVisible = true;
          break;
        }
      }
      if (!stillFullyVisible) {
        currentId = visiblePages[0].id;
      }
      if (!this.isInPresentationMode) {
        this._setCurrentPageNumber(currentId);
      }
      this._updateLocation(visible.first);
      this.eventBus.dispatch('updateviewarea', {
        source: this,
        location: this._location
      });
    }
  }, {
    key: '_setDocumentViewerElement',
    get: function get() {
      return (0, _pdf.shadow)(this, '_setDocumentViewerElement', this.viewer);
    }
  }]);

  return PDFViewer;
}(_base_viewer.BaseViewer);

exports.PDFViewer = PDFViewer;