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
exports.WorkerMessageHandler = exports.WorkerTask = exports.setPDFNetworkStreamClass = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _util = require('../shared/util');

var _pdf_manager = require('./pdf_manager');

var _primitives = require('./primitives');

var WorkerTask = function WorkerTaskClosure() {
  function WorkerTask(name) {
    this.name = name;
    this.terminated = false;
    this._capability = (0, _util.createPromiseCapability)();
  }
  WorkerTask.prototype = {
    get finished() {
      return this._capability.promise;
    },
    finish: function finish() {
      this._capability.resolve();
    },
    terminate: function terminate() {
      this.terminated = true;
    },
    ensureNotTerminated: function ensureNotTerminated() {
      if (this.terminated) {
        throw new Error('Worker task was terminated');
      }
    }
  };
  return WorkerTask;
}();
;
var PDFWorkerStream = function PDFWorkerStreamClosure() {
  function PDFWorkerStream(params, msgHandler) {
    this._queuedChunks = [];
    var initialData = params.initialData;
    if (initialData && initialData.length > 0) {
      this._queuedChunks.push(initialData);
    }
    this._msgHandler = msgHandler;
    this._isRangeSupported = !params.disableRange;
    this._isStreamingSupported = !params.disableStream;
    this._contentLength = params.length;
    this._fullRequestReader = null;
    this._rangeReaders = [];
    msgHandler.on('OnDataRange', this._onReceiveData.bind(this));
    msgHandler.on('OnDataProgress', this._onProgress.bind(this));
  }
  PDFWorkerStream.prototype = {
    _onReceiveData: function PDFWorkerStream_onReceiveData(args) {
      if (args.begin === undefined) {
        if (this._fullRequestReader) {
          this._fullRequestReader._enqueue(args.chunk);
        } else {
          this._queuedChunks.push(args.chunk);
        }
      } else {
        var found = this._rangeReaders.some(function (rangeReader) {
          if (rangeReader._begin !== args.begin) {
            return false;
          }
          rangeReader._enqueue(args.chunk);
          return true;
        });
        (0, _util.assert)(found);
      }
    },
    _onProgress: function PDFWorkerStream_onProgress(evt) {
      if (this._rangeReaders.length > 0) {
        var firstReader = this._rangeReaders[0];
        if (firstReader.onProgress) {
          firstReader.onProgress({ loaded: evt.loaded });
        }
      }
    },
    _removeRangeReader: function PDFWorkerStream_removeRangeReader(reader) {
      var i = this._rangeReaders.indexOf(reader);
      if (i >= 0) {
        this._rangeReaders.splice(i, 1);
      }
    },
    getFullReader: function PDFWorkerStream_getFullReader() {
      (0, _util.assert)(!this._fullRequestReader);
      var queuedChunks = this._queuedChunks;
      this._queuedChunks = null;
      return new PDFWorkerStreamReader(this, queuedChunks);
    },
    getRangeReader: function PDFWorkerStream_getRangeReader(begin, end) {
      var reader = new PDFWorkerStreamRangeReader(this, begin, end);
      this._msgHandler.send('RequestDataRange', {
        begin: begin,
        end: end
      });
      this._rangeReaders.push(reader);
      return reader;
    },
    cancelAllRequests: function PDFWorkerStream_cancelAllRequests(reason) {
      if (this._fullRequestReader) {
        this._fullRequestReader.cancel(reason);
      }
      var readers = this._rangeReaders.slice(0);
      readers.forEach(function (rangeReader) {
        rangeReader.cancel(reason);
      });
    }
  };
  function PDFWorkerStreamReader(stream, queuedChunks) {
    this._stream = stream;
    this._done = false;
    this._queuedChunks = queuedChunks || [];
    this._requests = [];
    this._headersReady = Promise.resolve();
    stream._fullRequestReader = this;
    this.onProgress = null;
  }
  PDFWorkerStreamReader.prototype = {
    _enqueue: function PDFWorkerStreamReader_enqueue(chunk) {
      if (this._done) {
        return;
      }
      if (this._requests.length > 0) {
        var requestCapability = this._requests.shift();
        requestCapability.resolve({
          value: chunk,
          done: false
        });
        return;
      }
      this._queuedChunks.push(chunk);
    },
    get headersReady() {
      return this._headersReady;
    },
    get isRangeSupported() {
      return this._stream._isRangeSupported;
    },
    get isStreamingSupported() {
      return this._stream._isStreamingSupported;
    },
    get contentLength() {
      return this._stream._contentLength;
    },
    read: function PDFWorkerStreamReader_read() {
      if (this._queuedChunks.length > 0) {
        var chunk = this._queuedChunks.shift();
        return Promise.resolve({
          value: chunk,
          done: false
        });
      }
      if (this._done) {
        return Promise.resolve({
          value: undefined,
          done: true
        });
      }
      var requestCapability = (0, _util.createPromiseCapability)();
      this._requests.push(requestCapability);
      return requestCapability.promise;
    },
    cancel: function PDFWorkerStreamReader_cancel(reason) {
      this._done = true;
      this._requests.forEach(function (requestCapability) {
        requestCapability.resolve({
          value: undefined,
          done: true
        });
      });
      this._requests = [];
    }
  };
  function PDFWorkerStreamRangeReader(stream, begin, end) {
    this._stream = stream;
    this._begin = begin;
    this._end = end;
    this._queuedChunk = null;
    this._requests = [];
    this._done = false;
    this.onProgress = null;
  }
  PDFWorkerStreamRangeReader.prototype = {
    _enqueue: function PDFWorkerStreamRangeReader_enqueue(chunk) {
      if (this._done) {
        return;
      }
      if (this._requests.length === 0) {
        this._queuedChunk = chunk;
      } else {
        var requestsCapability = this._requests.shift();
        requestsCapability.resolve({
          value: chunk,
          done: false
        });
        this._requests.forEach(function (requestCapability) {
          requestCapability.resolve({
            value: undefined,
            done: true
          });
        });
        this._requests = [];
      }
      this._done = true;
      this._stream._removeRangeReader(this);
    },
    get isStreamingSupported() {
      return false;
    },
    read: function PDFWorkerStreamRangeReader_read() {
      if (this._queuedChunk) {
        return Promise.resolve({
          value: this._queuedChunk,
          done: false
        });
      }
      if (this._done) {
        return Promise.resolve({
          value: undefined,
          done: true
        });
      }
      var requestCapability = (0, _util.createPromiseCapability)();
      this._requests.push(requestCapability);
      return requestCapability.promise;
    },
    cancel: function PDFWorkerStreamRangeReader_cancel(reason) {
      this._done = true;
      this._requests.forEach(function (requestCapability) {
        requestCapability.resolve({
          value: undefined,
          done: true
        });
      });
      this._requests = [];
      this._stream._removeRangeReader(this);
    }
  };
  return PDFWorkerStream;
}();
var PDFNetworkStream;
function setPDFNetworkStreamClass(cls) {
  PDFNetworkStream = cls;
}
var WorkerMessageHandler = {
  setup: function setup(handler, port) {
    var testMessageProcessed = false;
    handler.on('test', function wphSetupTest(data) {
      if (testMessageProcessed) {
        return;
      }
      testMessageProcessed = true;
      if (!(data instanceof Uint8Array)) {
        handler.send('test', 'main', false);
        return;
      }
      var supportTransfers = data[0] === 255;
      handler.postMessageTransfers = supportTransfers;
      var xhr = new XMLHttpRequest();
      var responseExists = 'response' in xhr;
      try {
        xhr.responseType;
      } catch (e) {
        responseExists = false;
      }
      if (!responseExists) {
        handler.send('test', false);
        return;
      }
      handler.send('test', {
        supportTypedArray: true,
        supportTransfers: supportTransfers
      });
    });
    handler.on('configure', function wphConfigure(data) {
      (0, _util.setVerbosityLevel)(data.verbosity);
    });
    handler.on('GetDocRequest', function wphSetupDoc(data) {
      return WorkerMessageHandler.createDocumentHandler(data, port);
    });
  },
  createDocumentHandler: function createDocumentHandler(docParams, port) {
    var pdfManager;
    var terminated = false;
    var cancelXHRs = null;
    var WorkerTasks = [];
    var docId = docParams.docId;
    var docBaseUrl = docParams.docBaseUrl;
    var workerHandlerName = docParams.docId + '_worker';
    var handler = new _util.MessageHandler(workerHandlerName, docId, port);
    handler.postMessageTransfers = docParams.postMessageTransfers;
    function ensureNotTerminated() {
      if (terminated) {
        throw new Error('Worker was terminated');
      }
    }
    function startWorkerTask(task) {
      WorkerTasks.push(task);
    }
    function finishWorkerTask(task) {
      task.finish();
      var i = WorkerTasks.indexOf(task);
      WorkerTasks.splice(i, 1);
    }
    function loadDocument(recoveryMode) {
      var loadDocumentCapability = (0, _util.createPromiseCapability)();
      var parseSuccess = function parseSuccess() {
        var numPagesPromise = pdfManager.ensureDoc('numPages');
        var fingerprintPromise = pdfManager.ensureDoc('fingerprint');
        var encryptedPromise = pdfManager.ensureXRef('encrypt');
        Promise.all([numPagesPromise, fingerprintPromise, encryptedPromise]).then(function onDocReady(results) {
          var doc = {
            numPages: results[0],
            fingerprint: results[1],
            encrypted: !!results[2]
          };
          loadDocumentCapability.resolve(doc);
        }, parseFailure);
      };
      var parseFailure = function parseFailure(e) {
        loadDocumentCapability.reject(e);
      };
      pdfManager.ensureDoc('checkHeader', []).then(function () {
        pdfManager.ensureDoc('parseStartXRef', []).then(function () {
          pdfManager.ensureDoc('parse', [recoveryMode]).then(parseSuccess, parseFailure);
        }, parseFailure);
      }, parseFailure);
      return loadDocumentCapability.promise;
    }
    function getPdfManager(data, evaluatorOptions) {
      var pdfManagerCapability = (0, _util.createPromiseCapability)();
      var pdfManager;
      var source = data.source;
      if (source.data) {
        try {
          pdfManager = new _pdf_manager.LocalPdfManager(docId, source.data, source.password, evaluatorOptions, docBaseUrl);
          pdfManagerCapability.resolve(pdfManager);
        } catch (ex) {
          pdfManagerCapability.reject(ex);
        }
        return pdfManagerCapability.promise;
      }
      var pdfStream;
      try {
        if (source.chunkedViewerLoading) {
          pdfStream = new PDFWorkerStream(source, handler);
        } else {
          (0, _util.assert)(PDFNetworkStream, './network module is not loaded');
          pdfStream = new PDFNetworkStream(data);
        }
      } catch (ex) {
        pdfManagerCapability.reject(ex);
        return pdfManagerCapability.promise;
      }
      var fullRequest = pdfStream.getFullReader();
      fullRequest.headersReady.then(function () {
        if (!fullRequest.isStreamingSupported || !fullRequest.isRangeSupported) {
          fullRequest.onProgress = function (evt) {
            handler.send('DocProgress', {
              loaded: evt.loaded,
              total: evt.total
            });
          };
        }
        if (!fullRequest.isRangeSupported) {
          return;
        }
        var disableAutoFetch = source.disableAutoFetch || fullRequest.isStreamingSupported;
        pdfManager = new _pdf_manager.NetworkPdfManager(docId, pdfStream, {
          msgHandler: handler,
          url: source.url,
          password: source.password,
          length: fullRequest.contentLength,
          disableAutoFetch: disableAutoFetch,
          rangeChunkSize: source.rangeChunkSize
        }, evaluatorOptions, docBaseUrl);
        pdfManagerCapability.resolve(pdfManager);
        cancelXHRs = null;
      }).catch(function (reason) {
        pdfManagerCapability.reject(reason);
        cancelXHRs = null;
      });
      var cachedChunks = [],
          loaded = 0;
      var flushChunks = function flushChunks() {
        var pdfFile = (0, _util.arraysToBytes)(cachedChunks);
        if (source.length && pdfFile.length !== source.length) {
          (0, _util.warn)('reported HTTP length is different from actual');
        }
        try {
          pdfManager = new _pdf_manager.LocalPdfManager(docId, pdfFile, source.password, evaluatorOptions, docBaseUrl);
          pdfManagerCapability.resolve(pdfManager);
        } catch (ex) {
          pdfManagerCapability.reject(ex);
        }
        cachedChunks = [];
      };
      var readPromise = new Promise(function (resolve, reject) {
        var readChunk = function readChunk(chunk) {
          try {
            ensureNotTerminated();
            if (chunk.done) {
              if (!pdfManager) {
                flushChunks();
              }
              cancelXHRs = null;
              return;
            }
            var data = chunk.value;
            loaded += (0, _util.arrayByteLength)(data);
            if (!fullRequest.isStreamingSupported) {
              handler.send('DocProgress', {
                loaded: loaded,
                total: Math.max(loaded, fullRequest.contentLength || 0)
              });
            }
            if (pdfManager) {
              pdfManager.sendProgressiveData(data);
            } else {
              cachedChunks.push(data);
            }
            fullRequest.read().then(readChunk, reject);
          } catch (e) {
            reject(e);
          }
        };
        fullRequest.read().then(readChunk, reject);
      });
      readPromise.catch(function (e) {
        pdfManagerCapability.reject(e);
        cancelXHRs = null;
      });
      cancelXHRs = function cancelXHRs() {
        pdfStream.cancelAllRequests('abort');
      };
      return pdfManagerCapability.promise;
    }
    function setupDoc(data) {
      function onSuccess(doc) {
        ensureNotTerminated();
        handler.send('GetDoc', { pdfInfo: doc });
      }
      function onFailure(e) {
        ensureNotTerminated();
        if (e instanceof _util.PasswordException) {
          var task = new WorkerTask('PasswordException: response ' + e.code);
          startWorkerTask(task);
          handler.sendWithPromise('PasswordRequest', e).then(function (data) {
            finishWorkerTask(task);
            pdfManager.updatePassword(data.password);
            pdfManagerReady();
          }).catch(function (ex) {
            finishWorkerTask(task);
            handler.send('PasswordException', ex);
          }.bind(null, e));
        } else if (e instanceof _util.InvalidPDFException) {
          handler.send('InvalidPDF', e);
        } else if (e instanceof _util.MissingPDFException) {
          handler.send('MissingPDF', e);
        } else if (e instanceof _util.UnexpectedResponseException) {
          handler.send('UnexpectedResponse', e);
        } else {
          handler.send('UnknownError', new _util.UnknownErrorException(e.message, e.toString()));
        }
      }
      function pdfManagerReady() {
        ensureNotTerminated();
        loadDocument(false).then(onSuccess, function loadFailure(ex) {
          ensureNotTerminated();
          if (!(ex instanceof _util.XRefParseException)) {
            onFailure(ex);
            return;
          }
          pdfManager.requestLoadedStream();
          pdfManager.onLoadedStream().then(function () {
            ensureNotTerminated();
            loadDocument(true).then(onSuccess, onFailure);
          });
        }, onFailure);
      }
      ensureNotTerminated();
      var evaluatorOptions = {
        forceDataSchema: data.disableCreateObjectURL,
        maxImageSize: data.maxImageSize === undefined ? -1 : data.maxImageSize,
        disableFontFace: data.disableFontFace,
        nativeImageDecoderSupport: data.nativeImageDecoderSupport,
        ignoreErrors: data.ignoreErrors
      };
      getPdfManager(data, evaluatorOptions).then(function (newPdfManager) {
        if (terminated) {
          newPdfManager.terminate();
          throw new Error('Worker was terminated');
        }
        pdfManager = newPdfManager;
        handler.send('PDFManagerReady', null);
        pdfManager.onLoadedStream().then(function (stream) {
          handler.send('DataLoaded', { length: stream.bytes.byteLength });
        });
      }).then(pdfManagerReady, onFailure);
    }
    handler.on('GetPage', function wphSetupGetPage(data) {
      return pdfManager.getPage(data.pageIndex).then(function (page) {
        var rotatePromise = pdfManager.ensure(page, 'rotate');
        var refPromise = pdfManager.ensure(page, 'ref');
        var userUnitPromise = pdfManager.ensure(page, 'userUnit');
        var viewPromise = pdfManager.ensure(page, 'view');
        return Promise.all([rotatePromise, refPromise, userUnitPromise, viewPromise]).then(function (results) {
          return {
            rotate: results[0],
            ref: results[1],
            userUnit: results[2],
            view: results[3]
          };
        });
      });
    });
    handler.on('GetPageIndex', function wphSetupGetPageIndex(data) {
      var ref = new _primitives.Ref(data.ref.num, data.ref.gen);
      var catalog = pdfManager.pdfDocument.catalog;
      return catalog.getPageIndex(ref);
    });
    handler.on('GetDestinations', function wphSetupGetDestinations(data) {
      return pdfManager.ensureCatalog('destinations');
    });
    handler.on('GetDestination', function wphSetupGetDestination(data) {
      return pdfManager.ensureCatalog('getDestination', [data.id]);
    });
    handler.on('GetPageLabels', function wphSetupGetPageLabels(data) {
      return pdfManager.ensureCatalog('pageLabels');
    });
    handler.on('GetAttachments', function wphSetupGetAttachments(data) {
      return pdfManager.ensureCatalog('attachments');
    });
    handler.on('GetJavaScript', function wphSetupGetJavaScript(data) {
      return pdfManager.ensureCatalog('javaScript');
    });
    handler.on('GetOutline', function wphSetupGetOutline(data) {
      return pdfManager.ensureCatalog('documentOutline');
    });
    handler.on('GetMetadata', function wphSetupGetMetadata(data) {
      return Promise.all([pdfManager.ensureDoc('documentInfo'), pdfManager.ensureCatalog('metadata')]);
    });
    handler.on('GetData', function wphSetupGetData(data) {
      pdfManager.requestLoadedStream();
      return pdfManager.onLoadedStream().then(function (stream) {
        return stream.bytes;
      });
    });
    handler.on('GetStats', function wphSetupGetStats(data) {
      return pdfManager.pdfDocument.xref.stats;
    });
    handler.on('GetAnnotations', function wphSetupGetAnnotations(data) {
      return pdfManager.getPage(data.pageIndex).then(function (page) {
        return pdfManager.ensure(page, 'getAnnotationsData', [data.intent]);
      });
    });
    handler.on('RenderPageRequest', function wphSetupRenderPage(data) {
      var pageIndex = data.pageIndex;
      pdfManager.getPage(pageIndex).then(function (page) {
        var task = new WorkerTask('RenderPageRequest: page ' + pageIndex);
        startWorkerTask(task);
        var pageNum = pageIndex + 1;
        var start = Date.now();
        page.getOperatorList({
          handler: handler,
          task: task,
          intent: data.intent,
          renderInteractiveForms: data.renderInteractiveForms
        }).then(function (operatorList) {
          finishWorkerTask(task);
          (0, _util.info)('page=' + pageNum + ' - getOperatorList: time=' + (Date.now() - start) + 'ms, len=' + operatorList.totalLength);
        }, function (e) {
          finishWorkerTask(task);
          if (task.terminated) {
            return;
          }
          handler.send('UnsupportedFeature', { featureId: _util.UNSUPPORTED_FEATURES.unknown });
          var minimumStackMessage = 'worker.js: while trying to getPage() and getOperatorList()';
          var wrappedException;
          if (typeof e === 'string') {
            wrappedException = {
              message: e,
              stack: minimumStackMessage
            };
          } else if ((typeof e === 'undefined' ? 'undefined' : _typeof(e)) === 'object') {
            wrappedException = {
              message: e.message || e.toString(),
              stack: e.stack || minimumStackMessage
            };
          } else {
            wrappedException = {
              message: 'Unknown exception type: ' + (typeof e === 'undefined' ? 'undefined' : _typeof(e)),
              stack: minimumStackMessage
            };
          }
          handler.send('PageError', {
            pageNum: pageNum,
            error: wrappedException,
            intent: data.intent
          });
        });
      });
    }, this);
    handler.on('GetTextContent', function wphExtractText(data, sink) {
      var pageIndex = data.pageIndex;
      sink.onPull = function (desiredSize) {};
      sink.onCancel = function (reason) {};
      pdfManager.getPage(pageIndex).then(function (page) {
        var task = new WorkerTask('GetTextContent: page ' + pageIndex);
        startWorkerTask(task);
        var pageNum = pageIndex + 1;
        var start = Date.now();
        page.extractTextContent({
          handler: handler,
          task: task,
          sink: sink,
          normalizeWhitespace: data.normalizeWhitespace,
          combineTextItems: data.combineTextItems
        }).then(function () {
          finishWorkerTask(task);
          (0, _util.info)('text indexing: page=' + pageNum + ' - time=' + (Date.now() - start) + 'ms');
          sink.close();
        }, function (reason) {
          finishWorkerTask(task);
          if (task.terminated) {
            return;
          }
          sink.error(reason);
          throw reason;
        });
      });
    });
    handler.on('Cleanup', function wphCleanup(data) {
      return pdfManager.cleanup();
    });
    handler.on('Terminate', function wphTerminate(data) {
      terminated = true;
      if (pdfManager) {
        pdfManager.terminate();
        pdfManager = null;
      }
      if (cancelXHRs) {
        cancelXHRs();
      }
      var waitOn = [];
      WorkerTasks.forEach(function (task) {
        waitOn.push(task.finished);
        task.terminate();
      });
      return Promise.all(waitOn).then(function () {
        handler.destroy();
        handler = null;
      });
    });
    handler.on('Ready', function wphReady(data) {
      setupDoc(docParams);
      docParams = null;
    });
    return workerHandlerName;
  },
  initializeFromPort: function initializeFromPort(port) {
    var handler = new _util.MessageHandler('worker', 'main', port);
    WorkerMessageHandler.setup(handler, port);
    handler.send('ready', null);
  }
};
function isMessagePort(maybePort) {
  return typeof maybePort.postMessage === 'function' && 'onmessage' in maybePort;
}
if (typeof window === 'undefined' && !(0, _util.isNodeJS)() && typeof self !== 'undefined' && isMessagePort(self)) {
  WorkerMessageHandler.initializeFromPort(self);
}
exports.setPDFNetworkStreamClass = setPDFNetworkStreamClass;
exports.WorkerTask = WorkerTask;
exports.WorkerMessageHandler = WorkerMessageHandler;