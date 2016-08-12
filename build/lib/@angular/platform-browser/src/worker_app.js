/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var browser_1 = require('./browser');
var lang_1 = require('./facade/lang');
var api_1 = require('./web_workers/shared/api');
var client_message_broker_1 = require('./web_workers/shared/client_message_broker');
var message_bus_1 = require('./web_workers/shared/message_bus');
var post_message_bus_1 = require('./web_workers/shared/post_message_bus');
var render_store_1 = require('./web_workers/shared/render_store');
var serializer_1 = require('./web_workers/shared/serializer');
var service_message_broker_1 = require('./web_workers/shared/service_message_broker');
var renderer_1 = require('./web_workers/worker/renderer');
var worker_adapter_1 = require('./web_workers/worker/worker_adapter');
var PrintLogger = (function () {
    function PrintLogger() {
        this.log = lang_1.print;
        this.logError = lang_1.print;
        this.logGroup = lang_1.print;
    }
    PrintLogger.prototype.logGroupEnd = function () { };
    return PrintLogger;
}());
/**
 * @deprecated Use `platformWorkerApp()` or create a custom platform factory via
 * `createPlatformFactory(platformWorkerApp, ...)`
 */
exports.WORKER_APP_PLATFORM_PROVIDERS = core_1.PLATFORM_COMMON_PROVIDERS;
/**
 * @deprecated Create a module that includes `WorkerAppModule` instead. This is empty for backwards
 * compatibility,
 * as all of our bootstrap methods add a module implicitly, i.e. keeping this filled would add the
 * providers 2x.
 */
exports.WORKER_APP_APPLICATION_PROVIDERS = [];
/**
 * @experimental
 */
exports.platformWorkerApp = core_1.createPlatformFactory(core_1.platformCore, 'workerApp');
/**
 * @deprecated Use {@link platformWorkerApp} instead
 */
exports.workerAppPlatform = exports.platformWorkerApp;
function _exceptionHandler() {
    return new core_1.ExceptionHandler(new PrintLogger());
}
// TODO(jteplitz602) remove this and compile with lib.webworker.d.ts (#3492)
var _postMessage = {
    postMessage: function (message, transferrables) {
        postMessage(message, transferrables);
    }
};
function createMessageBus(zone) {
    var sink = new post_message_bus_1.PostMessageBusSink(_postMessage);
    var source = new post_message_bus_1.PostMessageBusSource();
    var bus = new post_message_bus_1.PostMessageBus(sink, source);
    bus.attachToZone(zone);
    return bus;
}
function setupWebWorker() {
    worker_adapter_1.WorkerDomAdapter.makeCurrent();
}
var WorkerAppModule = (function () {
    function WorkerAppModule() {
    }
    /** @nocollapse */
    WorkerAppModule.decorators = [
        { type: core_1.NgModule, args: [{
                    providers: [
                        common_1.FORM_PROVIDERS, browser_1.BROWSER_SANITIZATION_PROVIDERS, serializer_1.Serializer,
                        { provide: client_message_broker_1.ClientMessageBrokerFactory, useClass: client_message_broker_1.ClientMessageBrokerFactory_ },
                        { provide: service_message_broker_1.ServiceMessageBrokerFactory, useClass: service_message_broker_1.ServiceMessageBrokerFactory_ },
                        renderer_1.WebWorkerRootRenderer, { provide: core_1.RootRenderer, useExisting: renderer_1.WebWorkerRootRenderer },
                        { provide: api_1.ON_WEB_WORKER, useValue: true }, render_store_1.RenderStore,
                        { provide: core_1.ExceptionHandler, useFactory: _exceptionHandler, deps: [] },
                        { provide: message_bus_1.MessageBus, useFactory: createMessageBus, deps: [core_1.NgZone] },
                        { provide: core_1.APP_INITIALIZER, useValue: setupWebWorker, multi: true }
                    ],
                    exports: [common_1.CommonModule, core_1.ApplicationModule]
                },] },
    ];
    return WorkerAppModule;
}());
exports.WorkerAppModule = WorkerAppModule;
//# sourceMappingURL=worker_app.js.map