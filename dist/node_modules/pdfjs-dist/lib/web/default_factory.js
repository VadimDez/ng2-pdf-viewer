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
exports.DefaultXfaLayerFactory = exports.DefaultTextLayerFactory = exports.DefaultStructTreeLayerFactory = exports.DefaultAnnotationLayerFactory = void 0;

var _annotation_layer_builder = require("./annotation_layer_builder.js");

var _l10n_utils = require("./l10n_utils.js");

var _pdf_link_service = require("./pdf_link_service.js");

var _struct_tree_layer_builder = require("./struct_tree_layer_builder.js");

var _text_layer_builder = require("./text_layer_builder.js");

var _xfa_layer_builder = require("./xfa_layer_builder.js");

class DefaultAnnotationLayerFactory {
  createAnnotationLayerBuilder(pageDiv, pdfPage, annotationStorage = null, imageResourcesPath = "", renderForms = true, l10n = _l10n_utils.NullL10n, enableScripting = false, hasJSActionsPromise = null, mouseState = null, fieldObjectsPromise = null, annotationCanvasMap = null) {
    return new _annotation_layer_builder.AnnotationLayerBuilder({
      pageDiv,
      pdfPage,
      imageResourcesPath,
      renderForms,
      linkService: new _pdf_link_service.SimpleLinkService(),
      l10n,
      annotationStorage,
      enableScripting,
      hasJSActionsPromise,
      fieldObjectsPromise,
      mouseState,
      annotationCanvasMap
    });
  }

}

exports.DefaultAnnotationLayerFactory = DefaultAnnotationLayerFactory;

class DefaultStructTreeLayerFactory {
  createStructTreeLayerBuilder(pdfPage) {
    return new _struct_tree_layer_builder.StructTreeLayerBuilder({
      pdfPage
    });
  }

}

exports.DefaultStructTreeLayerFactory = DefaultStructTreeLayerFactory;

class DefaultTextLayerFactory {
  createTextLayerBuilder(textLayerDiv, pageIndex, viewport, enhanceTextSelection = false, eventBus, highlighter) {
    return new _text_layer_builder.TextLayerBuilder({
      textLayerDiv,
      pageIndex,
      viewport,
      enhanceTextSelection,
      eventBus,
      highlighter
    });
  }

}

exports.DefaultTextLayerFactory = DefaultTextLayerFactory;

class DefaultXfaLayerFactory {
  createXfaLayerBuilder(pageDiv, pdfPage, annotationStorage = null, xfaHtml = null) {
    return new _xfa_layer_builder.XfaLayerBuilder({
      pageDiv,
      pdfPage,
      annotationStorage,
      linkService: new _pdf_link_service.SimpleLinkService(),
      xfaHtml
    });
  }

}

exports.DefaultXfaLayerFactory = DefaultXfaLayerFactory;