/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectorRef, ComponentRef, DebugElement, ElementRef, NgZone } from '../index';
/**
 * Fixture for debugging and testing a component.
 *
 * @stable
 */
export declare class ComponentFixture<T> {
    /**
     * The DebugElement associated with the root element of this component.
     */
    debugElement: DebugElement;
    /**
     * The instance of the root component class.
     */
    componentInstance: any;
    /**
     * The native element at the root of the component.
     */
    nativeElement: any;
    /**
     * The ElementRef for the element at the root of the component.
     */
    elementRef: ElementRef;
    /**
     * The ComponentRef for the component
     */
    componentRef: ComponentRef<T>;
    /**
     * The ChangeDetectorRef for the component
     */
    changeDetectorRef: ChangeDetectorRef;
    /**
     * The NgZone in which this component was instantiated.
     */
    ngZone: NgZone;
    private _autoDetect;
    private _isStable;
    private _completer;
    private _onUnstableSubscription;
    private _onStableSubscription;
    private _onMicrotaskEmptySubscription;
    private _onErrorSubscription;
    constructor(componentRef: ComponentRef<T>, ngZone: NgZone, autoDetect: boolean);
    private _tick(checkNoChanges);
    /**
     * Trigger a change detection cycle for the component.
     */
    detectChanges(checkNoChanges?: boolean): void;
    /**
     * Do a change detection run to make sure there were no changes.
     */
    checkNoChanges(): void;
    /**
     * Set whether the fixture should autodetect changes.
     *
     * Also runs detectChanges once so that any existing change is detected.
     */
    autoDetectChanges(autoDetect?: boolean): void;
    /**
     * Return whether the fixture is currently stable or has async tasks that have not been completed
     * yet.
     */
    isStable(): boolean;
    /**
     * Get a promise that resolves when the fixture is stable.
     *
     * This can be used to resume testing after events have triggered asynchronous activity or
     * asynchronous change detection.
     */
    whenStable(): Promise<any>;
    /**
     * Trigger component destruction.
     */
    destroy(): void;
}
