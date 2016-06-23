"use strict";
var $___46__46__47_util_47_assert_46_js__,
    $__LoaderCompiler_46_js__,
    $___46__46__47_codegeneration_47_module_47_ModuleSymbol_46_js__,
    $___46__46__47_util_47_url_46_js__,
    $___46__46__47_Options_46_js__;
var assert = ($___46__46__47_util_47_assert_46_js__ = require("../util/assert.js"), $___46__46__47_util_47_assert_46_js__ && $___46__46__47_util_47_assert_46_js__.__esModule && $___46__46__47_util_47_assert_46_js__ || {default: $___46__46__47_util_47_assert_46_js__}).assert;
var LoaderCompiler = ($__LoaderCompiler_46_js__ = require("./LoaderCompiler.js"), $__LoaderCompiler_46_js__ && $__LoaderCompiler_46_js__.__esModule && $__LoaderCompiler_46_js__ || {default: $__LoaderCompiler_46_js__}).LoaderCompiler;
var ExportsList = ($___46__46__47_codegeneration_47_module_47_ModuleSymbol_46_js__ = require("../codegeneration/module/ModuleSymbol.js"), $___46__46__47_codegeneration_47_module_47_ModuleSymbol_46_js__ && $___46__46__47_codegeneration_47_module_47_ModuleSymbol_46_js__.__esModule && $___46__46__47_codegeneration_47_module_47_ModuleSymbol_46_js__ || {default: $___46__46__47_codegeneration_47_module_47_ModuleSymbol_46_js__}).ExportsList;
var $__3 = ($___46__46__47_util_47_url_46_js__ = require("../util/url.js"), $___46__46__47_util_47_url_46_js__ && $___46__46__47_util_47_url_46_js__.__esModule && $___46__46__47_util_47_url_46_js__ || {default: $___46__46__47_util_47_url_46_js__}),
    isAbsolute = $__3.isAbsolute,
    resolveUrl = $__3.resolveUrl;
var Options = ($___46__46__47_Options_46_js__ = require("../Options.js"), $___46__46__47_Options_46_js__ && $___46__46__47_Options_46_js__.__esModule && $___46__46__47_Options_46_js__ || {default: $___46__46__47_Options_46_js__}).Options;
var NOT_STARTED = 0;
var LOADING = 1;
var LOADED = 2;
var PARSED = 3;
var TRANSFORMING = 4;
var TRANSFORMED = 5;
var COMPLETE = 6;
var ERROR = 7;
function mapToValues(map) {
  var array = [];
  map.forEach(function(v) {
    array.push(v);
  });
  return array;
}
var LoaderError = function($__super) {
  function LoaderError(msg, tree) {
    $traceurRuntime.superConstructor(LoaderError).call(this);
    this.message = msg;
    this.tree = tree;
    this.name = 'LoaderError';
  }
  return ($traceurRuntime.createClass)(LoaderError, {}, {}, $__super);
}(Error);
var CodeUnit = function() {
  function CodeUnit(loaderCompiler, normalizedName, type, state, name, referrerName, address) {
    var $__13 = this;
    this.promise = new Promise(function(res, rej) {
      $__13.loaderCompiler = loaderCompiler;
      $__13.normalizedName = normalizedName;
      $__13.type = type;
      $__13.name_ = name;
      $__13.referrerName_ = referrerName;
      $__13.address = address;
      $__13.state_ = state || NOT_STARTED;
      $__13.error = null;
      $__13.result = null;
      $__13.metadata_ = {};
      $__13.dependencies = [];
      $__13.resolve = res;
      $__13.reject = rej;
    });
  }
  return ($traceurRuntime.createClass)(CodeUnit, {
    get state() {
      return this.state_;
    },
    set state(value) {
      if (value < this.state_) {
        throw new Error('Invalid state change');
      }
      this.state_ = value;
    },
    get metadata() {
      return this.metadata_;
    },
    set metadata(value) {
      assert(value);
      this.metadata_ = value;
    },
    nameTrace: function() {
      var trace = this.specifiedAs();
      if (isAbsolute(this.name_)) {
        return trace + 'An absolute name.\n';
      }
      if (this.referrerName_) {
        return trace + this.importedBy() + this.normalizesTo();
      }
      return trace + this.normalizesTo();
    },
    specifiedAs: function() {
      return ("Specified as " + this.name_ + ".\n");
    },
    importedBy: function() {
      return ("Imported by " + this.referrerName_ + ".\n");
    },
    normalizesTo: function() {
      return 'Normalizes to ' + this.normalizedName + '\n';
    }
  }, {});
}();
var PreCompiledCodeUnit = function($__super) {
  function PreCompiledCodeUnit(loaderCompiler, normalizedName, name, referrerName, address, module) {
    $traceurRuntime.superConstructor(PreCompiledCodeUnit).call(this, loaderCompiler, normalizedName, 'module', COMPLETE, name, referrerName, address);
    this.result = module;
    this.resolve(this.result);
  }
  return ($traceurRuntime.createClass)(PreCompiledCodeUnit, {}, {}, $__super);
}(CodeUnit);
var BundledCodeUnit = function($__super) {
  function BundledCodeUnit(loaderCompiler, normalizedName, name, referrerName, address, deps, execute, setModule) {
    $traceurRuntime.superConstructor(BundledCodeUnit).call(this, loaderCompiler, normalizedName, 'module', TRANSFORMED, name, referrerName, address);
    this.deps = deps;
    this.execute = execute;
  }
  return ($traceurRuntime.createClass)(BundledCodeUnit, {
    getModuleSpecifiers: function() {
      return this.deps;
    },
    evaluate: function() {
      var $__13 = this;
      var normalizedNames = this.deps.map(function(name) {
        return $__13.loader_.normalize(name);
      });
      var module = this.execute.apply(Reflect.global, normalizedNames);
      setModule(this.normalizedName, module);
      return module;
    }
  }, {}, $__super);
}(CodeUnit);
var HookedCodeUnit = function($__super) {
  function HookedCodeUnit() {
    $traceurRuntime.superConstructor(HookedCodeUnit).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(HookedCodeUnit, {
    getModuleSpecifiers: function() {
      return this.loaderCompiler.getModuleSpecifiers(this);
    },
    evaluate: function() {
      return this.loaderCompiler.evaluateCodeUnit(this);
    }
  }, {}, $__super);
}(CodeUnit);
var LoadCodeUnit = function($__super) {
  function LoadCodeUnit(loaderCompiler, normalizedName, name, referrerName, address) {
    $traceurRuntime.superConstructor(LoadCodeUnit).call(this, loaderCompiler, normalizedName, 'module', NOT_STARTED, name, referrerName, address);
  }
  return ($traceurRuntime.createClass)(LoadCodeUnit, {}, {}, $__super);
}(HookedCodeUnit);
var EvalCodeUnit = function($__super) {
  function EvalCodeUnit(loaderCompiler, code) {
    var type = arguments[2] !== (void 0) ? arguments[2] : 'script';
    var normalizedName = arguments[3];
    var referrerName = arguments[4];
    var address = arguments[5];
    $traceurRuntime.superConstructor(EvalCodeUnit).call(this, loaderCompiler, normalizedName, type, LOADED, null, referrerName, address);
    this.source = code;
  }
  return ($traceurRuntime.createClass)(EvalCodeUnit, {}, {}, $__super);
}(HookedCodeUnit);
var uniqueNameCount = 0;
var InternalLoader = function() {
  function InternalLoader(loader, loaderCompiler) {
    assert(loaderCompiler);
    this.loader_ = loader;
    this.loaderCompiler = loaderCompiler;
    this.cache = new Map();
    this.urlToKey = Object.create(null);
    this.sync_ = false;
    this.sourceMapsByURL_ = Object.create(null);
    this.sourceMapsByOutputName_ = Object.create(null);
  }
  return ($traceurRuntime.createClass)(InternalLoader, {
    defaultMetadata_: function() {
      var metadata = arguments[0] !== (void 0) ? arguments[0] : {};
      var incoming = metadata.traceurOptions;
      if (incoming && !(incoming instanceof Options)) {
        var unknown = Options.listUnknownOptions(incoming);
        if (unknown.length) {
          console.warn('Unknown metadata.traceurOptions ignored: ' + unknown.join(','));
        }
      }
      metadata.traceurOptions = incoming || new Options();
      return metadata;
    },
    defaultModuleMetadata_: function() {
      var metadata = arguments[0] !== (void 0) ? arguments[0] : {};
      var metadata = this.defaultMetadata_(metadata);
      metadata.traceurOptions.script = false;
      return metadata;
    },
    getSourceMap: function(url) {
      return this.sourceMapsByURL_[url] || this.sourceMapsByOutputName_[url];
    },
    load: function(name) {
      var referrerName = arguments[1] !== (void 0) ? arguments[1] : this.loader_.baseURL;
      var address = arguments[2];
      var metadata = arguments[3] !== (void 0) ? arguments[3] : {};
      metadata = this.defaultMetadata_(metadata);
      var codeUnit = this.getOrCreateCodeUnit_(name, referrerName, address, metadata);
      this.load_(codeUnit);
      return codeUnit.promise.then(function() {
        return codeUnit;
      });
    },
    load_: function(codeUnit) {
      var $__13 = this;
      if (codeUnit.state === ERROR) {
        return codeUnit;
      }
      if (codeUnit.state === TRANSFORMED) {
        this.handleCodeUnitLoaded(codeUnit);
      } else {
        if (codeUnit.state !== NOT_STARTED)
          return codeUnit;
        codeUnit.state = LOADING;
        codeUnit.address = this.loader_.locate(codeUnit);
        this.loader_.fetch(codeUnit).then(function(text) {
          codeUnit.source = text;
          return codeUnit;
        }).then(function(load) {
          return $__13.loader_.translate(load);
        }).then(function(source) {
          codeUnit.source = source;
          codeUnit.state = LOADED;
          $__13.handleCodeUnitLoaded(codeUnit);
          return codeUnit;
        }).catch(function(err) {
          try {
            codeUnit.state = ERROR;
            codeUnit.error = err;
            $__13.handleCodeUnitLoadError(codeUnit);
          } catch (ex) {
            console.error('Internal Error ' + (ex.stack || ex));
          }
        });
      }
      return codeUnit;
    },
    module: function(code, referrerName, address, metadata) {
      var codeUnit = new EvalCodeUnit(this.loaderCompiler, code, 'module', null, referrerName, address);
      codeUnit.metadata = this.defaultMetadata_(metadata);
      this.cache.set({}, codeUnit);
      this.handleCodeUnitLoaded(codeUnit);
      return codeUnit.promise;
    },
    define: function(normalizedName, code, address, metadata) {
      var codeUnit = new EvalCodeUnit(this.loaderCompiler, code, 'module', normalizedName, null, address);
      var key = this.getKey(normalizedName, 'module');
      codeUnit.metadata = this.defaultMetadata_(metadata);
      this.cache.set(key, codeUnit);
      this.handleCodeUnitLoaded(codeUnit);
      return codeUnit.promise;
    },
    script: function(code, name, referrerName, address, metadata) {
      var normalizedName = this.loader_.normalize(name || '', referrerName, address);
      var codeUnit = new EvalCodeUnit(this.loaderCompiler, code, 'script', normalizedName, referrerName, address);
      var key = {};
      if (name)
        key = this.getKey(normalizedName, 'script');
      codeUnit.metadata = this.defaultMetadata_(metadata);
      this.cache.set(key, codeUnit);
      this.handleCodeUnitLoaded(codeUnit);
      return codeUnit.promise;
    },
    getKey: function(url, type) {
      var combined = type + ':' + url;
      if (combined in this.urlToKey) {
        return this.urlToKey[combined];
      }
      return this.urlToKey[combined] = {};
    },
    getCodeUnit_: function(normalizedName, type) {
      var key = this.getKey(normalizedName, type);
      var codeUnit = this.cache.get(key);
      return {
        key: key,
        codeUnit: codeUnit
      };
    },
    getOrCreateCodeUnit_: function(name, referrerName, address, metadata) {
      var normalizedName = this.loader_.normalize(name, referrerName, address);
      var type = 'module';
      if (metadata && metadata.traceurOptions && metadata.traceurOptions.script)
        type = 'script';
      var $__14 = this.getCodeUnit_(normalizedName, type),
          key = $__14.key,
          codeUnit = $__14.codeUnit;
      if (!codeUnit) {
        assert(metadata && metadata.traceurOptions);
        var module = this.loader_.get(normalizedName);
        if (module) {
          codeUnit = new PreCompiledCodeUnit(this.loaderCompiler, normalizedName, name, referrerName, address, module);
          codeUnit.type = 'module';
        } else {
          codeUnit = new LoadCodeUnit(this.loaderCompiler, normalizedName, name, referrerName, address);
          codeUnit.type = type;
        }
        codeUnit.metadata = {
          traceurOptions: metadata.traceurOptions,
          outputName: metadata.outputName,
          rootModule: metadata.rootModule
        };
        this.cache.set(key, codeUnit);
      }
      return codeUnit;
    },
    areAll: function(state) {
      return mapToValues(this.cache).every(function(codeUnit) {
        return codeUnit.state >= state;
      });
    },
    getCodeUnitForModuleSpecifier: function(name, referrerName) {
      var normalizedName = this.loader_.normalize(name, referrerName);
      return this.getCodeUnit_(normalizedName, 'module').codeUnit;
    },
    getExportsListForModuleSpecifier: function(name, referrer) {
      var codeUnit = this.getCodeUnitForModuleSpecifier(name, referrer);
      var exportsList = codeUnit.metadata.moduleSymbol;
      if (!exportsList) {
        if (codeUnit.result) {
          exportsList = new ExportsList(codeUnit.normalizedName);
          exportsList.addExportsFromModule(codeUnit.result);
        } else {
          throw new Error(("InternalError: " + name + " is not a module, required by " + referrer));
        }
      }
      return exportsList;
    },
    handleCodeUnitLoaded: function(codeUnit) {
      var $__13 = this;
      var referrerName = codeUnit.normalizedName;
      try {
        var moduleSpecifiers = codeUnit.getModuleSpecifiers();
        codeUnit.state = PARSED;
        if (!moduleSpecifiers) {
          this.abortAll(("No module specifiers in " + referrerName));
          return;
        }
        codeUnit.dependencies = moduleSpecifiers.map(function(name) {
          return $__13.getOrCreateCodeUnit_(name, referrerName, null, $__13.defaultModuleMetadata_(codeUnit.metadata));
        });
      } catch (error) {
        this.rejectOneAndAll(codeUnit, error);
        return;
      }
      codeUnit.dependencies.forEach(function(dependency) {
        $__13.load_(dependency);
      });
      if (this.areAll(PARSED)) {
        try {
          if (codeUnit.type === 'module')
            this.analyze();
          this.transform();
          this.evaluate();
        } catch (error) {
          this.rejectOneAndAll(codeUnit, error);
        }
      }
    },
    rejectOneAndAll: function(codeUnit, error) {
      codeUnit.state.ERROR;
      codeUnit.error = error;
      codeUnit.reject(error);
      this.abortAll(error);
    },
    handleCodeUnitLoadError: function(codeUnit) {
      var message = codeUnit.error ? String(codeUnit.error) + '\n' : ("Failed to load '" + codeUnit.address + "'.\n");
      message += codeUnit.nameTrace() + this.loader_.nameTrace(codeUnit);
      this.rejectOneAndAll(codeUnit, new Error(message));
    },
    abortAll: function(errorMessage) {
      this.cache.forEach(function(codeUnit) {
        if (codeUnit.state !== ERROR)
          codeUnit.reject(errorMessage);
      });
    },
    analyze: function() {
      this.loaderCompiler.analyzeDependencies(mapToValues(this.cache), this);
    },
    transform: function() {
      this.transformDependencies_(mapToValues(this.cache));
    },
    transformDependencies_: function(dependencies, dependentName) {
      for (var i = 0; i < dependencies.length; i++) {
        var codeUnit = dependencies[i];
        if (codeUnit.state >= TRANSFORMED) {
          continue;
        }
        if (codeUnit.state === TRANSFORMING) {
          var cir = codeUnit.normalizedName;
          var cle = dependentName;
          this.rejectOneAndAll(codeUnit, new Error(("Unsupported circular dependency between " + cir + " and " + cle)));
          return;
        }
        codeUnit.state = TRANSFORMING;
        try {
          this.transformCodeUnit_(codeUnit);
        } catch (error) {
          this.rejectOneAndAll(codeUnit, error);
          return;
        }
      }
    },
    transformCodeUnit_: function(codeUnit) {
      this.transformDependencies_(codeUnit.dependencies, codeUnit.normalizedName);
      if (codeUnit.state === ERROR)
        return;
      this.loaderCompiler.transform(codeUnit);
      codeUnit.state = TRANSFORMED;
      this.loaderCompiler.write(codeUnit);
      var info = codeUnit.metadata.compiler.sourceMapInfo;
      if (info) {
        this.sourceMapsByURL_[info.url] = info.map;
        this.sourceMapsByOutputName_[info.outputName] = info.map;
      }
      this.loader_.instantiate(codeUnit);
    },
    orderDependencies: function() {
      var visited = new Map();
      var ordered = [];
      function orderCodeUnits(codeUnit) {
        if (visited.has(codeUnit)) {
          return;
        }
        visited.set(codeUnit, true);
        codeUnit.dependencies.forEach(orderCodeUnits);
        ordered.push(codeUnit);
      }
      this.cache.forEach(orderCodeUnits);
      return ordered;
    },
    evaluate: function() {
      var dependencies = this.orderDependencies();
      for (var i = 0; i < dependencies.length; i++) {
        var codeUnit = dependencies[i];
        if (codeUnit.state >= COMPLETE) {
          continue;
        }
        var result = void 0;
        try {
          result = codeUnit.evaluate();
        } catch (ex) {
          this.rejectOneAndAll(codeUnit, ex);
          return;
        }
        codeUnit.result = result;
        codeUnit.source = null;
      }
      for (var i = 0; i < dependencies.length; i++) {
        var codeUnit = dependencies[i];
        if (codeUnit.state >= COMPLETE) {
          continue;
        }
        codeUnit.state = COMPLETE;
        codeUnit.resolve(codeUnit.result);
      }
    }
  }, {});
}();
var internals = {
  CodeUnit: CodeUnit,
  EvalCodeUnit: EvalCodeUnit,
  LoadCodeUnit: LoadCodeUnit,
  LoaderCompiler: LoaderCompiler
};
Object.defineProperties(module.exports, {
  InternalLoader: {get: function() {
      return InternalLoader;
    }},
  internals: {get: function() {
      return internals;
    }},
  __esModule: {value: true}
});
