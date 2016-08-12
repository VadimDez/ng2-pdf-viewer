/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var lang_1 = require('../src/facade/lang');
var MockSchemaRegistry = (function () {
    function MockSchemaRegistry(existingProperties, attrPropMapping) {
        this.existingProperties = existingProperties;
        this.attrPropMapping = attrPropMapping;
    }
    MockSchemaRegistry.prototype.hasProperty = function (tagName, property, schemas) {
        var result = this.existingProperties[property];
        return lang_1.isPresent(result) ? result : true;
    };
    MockSchemaRegistry.prototype.securityContext = function (tagName, property) {
        return core_1.SecurityContext.NONE;
    };
    MockSchemaRegistry.prototype.getMappedPropName = function (attrName) {
        var result = this.attrPropMapping[attrName];
        return lang_1.isPresent(result) ? result : attrName;
    };
    MockSchemaRegistry.prototype.getDefaultComponentElementName = function () { return 'ng-component'; };
    return MockSchemaRegistry;
}());
exports.MockSchemaRegistry = MockSchemaRegistry;
//# sourceMappingURL=schema_registry_mock.js.map