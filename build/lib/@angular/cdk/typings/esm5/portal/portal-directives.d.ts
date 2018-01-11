/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentRef, EmbeddedViewRef, TemplateRef, ComponentFactoryResolver, ViewContainerRef, OnDestroy, OnInit } from '@angular/core';
import { Portal, TemplatePortal, ComponentPortal, BasePortalOutlet } from './portal';
/**
 * Directive version of a `TemplatePortal`. Because the directive *is* a TemplatePortal,
 * the directive instance itself can be attached to a host, enabling declarative use of portals.
 */
export declare class CdkPortal extends TemplatePortal<any> {
    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef);
}
/**
 * Directive version of a PortalOutlet. Because the directive *is* a PortalOutlet, portals can be
 * directly attached to it, enabling declarative use.
 *
 * Usage:
 * <ng-template [cdkPortalOutlet]="greeting"></ng-template>
 */
export declare class CdkPortalOutlet extends BasePortalOutlet implements OnInit, OnDestroy {
    private _componentFactoryResolver;
    private _viewContainerRef;
    /** Whether the portal component is initialized. */
    private _isInitialized;
    constructor(_componentFactoryResolver: ComponentFactoryResolver, _viewContainerRef: ViewContainerRef);
    /** @deprecated */
    _deprecatedPortal: Portal<any> | null;
    /** @deprecated */
    _deprecatedPortalHost: Portal<any> | null;
    /** Portal associated with the Portal outlet. */
    portal: Portal<any> | null;
    ngOnInit(): void;
    ngOnDestroy(): void;
    /**
     * Attach the given ComponentPortal to this PortalOutlet using the ComponentFactoryResolver.
     *
     * @param portal Portal to be attached to the portal outlet.
     * @returns Reference to the created component.
     */
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T>;
    /**
     * Attach the given TemplatePortal to this PortlHost as an embedded View.
     * @param portal Portal to be attached.
     * @returns Reference to the created embedded view.
     */
    attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C>;
}
export declare class PortalModule {
}
