"use strict";
function enumerableOnlyObject(obj) {
  var result = Object.create(null);
  Object.keys(obj).forEach(function(key) {
    Object.defineProperty(result, key, {
      enumerable: true,
      value: obj[key]
    });
  });
  return result;
}
var optionsV01 = enumerableOnlyObject({
  annotations: false,
  arrayComprehension: false,
  arrowFunctions: true,
  asyncFunctions: false,
  asyncGenerators: false,
  blockBinding: true,
  classes: true,
  commentCallback: false,
  computedPropertyNames: true,
  debug: false,
  debugNames: false,
  defaultParameters: true,
  destructuring: true,
  exponentiation: false,
  exportFromExtended: false,
  forOf: true,
  forOn: false,
  freeVariableChecker: false,
  generatorComprehension: false,
  generators: true,
  inputSourceMap: false,
  jsx: false,
  lowResolutionSourceMap: false,
  memberVariables: false,
  moduleName: 'default',
  modules: 'bootstrap',
  numericLiterals: true,
  outputLanguage: 'es5',
  properTailCalls: false,
  propertyMethods: true,
  propertyNameShorthand: true,
  referrer: '',
  require: false,
  restParameters: true,
  script: false,
  sourceMaps: false,
  sourceRoot: false,
  spread: true,
  spreadProperties: false,
  symbols: true,
  templateLiterals: true,
  types: false,
  unicodeEscapeSequences: true,
  unicodeExpressions: true,
  validate: false
});
var versionLockedOptions = optionsV01;
var defaultValues = Object.create(null);
var featureOptions = Object.create(null);
var experimentalOptions = Object.create(null);
var moduleOptions = ['amd', 'commonjs', 'closure', 'instantiate', 'inline', 'bootstrap', 'parse'];
var EXPERIMENTAL = 0;
var ON_BY_DEFAULT = 1;
function addFeatureOption(name, kind) {
  featureOptions[name] = true;
  if (kind === EXPERIMENTAL)
    experimentalOptions[name] = true;
  var defaultValue = kind === ON_BY_DEFAULT;
  defaultValues[name] = defaultValue;
}
function addBoolOption(name) {
  defaultValues[name] = false;
}
addFeatureOption('arrowFunctions', ON_BY_DEFAULT);
addFeatureOption('blockBinding', ON_BY_DEFAULT);
addFeatureOption('classes', ON_BY_DEFAULT);
addFeatureOption('computedPropertyNames', ON_BY_DEFAULT);
addFeatureOption('defaultParameters', ON_BY_DEFAULT);
addFeatureOption('destructuring', ON_BY_DEFAULT);
addFeatureOption('forOf', ON_BY_DEFAULT);
addFeatureOption('generators', ON_BY_DEFAULT);
addFeatureOption('modules', 'SPECIAL');
addFeatureOption('numericLiterals', ON_BY_DEFAULT);
addFeatureOption('propertyMethods', ON_BY_DEFAULT);
addFeatureOption('propertyNameShorthand', ON_BY_DEFAULT);
addFeatureOption('restParameters', ON_BY_DEFAULT);
addFeatureOption('sourceMaps', 'SPECIAL');
addFeatureOption('spread', ON_BY_DEFAULT);
addFeatureOption('symbols', ON_BY_DEFAULT);
addFeatureOption('templateLiterals', ON_BY_DEFAULT);
addFeatureOption('unicodeEscapeSequences', ON_BY_DEFAULT);
addFeatureOption('unicodeExpressions', ON_BY_DEFAULT);
addFeatureOption('properTailCalls', EXPERIMENTAL);
addFeatureOption('annotations', EXPERIMENTAL);
addFeatureOption('arrayComprehension', EXPERIMENTAL);
addFeatureOption('asyncFunctions', EXPERIMENTAL);
addFeatureOption('asyncGenerators', EXPERIMENTAL);
addFeatureOption('exponentiation', EXPERIMENTAL);
addFeatureOption('exportFromExtended', EXPERIMENTAL);
addFeatureOption('forOn', EXPERIMENTAL);
addFeatureOption('generatorComprehension', EXPERIMENTAL);
addFeatureOption('jsx', EXPERIMENTAL);
addFeatureOption('memberVariables', EXPERIMENTAL);
addFeatureOption('require', EXPERIMENTAL);
addFeatureOption('spreadProperties', EXPERIMENTAL);
addFeatureOption('types', EXPERIMENTAL);
var transformOptionsPrototype = {};
Object.keys(featureOptions).forEach(function(name) {
  Object.defineProperty(transformOptionsPrototype, name, {
    get: function() {
      var v = this.proxiedOptions_[name];
      if (v === 'parse')
        return false;
      return v;
    },
    enumerable: true
  });
});
var parseOptionsPrototype = {};
Object.keys(featureOptions).forEach(function(name) {
  Object.defineProperty(parseOptionsPrototype, name, {
    get: function() {
      return !!this.proxiedOptions_[name];
    },
    enumerable: true
  });
});
addBoolOption('commentCallback');
addBoolOption('debug');
addBoolOption('debugNames');
addBoolOption('freeVariableChecker');
addBoolOption('script');
addBoolOption('validate');
var Options = function() {
  function Options() {
    var options = arguments[0] !== (void 0) ? arguments[0] : Object.create(null);
    this.reset();
    Object.defineProperties(this, {
      modules_: {
        value: versionLockedOptions.modules,
        writable: true,
        enumerable: false
      },
      sourceMaps_: {
        value: versionLockedOptions.sourceMaps,
        writable: true,
        enumerable: false
      },
      sourceRoot_: {
        value: versionLockedOptions.sourceRoot,
        writable: true,
        enumerable: false
      },
      transformOptions: {
        value: Object.create(transformOptionsPrototype, {proxiedOptions_: {
            value: this,
            enumerable: false
          }}),
        enumerable: false
      },
      parseOptions: {
        value: Object.create(parseOptionsPrototype, {proxiedOptions_: {
            value: this,
            enumerable: false
          }}),
        enumerable: false
      }
    });
    this.setFromObject(options);
  }
  return ($traceurRuntime.createClass)(Options, {
    set experimental(v) {
      var $__2 = this;
      v = coerceOptionValue(v);
      Object.keys(experimentalOptions).forEach(function(name) {
        $__2[name] = v;
      });
    },
    get experimental() {
      var $__2 = this;
      var value;
      Object.keys(experimentalOptions).every(function(name) {
        var currentValue = $__2[name];
        if (value === undefined) {
          value = currentValue;
          return true;
        }
        if (currentValue !== value) {
          value = null;
          return false;
        }
        return true;
      });
      return value;
    },
    get atscript() {
      return this.types && this.annotations && this.memberVariables;
    },
    set atscript(value) {
      this.types = value;
      this.annotations = value;
      this.memberVariables = value;
    },
    get modules() {
      return this.modules_;
    },
    set modules(value) {
      if (typeof value === 'boolean' && !value)
        value = 'bootstrap';
      if (moduleOptions.indexOf(value) === -1) {
        throw new Error('Invalid \'modules\' option \'' + value + '\', not in ' + moduleOptions.join(', '));
      }
      this.modules_ = value;
    },
    get sourceMaps() {
      return this.sourceMaps_;
    },
    set sourceMaps(value) {
      if (value === null || typeof value === 'boolean') {
        this.sourceMaps_ = value ? 'file' : false;
        return;
      }
      if (value === 'file' || value === 'inline' || value === 'memory') {
        this.sourceMaps_ = value;
      } else {
        throw new Error('Option sourceMaps should be ' + '[false|inline|file|memory], not ' + value);
      }
    },
    reset: function() {
      var allOff = arguments[0];
      var $__2 = this;
      var useDefault = allOff === undefined;
      Object.keys(defaultValues).forEach(function(name) {
        $__2[name] = useDefault && defaultValues[name];
      });
      this.setDefaults();
    },
    setDefaults: function() {
      this.modules = 'bootstrap';
      this.moduleName = 'default';
      this.outputLanguage = 'es5';
      this.referrer = '';
      this.sourceMaps = false;
      this.sourceRoot = false;
      this.lowResolutionSourceMap = false;
      this.inputSourceMap = false;
    },
    setFromObject: function(object) {
      var $__2 = this;
      Object.keys(this).forEach(function(name) {
        if (name in object)
          $__2.setOption(name, object[name]);
      });
      this.modules = object.modules || this.modules;
      if (typeof object.sourceMaps === 'boolean' || typeof object.sourceMaps === 'string') {
        this.sourceMaps = object.sourceMaps;
      }
      if (object.sourceRoot !== undefined)
        this.sourceRoot = object.sourceRoot;
      return this;
    },
    setOption: function(name, value) {
      name = toCamelCase(name);
      if (name in this) {
        this[name] = value;
      } else {
        throw Error('Unknown option: ' + name);
      }
    },
    diff: function(ref) {
      var $__2 = this;
      var mismatches = [];
      Object.keys(this).forEach(function(key) {
        if ($__2[key] !== ref[key]) {
          mismatches.push({
            key: key,
            now: $traceurRuntime.options[key],
            v01: ref[key]
          });
        }
      });
      return mismatches;
    }
  }, {
    experimental: function() {
      return new Options(experimentalOptions);
    },
    atscript: function() {
      return new Options({
        types: true,
        annotations: true,
        memberVariables: true
      });
    },
    listUnknownOptions: function(obj) {
      var unknowns = [];
      Object.keys(obj).forEach(function(propName) {
        if (!(propName in optionsV01)) {
          unknowns.push(propName);
        }
      });
      return unknowns;
    }
  });
}();
;
var descriptions = {
  experimental: 'Turns on all experimental features',
  require: 'Generate require function argument for node when modules=register',
  sourceMaps: 'Generate source map and (\'file\') write to .map' + ' or (\'inline\') append data URL'
};
var CommandOptions = function($__super) {
  function CommandOptions() {
    $traceurRuntime.superConstructor(CommandOptions).apply(this, arguments);
  }
  return ($traceurRuntime.createClass)(CommandOptions, {
    parseCommand: function(s) {
      var re = /--([^=]+)(?:=(.+))?/;
      var m = re.exec(s);
      if (m)
        this.setOptionCoerced(m[1], m[2]);
    },
    setOptionCoerced: function(name, value) {
      if (typeof value !== 'undefined' && value !== null)
        value = coerceOptionValue(value);
      else
        value = true;
      this.setOption(name, value);
    }
  }, {
    fromString: function(s) {
      return CommandOptions.fromArgv(s.split(/\s+/));
    },
    fromArgv: function(args) {
      var options = new CommandOptions();
      args.forEach(function(arg) {
        return options.parseCommand(arg);
      });
      return options;
    }
  }, $__super);
}(Options);
function coerceOptionValue(v) {
  switch (v) {
    case 'false':
      return false;
    case 'true':
    case true:
      return true;
    default:
      return !!v && String(v);
  }
}
function toCamelCase(s) {
  return s.replace(/-\w/g, function(ch) {
    return ch[1].toUpperCase();
  });
}
function toDashCase(s) {
  return s.replace(/[A-Z]/g, function(ch) {
    return '-' + ch.toLowerCase();
  });
}
function addOptions(flags, commandOptions) {
  flags.option('--referrer <name>', 'Bracket output code with System.referrerName=<name>', function(name) {
    commandOptions.setOption('referrer', name);
    System.map = System.semverMap(name);
    return name;
  });
  flags.option('--modules <' + moduleOptions.join(', ') + '>', 'select the output format for modules', function(moduleFormat) {
    commandOptions.modules = moduleFormat;
  });
  flags.option('--moduleName [true|false|default]', 'true for named, false for anonymous modules; default depends on --modules', function(moduleName) {
    if (moduleName === 'true')
      moduleName = true;
    else if (moduleName === 'false')
      moduleName = false;
    else
      moduleName = 'default';
    commandOptions.moduleName = moduleName;
  });
  flags.option('--outputLanguage <es6|es5>', 'compilation target language', function(outputLanguage) {
    if (outputLanguage === 'es6' || outputLanguage === 'es5')
      commandOptions.outputLanguage = outputLanguage;
    else
      throw new Error('outputLanguage must be one of es5, es6');
  });
  flags.option('--source-maps [file|inline|memory]', 'sourceMaps generated to file or inline with data: URL', function(to) {
    return commandOptions.sourceMaps = to;
  });
  flags.option('--source-root <true|false|string>', 'sourcemap sourceRoot value. false to omit, ' + 'true for directory of output file.', function(to) {
    if (to === 'false')
      to = false;
    else if (to === 'true')
      to = true;
    return commandOptions.sourceRoot = to;
  });
  flags.option('--low-resolution-source-maps', 'Lower sourceMaps granularity to one mapping per output line', function() {
    return commandOptions.lowResolutionSourceMap = true;
  });
  flags.option('--experimental', 'Turns on all experimental features', function() {
    commandOptions.experimental = true;
  });
  flags.option('--atscript', 'Turns on all AtScript features', function() {
    commandOptions.atscript = true;
  });
  Object.keys(commandOptions).forEach(function(name) {
    var dashedName = toDashCase(name);
    if (flags.optionFor('--' + name) || flags.optionFor('--' + dashedName)) {
      return;
    } else if (name in featureOptions) {
      flags.option('--' + dashedName + ' [true|false|parse]', descriptions[name]);
      flags.on(dashedName, function(value) {
        return commandOptions.setOptionCoerced(dashedName, value);
      });
    } else if (commandOptions[name] !== null) {
      flags.option('--' + dashedName, descriptions[name]);
      flags.on(dashedName, function() {
        return commandOptions.setOption(dashedName, true);
      });
    } else {
      throw new Error('Unexpected null commandOption ' + name);
    }
  });
  commandOptions.setDefaults();
}
Object.defineProperties(module.exports, {
  optionsV01: {get: function() {
      return optionsV01;
    }},
  versionLockedOptions: {get: function() {
      return versionLockedOptions;
    }},
  Options: {get: function() {
      return Options;
    }},
  CommandOptions: {get: function() {
      return CommandOptions;
    }},
  toDashCase: {get: function() {
      return toDashCase;
    }},
  addOptions: {get: function() {
      return addOptions;
    }},
  __esModule: {value: true}
});
