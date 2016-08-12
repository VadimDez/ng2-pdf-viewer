/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var application_ref_1 = require('./application_ref');
var console_1 = require('./console');
var reflection_1 = require('./reflection/reflection');
var reflector_reader_1 = require('./reflection/reflector_reader');
var testability_1 = require('./testability/testability');
function _reflector() {
    return reflection_1.reflector;
}
var _CORE_PLATFORM_PROVIDERS = [
    application_ref_1.PlatformRef_, { provide: application_ref_1.PlatformRef, useExisting: application_ref_1.PlatformRef_ },
    { provide: reflection_1.Reflector, useFactory: _reflector, deps: [] },
    { provide: reflector_reader_1.ReflectorReader, useExisting: reflection_1.Reflector }, testability_1.TestabilityRegistry, console_1.Console
];
/**
 * This platform has to be included in any other platform
 *
 * @experimental
 */
exports.platformCore = application_ref_1.createPlatformFactory(null, 'core', _CORE_PLATFORM_PROVIDERS);
/**
 * A default set of providers which should be included in any Angular platform.
 *
 * @deprecated Create platforms via `createPlatformFactory(corePlatform, ...) instead!
 */
exports.PLATFORM_COMMON_PROVIDERS = _CORE_PLATFORM_PROVIDERS;
//# sourceMappingURL=platform_core_providers.js.map