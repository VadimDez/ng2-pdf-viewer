/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @abstract
 */
export var Serializer = (function () {
    function Serializer() {
    }
    /**
     * @abstract
     * @param {?} messages
     * @return {?}
     */
    Serializer.prototype.write = function (messages) { };
    /**
     * @abstract
     * @param {?} content
     * @param {?} url
     * @return {?}
     */
    Serializer.prototype.load = function (content, url) { };
    /**
     * @abstract
     * @param {?} message
     * @return {?}
     */
    Serializer.prototype.digest = function (message) { };
    /**
     * @param {?} message
     * @return {?}
     */
    Serializer.prototype.createNameMapper = function (message) { return null; };
    return Serializer;
}());
//# sourceMappingURL=serializer.js.map