/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var application_init_1 = require('./application_init');
var application_ref_1 = require('./application_ref');
var application_tokens_1 = require('./application_tokens');
var change_detection_1 = require('./change_detection/change_detection');
var compiler_1 = require('./linker/compiler');
var component_resolver_1 = require('./linker/component_resolver');
var dynamic_component_loader_1 = require('./linker/dynamic_component_loader');
var view_utils_1 = require('./linker/view_utils');
var metadata_1 = require('./metadata');
function _iterableDiffersFactory() {
    return change_detection_1.defaultIterableDiffers;
}
exports._iterableDiffersFactory = _iterableDiffersFactory;
function _keyValueDiffersFactory() {
    return change_detection_1.defaultKeyValueDiffers;
}
exports._keyValueDiffersFactory = _keyValueDiffersFactory;
/**
 * A default set of providers which should be included in any Angular
 * application, regardless of the platform it runs onto.
 *
 * @deprecated Include `ApplicationModule` instead.
 */
exports.APPLICATION_COMMON_PROVIDERS = [];
var ApplicationModule = (function () {
    function ApplicationModule() {
    }
    /** @nocollapse */
    ApplicationModule.decorators = [
        { type: metadata_1.NgModule, args: [{
                    providers: [
                        application_ref_1.ApplicationRef_,
                        { provide: application_ref_1.ApplicationRef, useExisting: application_ref_1.ApplicationRef_ },
                        application_init_1.ApplicationInitStatus,
                        compiler_1.Compiler,
                        { provide: component_resolver_1.ComponentResolver, useExisting: compiler_1.Compiler },
                        application_tokens_1.APP_ID_RANDOM_PROVIDER,
                        view_utils_1.ViewUtils,
                        { provide: change_detection_1.IterableDiffers, useFactory: _iterableDiffersFactory },
                        { provide: change_detection_1.KeyValueDiffers, useFactory: _keyValueDiffersFactory },
                        { provide: dynamic_component_loader_1.DynamicComponentLoader, useClass: dynamic_component_loader_1.DynamicComponentLoader_ },
                    ]
                },] },
    ];
    return ApplicationModule;
}());
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=application_module.js.map