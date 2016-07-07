"use strict";
var core_1 = require('@angular/core');
var core_private_1 = require('../core_private');
var lang_1 = require('../src/facade/lang');
var exceptions_1 = require('../src/facade/exceptions');
var collection_1 = require('../src/facade/collection');
var ViewResolver = (function () {
    function ViewResolver(_reflector) {
        /** @internal */
        this._cache = new collection_1.Map();
        if (lang_1.isPresent(_reflector)) {
            this._reflector = _reflector;
        }
        else {
            this._reflector = core_private_1.reflector;
        }
    }
    ViewResolver.prototype.resolve = function (component) {
        var view = this._cache.get(component);
        if (lang_1.isBlank(view)) {
            view = this._resolve(component);
            this._cache.set(component, view);
        }
        return view;
    };
    /** @internal */
    ViewResolver.prototype._resolve = function (component) {
        var compMeta;
        this._reflector.annotations(component).forEach(function (m) {
            if (m instanceof core_1.ComponentMetadata) {
                compMeta = m;
            }
        });
        if (lang_1.isPresent(compMeta)) {
            if (lang_1.isBlank(compMeta.template) && lang_1.isBlank(compMeta.templateUrl)) {
                throw new exceptions_1.BaseException("Component '" + lang_1.stringify(component) + "' must have either 'template' or 'templateUrl' set.");
            }
            else {
                return new core_1.ViewMetadata({
                    templateUrl: compMeta.templateUrl,
                    template: compMeta.template,
                    directives: compMeta.directives,
                    pipes: compMeta.pipes,
                    encapsulation: compMeta.encapsulation,
                    styles: compMeta.styles,
                    styleUrls: compMeta.styleUrls,
                    animations: compMeta.animations
                });
            }
        }
        else {
            throw new exceptions_1.BaseException("Could not compile '" + lang_1.stringify(component) + "' because it is not a component.");
        }
    };
    /** @nocollapse */
    ViewResolver.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ViewResolver.ctorParameters = [
        { type: core_private_1.ReflectorReader, },
    ];
    return ViewResolver;
}());
exports.ViewResolver = ViewResolver;
//# sourceMappingURL=view_resolver.js.map