module.exports = function() {
  "use strict";
  (function(global) {
    'use strict';
    var $__3 = $traceurRuntime,
        canonicalizeUrl = $__3.canonicalizeUrl,
        resolveUrl = $__3.resolveUrl,
        isAbsolute = $__3.isAbsolute;
    var moduleInstantiators = Object.create(null);
    var baseURL;
    if (global.location && global.location.href)
      baseURL = resolveUrl(global.location.href, './');
    else
      baseURL = '';
    function UncoatedModuleEntry(url, uncoatedModule) {
      this.url = url;
      this.value_ = uncoatedModule;
    }
    function ModuleEvaluationError(erroneousModuleName, cause) {
      this.message = this.constructor.name + ': ' + this.stripCause(cause) + ' in ' + erroneousModuleName;
      if (!(cause instanceof ModuleEvaluationError) && cause.stack)
        this.stack = this.stripStack(cause.stack);
      else
        this.stack = '';
    }
    ModuleEvaluationError.prototype = Object.create(Error.prototype);
    ModuleEvaluationError.prototype.constructor = ModuleEvaluationError;
    ModuleEvaluationError.prototype.stripError = function(message) {
      return message.replace(/.*Error:/, this.constructor.name + ':');
    };
    ModuleEvaluationError.prototype.stripCause = function(cause) {
      if (!cause)
        return '';
      if (!cause.message)
        return cause + '';
      return this.stripError(cause.message);
    };
    ModuleEvaluationError.prototype.loadedBy = function(moduleName) {
      this.stack += '\n loaded by ' + moduleName;
    };
    ModuleEvaluationError.prototype.stripStack = function(causeStack) {
      var stack = [];
      causeStack.split('\n').some(function(frame) {
        if (/UncoatedModuleInstantiator/.test(frame))
          return true;
        stack.push(frame);
      });
      stack[0] = this.stripError(stack[0]);
      return stack.join('\n');
    };
    function beforeLines(lines, number) {
      var result = [];
      var first = number - 3;
      if (first < 0)
        first = 0;
      for (var i = first; i < number; i++) {
        result.push(lines[i]);
      }
      return result;
    }
    function afterLines(lines, number) {
      var last = number + 1;
      if (last > lines.length - 1)
        last = lines.length - 1;
      var result = [];
      for (var i = number; i <= last; i++) {
        result.push(lines[i]);
      }
      return result;
    }
    function columnSpacing(columns) {
      var result = '';
      for (var i = 0; i < columns - 1; i++) {
        result += '-';
      }
      return result;
    }
    function UncoatedModuleInstantiator(url, func) {
      UncoatedModuleEntry.call(this, url, null);
      this.func = func;
    }
    UncoatedModuleInstantiator.prototype = Object.create(UncoatedModuleEntry.prototype);
    UncoatedModuleInstantiator.prototype.getUncoatedModule = function() {
      var $__2 = this;
      if (this.value_)
        return this.value_;
      try {
        var relativeRequire;
        if ((typeof $traceurRuntime === 'undefined' ? 'undefined' : $traceurRuntime.typeof($traceurRuntime)) !== undefined && $traceurRuntime.require) {
          relativeRequire = $traceurRuntime.require.bind(null, this.url);
        }
        return this.value_ = this.func.call(global, relativeRequire);
      } catch (ex) {
        if (ex instanceof ModuleEvaluationError) {
          ex.loadedBy(this.url);
          throw ex;
        }
        if (ex.stack) {
          var lines = this.func.toString().split('\n');
          var evaled = [];
          ex.stack.split('\n').some(function(frame, index) {
            if (frame.indexOf('UncoatedModuleInstantiator.getUncoatedModule') > 0)
              return true;
            var m = /(at\s[^\s]*\s).*>:(\d*):(\d*)\)/.exec(frame);
            if (m) {
              var line = parseInt(m[2], 10);
              evaled = evaled.concat(beforeLines(lines, line));
              if (index === 1) {
                evaled.push(columnSpacing(m[3]) + '^ ' + $__2.url);
              } else {
                evaled.push(columnSpacing(m[3]) + '^');
              }
              evaled = evaled.concat(afterLines(lines, line));
              evaled.push('= = = = = = = = =');
            } else {
              evaled.push(frame);
            }
          });
          ex.stack = evaled.join('\n');
        }
        throw new ModuleEvaluationError(this.url, ex);
      }
    };
    function getUncoatedModuleInstantiator(name) {
      if (!name)
        return;
      var url = ModuleStore.normalize(name);
      return moduleInstantiators[url];
    }
    ;
    var moduleInstances = Object.create(null);
    var liveModuleSentinel = {};
    function Module(uncoatedModule) {
      var isLive = arguments[1];
      var coatedModule = Object.create(null);
      Object.getOwnPropertyNames(uncoatedModule).forEach(function(name) {
        var getter,
            value;
        if (isLive === liveModuleSentinel) {
          var descr = Object.getOwnPropertyDescriptor(uncoatedModule, name);
          if (descr.get)
            getter = descr.get;
        }
        if (!getter) {
          value = uncoatedModule[name];
          getter = function() {
            return value;
          };
        }
        Object.defineProperty(coatedModule, name, {
          get: getter,
          enumerable: true
        });
      });
      Object.preventExtensions(coatedModule);
      return coatedModule;
    }
    var ModuleStore = {
      normalize: function(name, refererName, refererAddress) {
        if (typeof name !== 'string')
          throw new TypeError('module name must be a string, not ' + (typeof name === 'undefined' ? 'undefined' : $traceurRuntime.typeof(name)));
        if (isAbsolute(name))
          return canonicalizeUrl(name);
        if (/[^\.]\/\.\.\//.test(name)) {
          throw new Error('module name embeds /../: ' + name);
        }
        if (name[0] === '.' && refererName)
          return resolveUrl(refererName, name);
        return canonicalizeUrl(name);
      },
      get: function(normalizedName) {
        var m = getUncoatedModuleInstantiator(normalizedName);
        if (!m)
          return undefined;
        var moduleInstance = moduleInstances[m.url];
        if (moduleInstance)
          return moduleInstance;
        moduleInstance = Module(m.getUncoatedModule(), liveModuleSentinel);
        return moduleInstances[m.url] = moduleInstance;
      },
      set: function(normalizedName, module) {
        normalizedName = String(normalizedName);
        moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, function() {
          return module;
        });
        moduleInstances[normalizedName] = module;
      },
      get baseURL() {
        return baseURL;
      },
      set baseURL(v) {
        baseURL = String(v);
      },
      registerModule: function(name, deps, func) {
        var normalizedName = ModuleStore.normalize(name);
        if (moduleInstantiators[normalizedName])
          throw new Error('duplicate module named ' + normalizedName);
        moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, func);
      },
      bundleStore: Object.create(null),
      register: function(name, deps, func) {
        if (!deps || !deps.length && !func.length) {
          this.registerModule(name, deps, func);
        } else {
          this.bundleStore[name] = {
            deps: deps,
            execute: function() {
              var $__2 = arguments;
              var depMap = {};
              deps.forEach(function(dep, index) {
                return depMap[dep] = $__2[index];
              });
              var registryEntry = func.call(this, depMap);
              registryEntry.execute.call(this);
              return registryEntry.exports;
            }
          };
        }
      },
      getAnonymousModule: function(func) {
        return new Module(func.call(global), liveModuleSentinel);
      }
    };
    var moduleStoreModule = new Module({ModuleStore: ModuleStore});
    ModuleStore.set('@traceur/src/runtime/ModuleStore.js', moduleStoreModule);
    var setupGlobals = $traceurRuntime.setupGlobals;
    $traceurRuntime.setupGlobals = function(global) {
      setupGlobals(global);
    };
    $traceurRuntime.ModuleStore = ModuleStore;
    $traceurRuntime.registerModule = ModuleStore.registerModule.bind(ModuleStore);
    $traceurRuntime.getModule = ModuleStore.get;
    $traceurRuntime.setModule = ModuleStore.set;
    $traceurRuntime.normalizeModuleName = ModuleStore.normalize;
  })(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
  return {};
}.call(Reflect.global);
