/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export var StyleWithImports = (function () {
    /**
     * @param {?} style
     * @param {?} styleUrls
     */
    function StyleWithImports(style, styleUrls) {
        this.style = style;
        this.styleUrls = styleUrls;
    }
    return StyleWithImports;
}());
function StyleWithImports_tsickle_Closure_declarations() {
    /** @type {?} */
    StyleWithImports.prototype.style;
    /** @type {?} */
    StyleWithImports.prototype.styleUrls;
}
/**
 * @param {?} url
 * @return {?}
 */
export function isStyleUrlResolvable(url) {
    if (url == null || url.length === 0 || url[0] == '/')
        return false;
    var /** @type {?} */ schemeMatch = url.match(URL_WITH_SCHEMA_REGEXP);
    return schemeMatch === null || schemeMatch[1] == 'package' || schemeMatch[1] == 'asset';
}
/**
 * Rewrites stylesheets by resolving and removing the \@import urls that
 * are either relative or don't have a `package:` scheme
 * @param {?} resolver
 * @param {?} baseUrl
 * @param {?} cssText
 * @return {?}
 */
export function extractStyleUrls(resolver, baseUrl, cssText) {
    var /** @type {?} */ foundUrls = [];
    var /** @type {?} */ modifiedCssText = cssText.replace(CSS_COMMENT_REGEXP, '').replace(CSS_IMPORT_REGEXP, function () {
        var m = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            m[_i - 0] = arguments[_i];
        }
        var /** @type {?} */ url = m[1] || m[2];
        if (!isStyleUrlResolvable(url)) {
            // Do not attempt to resolve non-package absolute URLs with URI scheme
            return m[0];
        }
        foundUrls.push(resolver.resolve(baseUrl, url));
        return '';
    });
    return new StyleWithImports(modifiedCssText, foundUrls);
}
var /** @type {?} */ CSS_IMPORT_REGEXP = /@import\s+(?:url\()?\s*(?:(?:['"]([^'"]*))|([^;\)\s]*))[^;]*;?/g;
var /** @type {?} */ CSS_COMMENT_REGEXP = /\/\*.+?\*\//g;
var /** @type {?} */ URL_WITH_SCHEMA_REGEXP = /^([^:/?#]+):/;
//# sourceMappingURL=style_url_resolver.js.map