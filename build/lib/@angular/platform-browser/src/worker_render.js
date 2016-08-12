/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var core_private_1 = require('../core_private');
var browser_1 = require('./browser');
var browser_adapter_1 = require('./browser/browser_adapter');
var testability_1 = require('./browser/testability');
var animation_driver_1 = require('./dom/animation_driver');
var dom_adapter_1 = require('./dom/dom_adapter');
var dom_renderer_1 = require('./dom/dom_renderer');
var dom_tokens_1 = require('./dom/dom_tokens');
var dom_events_1 = require('./dom/events/dom_events');
var event_manager_1 = require('./dom/events/event_manager');
var hammer_gestures_1 = require('./dom/events/hammer_gestures');
var key_events_1 = require('./dom/events/key_events');
var shared_styles_host_1 = require('./dom/shared_styles_host');
var exceptions_1 = require('./facade/exceptions');
var api_1 = require('./web_workers/shared/api');
var client_message_broker_1 = require('./web_workers/shared/client_message_broker');
var message_bus_1 = require('./web_workers/shared/message_bus');
var post_message_bus_1 = require('./web_workers/shared/post_message_bus');
var render_store_1 = require('./web_workers/shared/render_store');
var serializer_1 = require('./web_workers/shared/serializer');
var service_message_broker_1 = require('./web_workers/shared/service_message_broker');
var renderer_1 = require('./web_workers/ui/renderer');
var WebWorkerInstance = (function () {
    function WebWorkerInstance() {
    }
    /** @internal */
    WebWorkerInstance.prototype.init = function (worker, bus) {
        this.worker = worker;
        this.bus = bus;
    };
    /** @nocollapse */
    WebWorkerInstance.decorators = [
        { type: core_1.Injectable },
    ];
    return WebWorkerInstance;
}());
exports.WebWorkerInstance = WebWorkerInstance;
/**
 * @experimental WebWorker support is currently experimental.
 */
exports.WORKER_SCRIPT = new core_1.OpaqueToken('WebWorkerScript');
/**
 * A multiple providers used to automatically call the `start()` method after the service is
 * created.
 *
 * TODO(vicb): create an interface for startable services to implement
 * @experimental WebWorker support is currently experimental.
 */
exports.WORKER_UI_STARTABLE_MESSAGING_SERVICE = new core_1.OpaqueToken('WorkerRenderStartableMsgService');
/**
 * @experimental WebWorker support is currently experimental.
 */
exports._WORKER_UI_PLATFORM_PROVIDERS = [
    { provide: core_1.NgZone, useFactory: createNgZone, deps: [] },
    renderer_1.MessageBasedRenderer,
    { provide: exports.WORKER_UI_STARTABLE_MESSAGING_SERVICE, useExisting: renderer_1.MessageBasedRenderer, multi: true },
    browser_1.BROWSER_SANITIZATION_PROVIDERS,
    { provide: core_1.ExceptionHandler, useFactory: _exceptionHandler, deps: [] },
    { provide: dom_tokens_1.DOCUMENT, useFactory: _document, deps: [] },
    // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
    // #5298
    { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: dom_events_1.DomEventsPlugin, multi: true },
    { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: key_events_1.KeyEventsPlugin, multi: true },
    { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: hammer_gestures_1.HammerGesturesPlugin, multi: true },
    { provide: hammer_gestures_1.HAMMER_GESTURE_CONFIG, useClass: hammer_gestures_1.HammerGestureConfig },
    { provide: dom_renderer_1.DomRootRenderer, useClass: dom_renderer_1.DomRootRenderer_ },
    { provide: core_1.RootRenderer, useExisting: dom_renderer_1.DomRootRenderer },
    { provide: shared_styles_host_1.SharedStylesHost, useExisting: shared_styles_host_1.DomSharedStylesHost },
    { provide: service_message_broker_1.ServiceMessageBrokerFactory, useClass: service_message_broker_1.ServiceMessageBrokerFactory_ },
    { provide: client_message_broker_1.ClientMessageBrokerFactory, useClass: client_message_broker_1.ClientMessageBrokerFactory_ },
    { provide: animation_driver_1.AnimationDriver, useFactory: _resolveDefaultAnimationDriver },
    serializer_1.Serializer,
    { provide: api_1.ON_WEB_WORKER, useValue: false },
    render_store_1.RenderStore,
    shared_styles_host_1.DomSharedStylesHost,
    core_1.Testability,
    event_manager_1.EventManager,
    WebWorkerInstance,
    {
        provide: core_1.PLATFORM_INITIALIZER,
        useFactory: initWebWorkerRenderPlatform,
        multi: true,
        deps: [core_1.Injector]
    },
    { provide: message_bus_1.MessageBus, useFactory: messageBusFactory, deps: [WebWorkerInstance] }
];
/**
 * * @deprecated Use `platformWorkerUi()` or create a custom platform factory via
 * `createPlatformFactory(platformWorkerUi, ...)`
 */
exports.WORKER_UI_PLATFORM_PROVIDERS = [core_1.PLATFORM_COMMON_PROVIDERS, exports._WORKER_UI_PLATFORM_PROVIDERS];
/**
 * @deprecated Worker UI only has a platform but no application
 */
exports.WORKER_UI_APPLICATION_PROVIDERS = [];
function initializeGenericWorkerRenderer(injector) {
    var bus = injector.get(message_bus_1.MessageBus);
    var zone = injector.get(core_1.NgZone);
    bus.attachToZone(zone);
    // initialize message services after the bus has been created
    var services = injector.get(exports.WORKER_UI_STARTABLE_MESSAGING_SERVICE);
    zone.runGuarded(function () { services.forEach(function (svc) { svc.start(); }); });
}
function messageBusFactory(instance) {
    return instance.bus;
}
function initWebWorkerRenderPlatform(injector) {
    return function () {
        browser_adapter_1.BrowserDomAdapter.makeCurrent();
        core_private_1.wtfInit();
        testability_1.BrowserGetTestability.init();
        var scriptUri;
        try {
            scriptUri = injector.get(exports.WORKER_SCRIPT);
        }
        catch (e) {
            throw new exceptions_1.BaseException('You must provide your WebWorker\'s initialization script with the WORKER_SCRIPT token');
        }
        var instance = injector.get(WebWorkerInstance);
        spawnWebWorker(scriptUri, instance);
        initializeGenericWorkerRenderer(injector);
    };
}
/**
 * @experimental WebWorker support is currently experimental.
 */
exports.platformWorkerUi = core_1.createPlatformFactory(core_1.platformCore, 'workerUi', exports._WORKER_UI_PLATFORM_PROVIDERS);
/**
 * @deprecated Use {@link platformWorkerUi} instead
 */
exports.workerUiPlatform = exports.platformWorkerUi;
function _exceptionHandler() {
    return new core_1.ExceptionHandler(dom_adapter_1.getDOM());
}
function _document() {
    return dom_adapter_1.getDOM().defaultDoc();
}
function createNgZone() {
    return new core_1.NgZone({ enableLongStackTrace: core_1.isDevMode() });
}
/**
 * Spawns a new class and initializes the WebWorkerInstance
 */
function spawnWebWorker(uri, instance) {
    var webWorker = new Worker(uri);
    var sink = new post_message_bus_1.PostMessageBusSink(webWorker);
    var source = new post_message_bus_1.PostMessageBusSource(webWorker);
    var bus = new post_message_bus_1.PostMessageBus(sink, source);
    instance.init(webWorker, bus);
}
function _resolveDefaultAnimationDriver() {
    // web workers have not been tested or configured to
    // work with animations just yet...
    return animation_driver_1.AnimationDriver.NOOP;
}
//# sourceMappingURL=worker_render.js.map