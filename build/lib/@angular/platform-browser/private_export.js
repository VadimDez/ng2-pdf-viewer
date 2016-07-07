"use strict";
var dom_adapter = require('./src/dom/dom_adapter');
var dom_renderer = require('./src/dom/dom_renderer');
var shared_styles_host = require('./src/dom/shared_styles_host');
exports.__platform_browser_private__ = {
    DomAdapter: dom_adapter.DomAdapter,
    getDOM: dom_adapter.getDOM,
    setRootDomAdapter: dom_adapter.setRootDomAdapter,
    DomRootRenderer: dom_renderer.DomRootRenderer,
    DomRootRenderer_: dom_renderer.DomRootRenderer_,
    DomSharedStylesHost: shared_styles_host.DomSharedStylesHost,
    SharedStylesHost: shared_styles_host.SharedStylesHost
};
//# sourceMappingURL=private_export.js.map