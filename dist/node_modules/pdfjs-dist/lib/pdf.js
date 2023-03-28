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
Object.defineProperty(exports, "AnnotationLayer", {
  enumerable: true,
  get: function () {
    return _annotation_layer.AnnotationLayer;
  }
});
Object.defineProperty(exports, "AnnotationMode", {
  enumerable: true,
  get: function () {
    return _util.AnnotationMode;
  }
});
Object.defineProperty(exports, "CMapCompressionType", {
  enumerable: true,
  get: function () {
    return _util.CMapCompressionType;
  }
});
Object.defineProperty(exports, "GlobalWorkerOptions", {
  enumerable: true,
  get: function () {
    return _worker_options.GlobalWorkerOptions;
  }
});
Object.defineProperty(exports, "InvalidPDFException", {
  enumerable: true,
  get: function () {
    return _util.InvalidPDFException;
  }
});
Object.defineProperty(exports, "LoopbackPort", {
  enumerable: true,
  get: function () {
    return _api.LoopbackPort;
  }
});
Object.defineProperty(exports, "MissingPDFException", {
  enumerable: true,
  get: function () {
    return _util.MissingPDFException;
  }
});
Object.defineProperty(exports, "OPS", {
  enumerable: true,
  get: function () {
    return _util.OPS;
  }
});
Object.defineProperty(exports, "PDFDataRangeTransport", {
  enumerable: true,
  get: function () {
    return _api.PDFDataRangeTransport;
  }
});
Object.defineProperty(exports, "PDFDateString", {
  enumerable: true,
  get: function () {
    return _display_utils.PDFDateString;
  }
});
Object.defineProperty(exports, "PDFWorker", {
  enumerable: true,
  get: function () {
    return _api.PDFWorker;
  }
});
Object.defineProperty(exports, "PasswordResponses", {
  enumerable: true,
  get: function () {
    return _util.PasswordResponses;
  }
});
Object.defineProperty(exports, "PermissionFlag", {
  enumerable: true,
  get: function () {
    return _util.PermissionFlag;
  }
});
Object.defineProperty(exports, "PixelsPerInch", {
  enumerable: true,
  get: function () {
    return _display_utils.PixelsPerInch;
  }
});
Object.defineProperty(exports, "RenderingCancelledException", {
  enumerable: true,
  get: function () {
    return _display_utils.RenderingCancelledException;
  }
});
Object.defineProperty(exports, "SVGGraphics", {
  enumerable: true,
  get: function () {
    return _svg.SVGGraphics;
  }
});
Object.defineProperty(exports, "UNSUPPORTED_FEATURES", {
  enumerable: true,
  get: function () {
    return _util.UNSUPPORTED_FEATURES;
  }
});
Object.defineProperty(exports, "UnexpectedResponseException", {
  enumerable: true,
  get: function () {
    return _util.UnexpectedResponseException;
  }
});
Object.defineProperty(exports, "Util", {
  enumerable: true,
  get: function () {
    return _util.Util;
  }
});
Object.defineProperty(exports, "VerbosityLevel", {
  enumerable: true,
  get: function () {
    return _util.VerbosityLevel;
  }
});
Object.defineProperty(exports, "XfaLayer", {
  enumerable: true,
  get: function () {
    return _xfa_layer.XfaLayer;
  }
});
Object.defineProperty(exports, "build", {
  enumerable: true,
  get: function () {
    return _api.build;
  }
});
Object.defineProperty(exports, "createPromiseCapability", {
  enumerable: true,
  get: function () {
    return _util.createPromiseCapability;
  }
});
Object.defineProperty(exports, "createValidAbsoluteUrl", {
  enumerable: true,
  get: function () {
    return _util.createValidAbsoluteUrl;
  }
});
Object.defineProperty(exports, "getDocument", {
  enumerable: true,
  get: function () {
    return _api.getDocument;
  }
});
Object.defineProperty(exports, "getFilenameFromUrl", {
  enumerable: true,
  get: function () {
    return _display_utils.getFilenameFromUrl;
  }
});
Object.defineProperty(exports, "getPdfFilenameFromUrl", {
  enumerable: true,
  get: function () {
    return _display_utils.getPdfFilenameFromUrl;
  }
});
Object.defineProperty(exports, "getXfaPageViewport", {
  enumerable: true,
  get: function () {
    return _display_utils.getXfaPageViewport;
  }
});
Object.defineProperty(exports, "isPdfFile", {
  enumerable: true,
  get: function () {
    return _display_utils.isPdfFile;
  }
});
Object.defineProperty(exports, "loadScript", {
  enumerable: true,
  get: function () {
    return _display_utils.loadScript;
  }
});
Object.defineProperty(exports, "renderTextLayer", {
  enumerable: true,
  get: function () {
    return _text_layer.renderTextLayer;
  }
});
Object.defineProperty(exports, "shadow", {
  enumerable: true,
  get: function () {
    return _util.shadow;
  }
});
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function () {
    return _api.version;
  }
});

var _util = require("./shared/util.js");

var _api = require("./display/api.js");

var _display_utils = require("./display/display_utils.js");

var _annotation_layer = require("./display/annotation_layer.js");

var _worker_options = require("./display/worker_options.js");

var _is_node = require("./shared/is_node.js");

var _text_layer = require("./display/text_layer.js");

var _svg = require("./display/svg.js");

var _xfa_layer = require("./display/xfa_layer.js");

const pdfjsVersion = '2.14.305';
const pdfjsBuild = 'eaaa8b4ad';
{
  if (_is_node.isNodeJS) {
    const {
      PDFNodeStream
    } = require("./display/node_stream.js");

    (0, _api.setPDFNetworkStreamFactory)(params => {
      return new PDFNodeStream(params);
    });
  } else {
    const {
      PDFNetworkStream
    } = require("./display/network.js");

    const {
      PDFFetchStream
    } = require("./display/fetch_stream.js");

    (0, _api.setPDFNetworkStreamFactory)(params => {
      if ((0, _display_utils.isValidFetchUrl)(params.url)) {
        return new PDFFetchStream(params);
      }

      return new PDFNetworkStream(params);
    });
  }
}