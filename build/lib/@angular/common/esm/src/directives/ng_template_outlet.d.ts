import { TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * Creates and inserts an embedded view based on a prepared `TemplateRef`.
 * You can attach a context object to the `EmbeddedViewRef` by setting `[ngOutletContext]`.
 * `[ngOutletContext]` should be an object, the object's keys will be the local template variables
 * available within the `TemplateRef`.
 *
 * Note: using the key `$implicit` in the context object will set it's value as default.
 *
 * ### Syntax
 * - `<template [ngTemplateOutlet]="templateRefExpression"
 * [ngOutletContext]="objectExpression"></template>`
 *
 * @experimental
 */
export declare class NgTemplateOutlet {
    private _viewContainerRef;
    private _viewRef;
    private _context;
    private _templateRef;
    constructor(_viewContainerRef: ViewContainerRef);
    ngOutletContext: Object;
    ngTemplateOutlet: TemplateRef<Object>;
    private createView();
}
