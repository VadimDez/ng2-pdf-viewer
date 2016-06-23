"use strict";
var $___46__46__47_private_46_js__;
var $__0 = ($___46__46__47_private_46_js__ = require("../private.js"), $___46__46__47_private_46_js__ && $___46__46__47_private_46_js__.__esModule && $___46__46__47_private_46_js__ || {default: $___46__46__47_private_46_js__}),
    createPrivateSymbol = $__0.createPrivateSymbol,
    getPrivate = $__0.getPrivate,
    setPrivate = $__0.setPrivate;
var $__13 = Object,
    create = $__13.create,
    defineProperty = $__13.defineProperty;
var observeName = createPrivateSymbol();
function AsyncGeneratorFunction() {}
function AsyncGeneratorFunctionPrototype() {}
AsyncGeneratorFunction.prototype = AsyncGeneratorFunctionPrototype;
AsyncGeneratorFunctionPrototype.constructor = AsyncGeneratorFunction;
defineProperty(AsyncGeneratorFunctionPrototype, 'constructor', {enumerable: false});
var AsyncGeneratorContext = function() {
  function AsyncGeneratorContext(observer) {
    var $__4 = this;
    this.decoratedObserver = createDecoratedGenerator(observer, function() {
      $__4.done = true;
    });
    this.done = false;
    this.inReturn = false;
  }
  return ($traceurRuntime.createClass)(AsyncGeneratorContext, {
    throw: function(error) {
      if (!this.inReturn) {
        throw error;
      }
    },
    yield: function(value) {
      if (this.done) {
        this.inReturn = true;
        throw undefined;
      }
      var result;
      try {
        result = this.decoratedObserver.next(value);
      } catch (e) {
        this.done = true;
        throw e;
      }
      if (result === undefined) {
        return;
      }
      if (result.done) {
        this.done = true;
        this.inReturn = true;
        throw undefined;
      }
      return result.value;
    },
    yieldFor: function(observable) {
      var ctx = this;
      return observeForEach(observable[Symbol.observer].bind(observable), function(value) {
        if (ctx.done) {
          this.return();
          return;
        }
        var result;
        try {
          result = ctx.decoratedObserver.next(value);
        } catch (e) {
          ctx.done = true;
          throw e;
        }
        if (result === undefined) {
          return;
        }
        if (result.done) {
          ctx.done = true;
        }
        return result;
      });
    }
  }, {});
}();
AsyncGeneratorFunctionPrototype.prototype[Symbol.observer] = function(observer) {
  var observe = getPrivate(this, observeName);
  var ctx = new AsyncGeneratorContext(observer);
  schedule(function() {
    return observe(ctx);
  }).then(function(value) {
    if (!ctx.done) {
      ctx.decoratedObserver.return(value);
    }
  }).catch(function(error) {
    if (!ctx.done) {
      ctx.decoratedObserver.throw(error);
    }
  });
  return ctx.decoratedObserver;
};
defineProperty(AsyncGeneratorFunctionPrototype.prototype, Symbol.observer, {enumerable: false});
function initAsyncGeneratorFunction(functionObject) {
  functionObject.prototype = create(AsyncGeneratorFunctionPrototype.prototype);
  functionObject.__proto__ = AsyncGeneratorFunctionPrototype;
  return functionObject;
}
function createAsyncGeneratorInstance(observe, functionObject) {
  for (var args = [],
      $__12 = 2; $__12 < arguments.length; $__12++)
    args[$__12 - 2] = arguments[$__12];
  var object = create(functionObject.prototype);
  setPrivate(object, observeName, observe);
  return object;
}
function observeForEach(observe, next) {
  return new Promise(function(resolve, reject) {
    var generator = observe({
      next: function(value) {
        return next.call(generator, value);
      },
      throw: function(error) {
        reject(error);
      },
      return: function(value) {
        resolve(value);
      }
    });
  });
}
function schedule(asyncF) {
  return Promise.resolve().then(asyncF);
}
var generator = Symbol();
var onDone = Symbol();
var DecoratedGenerator = function() {
  function DecoratedGenerator(_generator, _onDone) {
    this[generator] = _generator;
    this[onDone] = _onDone;
  }
  return ($traceurRuntime.createClass)(DecoratedGenerator, {
    next: function(value) {
      var result = this[generator].next(value);
      if (result !== undefined && result.done) {
        this[onDone].call(this);
      }
      return result;
    },
    throw: function(error) {
      this[onDone].call(this);
      return this[generator].throw(error);
    },
    return: function(value) {
      this[onDone].call(this);
      return this[generator].return(value);
    }
  }, {});
}();
function createDecoratedGenerator(generator, onDone) {
  return new DecoratedGenerator(generator, onDone);
}
Array.prototype[Symbol.observer] = function(observer) {
  var done = false;
  var decoratedObserver = createDecoratedGenerator(observer, function() {
    return done = true;
  });
  var $__8 = true;
  var $__9 = false;
  var $__10 = undefined;
  try {
    for (var $__6 = void 0,
        $__5 = (this)[Symbol.iterator](); !($__8 = ($__6 = $__5.next()).done); $__8 = true) {
      var value = $__6.value;
      {
        decoratedObserver.next(value);
        if (done) {
          return;
        }
      }
    }
  } catch ($__11) {
    $__9 = true;
    $__10 = $__11;
  } finally {
    try {
      if (!$__8 && $__5.return != null) {
        $__5.return();
      }
    } finally {
      if ($__9) {
        throw $__10;
      }
    }
  }
  decoratedObserver.return();
  return decoratedObserver;
};
defineProperty(Array.prototype, Symbol.observer, {enumerable: false});
Object.defineProperties(module.exports, {
  initAsyncGeneratorFunction: {get: function() {
      return initAsyncGeneratorFunction;
    }},
  createAsyncGeneratorInstance: {get: function() {
      return createAsyncGeneratorInstance;
    }},
  observeForEach: {get: function() {
      return observeForEach;
    }},
  schedule: {get: function() {
      return schedule;
    }},
  createDecoratedGenerator: {get: function() {
      return createDecoratedGenerator;
    }},
  __esModule: {value: true}
});
