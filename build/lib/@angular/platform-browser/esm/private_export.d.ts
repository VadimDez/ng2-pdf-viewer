/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as ng_proble from './src/dom/debug/ng_probe';
import * as dom_adapter from './src/dom/dom_adapter';
import * as dom_renderer from './src/dom/dom_renderer';
import * as dom_events from './src/dom/events/dom_events';
import * as shared_styles_host from './src/dom/shared_styles_host';
export declare namespace __platform_browser_private_types__ {
    type DomAdapter = dom_adapter.DomAdapter;
    var DomAdapter: typeof dom_adapter.DomAdapter;
    var getDOM: typeof dom_adapter.getDOM;
    var setRootDomAdapter: typeof dom_adapter.setRootDomAdapter;
    type DomRootRenderer = dom_renderer.DomRootRenderer;
    var DomRootRenderer: typeof dom_renderer.DomRootRenderer;
    type DomRootRenderer_ = dom_renderer.DomRootRenderer_;
    var DomRootRenderer_: typeof dom_renderer.DomRootRenderer_;
    type DomSharedStylesHost = shared_styles_host.DomSharedStylesHost;
    var DomSharedStylesHost: typeof shared_styles_host.DomSharedStylesHost;
    type SharedStylesHost = shared_styles_host.SharedStylesHost;
    var SharedStylesHost: typeof shared_styles_host.SharedStylesHost;
    var ELEMENT_PROBE_PROVIDERS: typeof ng_proble.ELEMENT_PROBE_PROVIDERS;
    type DomEventsPlugin = dom_events.DomEventsPlugin;
    var DomEventsPlugin: typeof dom_events.DomEventsPlugin;
}
export declare var __platform_browser_private__: {
    DomAdapter: typeof dom_adapter.DomAdapter;
    getDOM: () => dom_adapter.DomAdapter;
    setRootDomAdapter: (adapter: dom_adapter.DomAdapter) => void;
    DomRootRenderer: typeof dom_renderer.DomRootRenderer;
    DomRootRenderer_: typeof dom_renderer.DomRootRenderer_;
    DomSharedStylesHost: typeof shared_styles_host.DomSharedStylesHost;
    SharedStylesHost: typeof shared_styles_host.SharedStylesHost;
    ELEMENT_PROBE_PROVIDERS: any[];
    DomEventsPlugin: typeof dom_events.DomEventsPlugin;
};
