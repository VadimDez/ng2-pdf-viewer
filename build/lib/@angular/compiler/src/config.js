"use strict";
var core_1 = require('@angular/core');
var exceptions_1 = require('../src/facade/exceptions');
var lang_1 = require('../src/facade/lang');
var identifiers_1 = require('./identifiers');
var CompilerConfig = (function () {
    function CompilerConfig(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.renderTypes, renderTypes = _c === void 0 ? new DefaultRenderTypes() : _c, _d = _b.defaultEncapsulation, defaultEncapsulation = _d === void 0 ? core_1.ViewEncapsulation.Emulated : _d, _e = _b.genDebugInfo, genDebugInfo = _e === void 0 ? lang_1.assertionsEnabled() : _e, _f = _b.logBindingUpdate, logBindingUpdate = _f === void 0 ? lang_1.assertionsEnabled() : _f, _g = _b.useJit, useJit = _g === void 0 ? true : _g, _h = _b.platformDirectives, platformDirectives = _h === void 0 ? [] : _h, _j = _b.platformPipes, platformPipes = _j === void 0 ? [] : _j;
        this.renderTypes = renderTypes;
        this.defaultEncapsulation = defaultEncapsulation;
        this.genDebugInfo = genDebugInfo;
        this.logBindingUpdate = logBindingUpdate;
        this.useJit = useJit;
        this.platformDirectives = platformDirectives;
        this.platformPipes = platformPipes;
    }
    return CompilerConfig;
}());
exports.CompilerConfig = CompilerConfig;
/**
 * Types used for the renderer.
 * Can be replaced to specialize the generated output to a specific renderer
 * to help tree shaking.
 */
var RenderTypes = (function () {
    function RenderTypes() {
    }
    Object.defineProperty(RenderTypes.prototype, "renderer", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTypes.prototype, "renderText", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTypes.prototype, "renderElement", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTypes.prototype, "renderComment", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTypes.prototype, "renderNode", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTypes.prototype, "renderEvent", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    return RenderTypes;
}());
exports.RenderTypes = RenderTypes;
var DefaultRenderTypes = (function () {
    function DefaultRenderTypes() {
        this.renderer = identifiers_1.Identifiers.Renderer;
        this.renderText = null;
        this.renderElement = null;
        this.renderComment = null;
        this.renderNode = null;
        this.renderEvent = null;
    }
    return DefaultRenderTypes;
}());
exports.DefaultRenderTypes = DefaultRenderTypes;
//# sourceMappingURL=config.js.map