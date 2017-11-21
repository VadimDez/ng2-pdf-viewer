/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * @ngModule CommonModule
 *
 * @whatItDoes Inserts an embedded view from a prepared `TemplateRef`
 *
 * @howToUse
 * ```
 * <ng-container *ngTemplateOutlet="templateRefExp; context: contextExp"></ng-container>
 * ```
 *
 * @description
 *
 * You can attach a context object to the `EmbeddedViewRef` by setting `[ngTemplateOutletContext]`.
 * `[ngTemplateOutletContext]` should be an object, the object's keys will be available for binding
 * by the local template `let` declarations.
 *
 * Note: using the key `$implicit` in the context object will set it's value as default.
 *
 * ## Example
 *
 * {@example common/ngTemplateOutlet/ts/module.ts region='NgTemplateOutlet'}
 *
 * @stable
 */
export declare class NgTemplateOutlet implements OnChanges {
    private _viewContainerRef;
    private _viewRef;
    ngTemplateOutletContext: Object;
    ngTemplateOutlet: TemplateRef<any>;
    constructor(_viewContainerRef: ViewContainerRef);
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * We need to re-create existing embedded view if:
     * - templateRef has changed
     * - context has changes
     *
     * We mark context object as changed when the corresponding object
     * shape changes (new properties are added or existing properties are removed).
     * In other words we consider context with the same properties as "the same" even
     * if object reference changes (see https://github.com/angular/angular/issues/13407).
     */
    private _shouldRecreateView(changes);
    private _hasContextShapeChanged(ctxChange);
    private _updateExistingContext(ctx);
}
