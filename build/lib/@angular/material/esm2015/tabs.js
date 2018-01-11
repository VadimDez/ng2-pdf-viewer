/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ObserversModule } from '@angular/cdk/observers';
import { CdkPortal, CdkPortalOutlet, PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { ScrollDispatchModule, VIEWPORT_RULER_PROVIDER, ViewportRuler } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, Inject, Input, NgModule, NgZone, Optional, Output, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation, forwardRef } from '@angular/core';
import { MAT_RIPPLE_GLOBAL_OPTIONS, MatCommonModule, MatRippleModule, RippleRenderer, mixinColor, mixinDisableRipple, mixinDisabled, mixinTabIndex } from '@angular/material/core';
import { Subject } from 'rxjs/Subject';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import { of } from 'rxjs/observable/of';
import { Platform } from '@angular/cdk/platform';
import { takeUntil } from 'rxjs/operators/takeUntil';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * The ink-bar is used to display and animate the line underneath the current active tab label.
 * \@docs-private
 */
class MatInkBar {
    /**
     * @param {?} _elementRef
     * @param {?} _ngZone
     */
    constructor(_elementRef, _ngZone) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
    }
    /**
     * Calculates the styles from the provided element in order to align the ink-bar to that element.
     * Shows the ink bar if previously set as hidden.
     * @param {?} element
     * @return {?}
     */
    alignToElement(element) {
        this.show();
        if (typeof requestAnimationFrame !== 'undefined') {
            this._ngZone.runOutsideAngular(() => {
                requestAnimationFrame(() => this._setStyles(element));
            });
        }
        else {
            this._setStyles(element);
        }
    }
    /**
     * Shows the ink bar.
     * @return {?}
     */
    show() {
        this._elementRef.nativeElement.style.visibility = 'visible';
    }
    /**
     * Hides the ink bar.
     * @return {?}
     */
    hide() {
        this._elementRef.nativeElement.style.visibility = 'hidden';
    }
    /**
     * Sets the proper styles to the ink bar element.
     * @param {?} element
     * @return {?}
     */
    _setStyles(element) {
        const /** @type {?} */ inkBar = this._elementRef.nativeElement;
        inkBar.style.left = element ? (element.offsetLeft || 0) + 'px' : '0';
        inkBar.style.width = element ? (element.offsetWidth || 0) + 'px' : '0';
    }
}
MatInkBar.decorators = [
    { type: Directive, args: [{
                selector: 'mat-ink-bar',
                host: {
                    'class': 'mat-ink-bar',
                },
            },] },
];
/** @nocollapse */
MatInkBar.ctorParameters = () => [
    { type: ElementRef, },
    { type: NgZone, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Used to flag tab labels for use with the portal directive
 */
class MatTabLabel extends CdkPortal {
    /**
     * @param {?} templateRef
     * @param {?} viewContainerRef
     */
    constructor(templateRef, viewContainerRef) {
        super(templateRef, viewContainerRef);
    }
}
MatTabLabel.decorators = [
    { type: Directive, args: [{
                selector: '[mat-tab-label], [matTabLabel]',
            },] },
];
/** @nocollapse */
MatTabLabel.ctorParameters = () => [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * \@docs-private
 */
class MatTabBase {
}
const _MatTabMixinBase = mixinDisabled(MatTabBase);
class MatTab extends _MatTabMixinBase {
    /**
     * @param {?} _viewContainerRef
     */
    constructor(_viewContainerRef) {
        super();
        this._viewContainerRef = _viewContainerRef;
        /**
         * The plain text label for the tab, used when there is no template label.
         */
        this.textLabel = '';
        /**
         * The portal that will be the hosted content of the tab
         */
        this._contentPortal = null;
        /**
         * Emits whenever the label changes.
         */
        this._labelChange = new Subject();
        /**
         * Emits whenever the disable changes
         */
        this._disableChange = new Subject();
        /**
         * The relatively indexed position where 0 represents the center, negative is left, and positive
         * represents the right.
         */
        this.position = null;
        /**
         * The initial relatively index origin of the tab if it was created and selected after there
         * was already a selected tab. Provides context of what position the tab should originate from.
         */
        this.origin = null;
        /**
         * Whether the tab is currently active.
         */
        this.isActive = false;
    }
    /**
     * \@docs-private
     * @return {?}
     */
    get content() {
        return this._contentPortal;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.hasOwnProperty('textLabel')) {
            this._labelChange.next();
        }
        if (changes.hasOwnProperty('disabled')) {
            this._disableChange.next();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._disableChange.complete();
        this._labelChange.complete();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._contentPortal = new TemplatePortal(this._content, this._viewContainerRef);
    }
}
MatTab.decorators = [
    { type: Component, args: [{selector: 'mat-tab',
                template: "<ng-template><ng-content></ng-content></ng-template>",
                inputs: ['disabled'],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                exportAs: 'matTab',
            },] },
];
/** @nocollapse */
MatTab.ctorParameters = () => [
    { type: ViewContainerRef, },
];
MatTab.propDecorators = {
    "templateLabel": [{ type: ContentChild, args: [MatTabLabel,] },],
    "_content": [{ type: ViewChild, args: [TemplateRef,] },],
    "textLabel": [{ type: Input, args: ['label',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * The portal host directive for the contents of the tab.
 * \@docs-private
 */
class MatTabBodyPortal extends CdkPortalOutlet {
    /**
     * @param {?} _componentFactoryResolver
     * @param {?} _viewContainerRef
     * @param {?} _host
     */
    constructor(_componentFactoryResolver, _viewContainerRef, _host) {
        super(_componentFactoryResolver, _viewContainerRef);
        this._host = _host;
    }
    /**
     * Set initial visibility or set up subscription for changing visibility.
     * @return {?}
     */
    ngOnInit() {
        if (this._host._isCenterPosition(this._host._position)) {
            this.attach(this._host._content);
        }
        this._centeringSub = this._host._beforeCentering.subscribe((isCentering) => {
            if (isCentering) {
                if (!this.hasAttached()) {
                    this.attach(this._host._content);
                }
            }
        });
        this._leavingSub = this._host._afterLeavingCenter.subscribe(() => {
            this.detach();
        });
    }
    /**
     * Clean up centering subscription.
     * @return {?}
     */
    ngOnDestroy() {
        if (this._centeringSub && !this._centeringSub.closed) {
            this._centeringSub.unsubscribe();
        }
        if (this._leavingSub && !this._leavingSub.closed) {
            this._leavingSub.unsubscribe();
        }
    }
}
MatTabBodyPortal.decorators = [
    { type: Directive, args: [{
                selector: '[matTabBodyHost]'
            },] },
];
/** @nocollapse */
MatTabBodyPortal.ctorParameters = () => [
    { type: ComponentFactoryResolver, },
    { type: ViewContainerRef, },
    { type: MatTabBody, decorators: [{ type: Inject, args: [forwardRef(() => MatTabBody),] },] },
];
/**
 * Wrapper for the contents of a tab.
 * \@docs-private
 */
class MatTabBody {
    /**
     * @param {?} _elementRef
     * @param {?} _dir
     */
    constructor(_elementRef, _dir) {
        this._elementRef = _elementRef;
        this._dir = _dir;
        /**
         * Event emitted when the tab begins to animate towards the center as the active tab.
         */
        this._onCentering = new EventEmitter();
        /**
         * Event emitted before the centering of the tab begins.
         */
        this._beforeCentering = new EventEmitter();
        /**
         * Event emitted before the centering of the tab begins.
         */
        this._afterLeavingCenter = new EventEmitter();
        /**
         * Event emitted when the tab completes its animation towards the center.
         */
        this._onCentered = new EventEmitter(true);
    }
    /**
     * @param {?} position
     * @return {?}
     */
    set position(position) {
        if (position < 0) {
            this._position = this._getLayoutDirection() == 'ltr' ? 'left' : 'right';
        }
        else if (position > 0) {
            this._position = this._getLayoutDirection() == 'ltr' ? 'right' : 'left';
        }
        else {
            this._position = 'center';
        }
    }
    /**
     * The origin position from which this tab should appear when it is centered into view.
     * @param {?} origin
     * @return {?}
     */
    set origin(origin) {
        if (origin == null) {
            return;
        }
        const /** @type {?} */ dir = this._getLayoutDirection();
        if ((dir == 'ltr' && origin <= 0) || (dir == 'rtl' && origin > 0)) {
            this._origin = 'left';
        }
        else {
            this._origin = 'right';
        }
    }
    /**
     * After initialized, check if the content is centered and has an origin. If so, set the
     * special position states that transition the tab from the left or right before centering.
     * @return {?}
     */
    ngOnInit() {
        if (this._position == 'center' && this._origin) {
            this._position = this._origin == 'left' ? 'left-origin-center' : 'right-origin-center';
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _onTranslateTabStarted(e) {
        const /** @type {?} */ isCentering = this._isCenterPosition(e.toState);
        this._beforeCentering.emit(isCentering);
        if (isCentering) {
            this._onCentering.emit(this._elementRef.nativeElement.clientHeight);
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    _onTranslateTabComplete(e) {
        // If the transition to the center is complete, emit an event.
        if (this._isCenterPosition(e.toState) && this._isCenterPosition(this._position)) {
            this._onCentered.emit();
        }
        if (this._isCenterPosition(e.fromState) && !this._isCenterPosition(this._position)) {
            this._afterLeavingCenter.emit();
        }
    }
    /**
     * The text direction of the containing app.
     * @return {?}
     */
    _getLayoutDirection() {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }
    /**
     * Whether the provided position state is considered center, regardless of origin.
     * @param {?} position
     * @return {?}
     */
    _isCenterPosition(position) {
        return position == 'center' ||
            position == 'left-origin-center' ||
            position == 'right-origin-center';
    }
}
MatTabBody.decorators = [
    { type: Component, args: [{selector: 'mat-tab-body',
                template: "<div class=\"mat-tab-body-content\" #content [@translateTab]=\"_position\" (@translateTab.start)=\"_onTranslateTabStarted($event)\" (@translateTab.done)=\"_onTranslateTabComplete($event)\"><ng-template matTabBodyHost></ng-template></div>",
                styles: [".mat-tab-body-content{-webkit-backface-visibility:hidden;backface-visibility:hidden;height:100%;overflow:auto}.mat-tab-group-dynamic-height .mat-tab-body-content{overflow:hidden}"],
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'class': 'mat-tab-body',
                },
                animations: [
                    trigger('translateTab', [
                        // Note: transitions to `none` instead of 0, because some browsers might blur the content.
                        state('center, void, left-origin-center, right-origin-center', style({ transform: 'none' })),
                        state('left', style({ transform: 'translate3d(-100%, 0, 0)' })),
                        state('right', style({ transform: 'translate3d(100%, 0, 0)' })),
                        transition('* => left, * => right, left => center, right => center', animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')),
                        transition('void => left-origin-center', [
                            style({ transform: 'translate3d(-100%, 0, 0)' }),
                            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
                        ]),
                        transition('void => right-origin-center', [
                            style({ transform: 'translate3d(100%, 0, 0)' }),
                            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
                        ])
                    ])
                ]
            },] },
];
/** @nocollapse */
MatTabBody.ctorParameters = () => [
    { type: ElementRef, },
    { type: Directionality, decorators: [{ type: Optional },] },
];
MatTabBody.propDecorators = {
    "_onCentering": [{ type: Output },],
    "_beforeCentering": [{ type: Output },],
    "_afterLeavingCenter": [{ type: Output },],
    "_onCentered": [{ type: Output },],
    "_content": [{ type: Input, args: ['content',] },],
    "position": [{ type: Input, args: ['position',] },],
    "origin": [{ type: Input, args: ['origin',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Used to generate unique ID's for each tab component
 */
let nextId = 0;
/**
 * A simple change event emitted on focus or selection changes.
 */
class MatTabChangeEvent {
}
/**
 * \@docs-private
 */
class MatTabGroupBase {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _MatTabGroupMixinBase = mixinColor(mixinDisableRipple(MatTabGroupBase), 'primary');
/**
 * Material design tab-group component.  Supports basic tab pairs (label + content) and includes
 * animated ink-bar, keyboard navigation, and screen reader.
 * See: https://www.google.com/design/spec/components/tabs.html
 */
class MatTabGroup extends _MatTabGroupMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} _changeDetectorRef
     */
    constructor(elementRef, _changeDetectorRef) {
        super(elementRef);
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * The tab index that should be selected after the content has been checked.
         */
        this._indexToSelect = 0;
        /**
         * Snapshot of the height of the tab body wrapper before another tab is activated.
         */
        this._tabBodyWrapperHeight = 0;
        /**
         * Subscription to tabs being added/removed.
         */
        this._tabsSubscription = Subscription.EMPTY;
        /**
         * Subscription to changes in the tab labels.
         */
        this._tabLabelSubscription = Subscription.EMPTY;
        this._dynamicHeight = false;
        this._selectedIndex = null;
        /**
         * Position of the tab header.
         */
        this.headerPosition = 'above';
        /**
         * Output to enable support for two-way binding on `[(selectedIndex)]`
         */
        this.selectedIndexChange = new EventEmitter();
        /**
         * Event emitted when focus has changed within a tab group.
         */
        this.focusChange = new EventEmitter();
        /**
         * Event emitted when the tab selection has changed.
         */
        this.selectedTabChange = new EventEmitter(true);
        /**
         * Event emitted when the tab selection has changed.
         * @deprecated Use `selectedTabChange` instead.
         */
        this.selectChange = this.selectedTabChange;
        this._groupId = nextId++;
    }
    /**
     * Whether the tab group should grow to the size of the active tab.
     * @return {?}
     */
    get dynamicHeight() { return this._dynamicHeight; }
    /**
     * @param {?} value
     * @return {?}
     */
    set dynamicHeight(value) { this._dynamicHeight = coerceBooleanProperty(value); }
    /**
     * @deprecated
     * @return {?}
     */
    get _dynamicHeightDeprecated() { return this._dynamicHeight; }
    /**
     * @param {?} value
     * @return {?}
     */
    set _dynamicHeightDeprecated(value) { this._dynamicHeight = value; }
    /**
     * The index of the active tab.
     * @param {?} value
     * @return {?}
     */
    set selectedIndex(value) {
        this._indexToSelect = coerceNumberProperty(value, null);
    }
    /**
     * @return {?}
     */
    get selectedIndex() { return this._selectedIndex; }
    /**
     * Background color of the tab group.
     * @return {?}
     */
    get backgroundColor() { return this._backgroundColor; }
    /**
     * @param {?} value
     * @return {?}
     */
    set backgroundColor(value) {
        const /** @type {?} */ nativeElement = this._elementRef.nativeElement;
        nativeElement.classList.remove(`mat-background-${this.backgroundColor}`);
        if (value) {
            nativeElement.classList.add(`mat-background-${value}`);
        }
        this._backgroundColor = value;
    }
    /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be. This is where we can know exactly what position
     * each tab should be in according to the new selected index, and additionally we know how
     * a new selected tab should transition in (from the left or right).
     * @return {?}
     */
    ngAfterContentChecked() {
        // Clamp the next selected index to the boundsof 0 and the tabs length.
        // Note the `|| 0`, which ensures that values like NaN can't get through
        // and which would otherwise throw the component into an infinite loop
        // (since Math.max(NaN, 0) === NaN).
        let /** @type {?} */ indexToSelect = this._indexToSelect =
            Math.min(this._tabs.length - 1, Math.max(this._indexToSelect || 0, 0));
        // If there is a change in selected index, emit a change event. Should not trigger if
        // the selected index has not yet been initialized.
        if (this._selectedIndex != indexToSelect && this._selectedIndex != null) {
            const /** @type {?} */ tabChangeEvent = this._createChangeEvent(indexToSelect);
            this.selectedTabChange.emit(tabChangeEvent);
            // Emitting this value after change detection has run
            // since the checked content may contain this variable'
            Promise.resolve().then(() => this.selectedIndexChange.emit(indexToSelect));
        }
        // Setup the position for each tab and optionally setup an origin on the next selected tab.
        this._tabs.forEach((tab, index) => {
            tab.position = index - indexToSelect;
            tab.isActive = index === indexToSelect;
            // If there is already a selected tab, then set up an origin for the next selected tab
            // if it doesn't have one already.
            if (this._selectedIndex != null && tab.position == 0 && !tab.origin) {
                tab.origin = indexToSelect - this._selectedIndex;
            }
        });
        if (this._selectedIndex !== indexToSelect) {
            this._selectedIndex = indexToSelect;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._subscribeToTabLabels();
        // Subscribe to changes in the amount of tabs, in order to be
        // able to re-render the content as new tabs are added or removed.
        this._tabsSubscription = this._tabs.changes.subscribe(() => {
            this._subscribeToTabLabels();
            this._changeDetectorRef.markForCheck();
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._tabsSubscription.unsubscribe();
        this._tabLabelSubscription.unsubscribe();
    }
    /**
     * @param {?} index
     * @return {?}
     */
    _focusChanged(index) {
        this.focusChange.emit(this._createChangeEvent(index));
    }
    /**
     * @param {?} index
     * @return {?}
     */
    _createChangeEvent(index) {
        const /** @type {?} */ event = new MatTabChangeEvent;
        event.index = index;
        if (this._tabs && this._tabs.length) {
            event.tab = this._tabs.toArray()[index];
        }
        return event;
    }
    /**
     * Subscribes to changes in the tab labels. This is needed, because the \@Input for the label is
     * on the MatTab component, whereas the data binding is inside the MatTabGroup. In order for the
     * binding to be updated, we need to subscribe to changes in it and trigger change detection
     * manually.
     * @return {?}
     */
    _subscribeToTabLabels() {
        if (this._tabLabelSubscription) {
            this._tabLabelSubscription.unsubscribe();
        }
        this._tabLabelSubscription = merge(...this._tabs.map(tab => tab._disableChange), ...this._tabs.map(tab => tab._labelChange)).subscribe(() => {
            this._changeDetectorRef.markForCheck();
        });
    }
    /**
     * Returns a unique id for each tab label element
     * @param {?} i
     * @return {?}
     */
    _getTabLabelId(i) {
        return `mat-tab-label-${this._groupId}-${i}`;
    }
    /**
     * Returns a unique id for each tab content element
     * @param {?} i
     * @return {?}
     */
    _getTabContentId(i) {
        return `mat-tab-content-${this._groupId}-${i}`;
    }
    /**
     * Sets the height of the body wrapper to the height of the activating tab if dynamic
     * height property is true.
     * @param {?} tabHeight
     * @return {?}
     */
    _setTabBodyWrapperHeight(tabHeight) {
        if (!this._dynamicHeight || !this._tabBodyWrapperHeight) {
            return;
        }
        const /** @type {?} */ wrapper = this._tabBodyWrapper.nativeElement;
        wrapper.style.height = this._tabBodyWrapperHeight + 'px';
        // This conditional forces the browser to paint the height so that
        // the animation to the new height can have an origin.
        if (this._tabBodyWrapper.nativeElement.offsetHeight) {
            wrapper.style.height = tabHeight + 'px';
        }
    }
    /**
     * Removes the height of the tab body wrapper.
     * @return {?}
     */
    _removeTabBodyWrapperHeight() {
        this._tabBodyWrapperHeight = this._tabBodyWrapper.nativeElement.clientHeight;
        this._tabBodyWrapper.nativeElement.style.height = '';
    }
    /**
     * Handle click events, setting new selected index if appropriate.
     * @param {?} tab
     * @param {?} tabHeader
     * @param {?} idx
     * @return {?}
     */
    _handleClick(tab, tabHeader, idx) {
        if (!tab.disabled) {
            this.selectedIndex = tabHeader.focusIndex = idx;
        }
    }
    /**
     * Retrieves the tabindex for the tab.
     * @param {?} tab
     * @param {?} idx
     * @return {?}
     */
    _getTabIndex(tab, idx) {
        if (tab.disabled) {
            return null;
        }
        return this.selectedIndex === idx ? 0 : -1;
    }
}
MatTabGroup.decorators = [
    { type: Component, args: [{selector: 'mat-tab-group',
                exportAs: 'matTabGroup',
                template: "<mat-tab-header #tabHeader [selectedIndex]=\"selectedIndex\" [disableRipple]=\"disableRipple\" (indexFocused)=\"_focusChanged($event)\" (selectFocusedIndex)=\"selectedIndex = $event\"><div class=\"mat-tab-label\" role=\"tab\" matTabLabelWrapper mat-ripple *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabLabelId(i)\" [attr.tabIndex]=\"_getTabIndex(tab, i)\" [attr.aria-controls]=\"_getTabContentId(i)\" [attr.aria-selected]=\"selectedIndex == i\" [class.mat-tab-label-active]=\"selectedIndex == i\" [disabled]=\"tab.disabled\" [matRippleDisabled]=\"tab.disabled || disableRipple\" (click)=\"_handleClick(tab, tabHeader, i)\"><ng-template [ngIf]=\"tab.templateLabel\"><ng-template [cdkPortalOutlet]=\"tab.templateLabel\"></ng-template></ng-template><ng-template [ngIf]=\"!tab.templateLabel\">{{tab.textLabel}}</ng-template></div></mat-tab-header><div class=\"mat-tab-body-wrapper\" #tabBodyWrapper><mat-tab-body role=\"tabpanel\" *ngFor=\"let tab of _tabs; let i = index\" [id]=\"_getTabContentId(i)\" [attr.aria-labelledby]=\"_getTabLabelId(i)\" [class.mat-tab-body-active]=\"selectedIndex == i\" [content]=\"tab.content\" [position]=\"tab.position\" [origin]=\"tab.origin\" (_onCentered)=\"_removeTabBodyWrapperHeight()\" (_onCentering)=\"_setTabBodyWrapperHeight($event)\"></mat-tab-body></div>",
                styles: [".mat-tab-group{display:flex;flex-direction:column}.mat-tab-group.mat-tab-group-inverted-header{flex-direction:column-reverse}.mat-tab-label{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;position:relative}.mat-tab-label:focus{outline:0;opacity:1}.mat-tab-label.mat-tab-disabled{cursor:default}@media (max-width:600px){.mat-tab-label{padding:0 12px}}@media (max-width:960px){.mat-tab-label{padding:0 12px}}.mat-tab-group[mat-stretch-tabs] .mat-tab-label{flex-basis:0;flex-grow:1}.mat-tab-body-wrapper{position:relative;overflow:hidden;display:flex;transition:height .5s cubic-bezier(.35,0,.25,1)}.mat-tab-body{top:0;left:0;right:0;bottom:0;position:absolute;display:block;overflow:hidden}.mat-tab-body.mat-tab-body-active{position:relative;overflow-x:hidden;overflow-y:auto;z-index:1;flex-grow:1}.mat-tab-group.mat-tab-group-dynamic-height .mat-tab-body.mat-tab-body-active{overflow-y:hidden}"],
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                inputs: ['color', 'disableRipple'],
                host: {
                    'class': 'mat-tab-group',
                    '[class.mat-tab-group-dynamic-height]': 'dynamicHeight',
                    '[class.mat-tab-group-inverted-header]': 'headerPosition === "below"',
                },
            },] },
];
/** @nocollapse */
MatTabGroup.ctorParameters = () => [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
];
MatTabGroup.propDecorators = {
    "_tabs": [{ type: ContentChildren, args: [MatTab,] },],
    "_tabBodyWrapper": [{ type: ViewChild, args: ['tabBodyWrapper',] },],
    "dynamicHeight": [{ type: Input },],
    "_dynamicHeightDeprecated": [{ type: Input, args: ['mat-dynamic-height',] },],
    "selectedIndex": [{ type: Input },],
    "headerPosition": [{ type: Input },],
    "backgroundColor": [{ type: Input },],
    "selectedIndexChange": [{ type: Output },],
    "focusChange": [{ type: Output },],
    "selectedTabChange": [{ type: Output },],
    "selectChange": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * \@docs-private
 */
class MatTabLabelWrapperBase {
}
const _MatTabLabelWrapperMixinBase = mixinDisabled(MatTabLabelWrapperBase);
/**
 * Used in the `mat-tab-group` view to display tab labels.
 * \@docs-private
 */
class MatTabLabelWrapper extends _MatTabLabelWrapperMixinBase {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super();
        this.elementRef = elementRef;
    }
    /**
     * Sets focus on the wrapper element
     * @return {?}
     */
    focus() {
        this.elementRef.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    getOffsetLeft() {
        return this.elementRef.nativeElement.offsetLeft;
    }
    /**
     * @return {?}
     */
    getOffsetWidth() {
        return this.elementRef.nativeElement.offsetWidth;
    }
}
MatTabLabelWrapper.decorators = [
    { type: Directive, args: [{
                selector: '[matTabLabelWrapper]',
                inputs: ['disabled'],
                host: {
                    '[class.mat-tab-disabled]': 'disabled'
                }
            },] },
];
/** @nocollapse */
MatTabLabelWrapper.ctorParameters = () => [
    { type: ElementRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * The distance in pixels that will be overshot when scrolling a tab label into view. This helps
 * provide a small affordance to the label next to it.
 */
const EXAGGERATED_OVERSCROLL = 60;
/**
 * \@docs-private
 */
class MatTabHeaderBase {
}
const _MatTabHeaderMixinBase = mixinDisableRipple(MatTabHeaderBase);
/**
 * The header of the tab group which displays a list of all the tabs in the tab group. Includes
 * an ink bar that follows the currently selected tab. When the tabs list's width exceeds the
 * width of the header container, then arrows will be displayed to allow the user to scroll
 * left and right across the header.
 * \@docs-private
 */
class MatTabHeader extends _MatTabHeaderMixinBase {
    /**
     * @param {?} _elementRef
     * @param {?} _changeDetectorRef
     * @param {?} _viewportRuler
     * @param {?} _dir
     */
    constructor(_elementRef, _changeDetectorRef, _viewportRuler, _dir) {
        super();
        this._elementRef = _elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._viewportRuler = _viewportRuler;
        this._dir = _dir;
        /**
         * The tab index that is focused.
         */
        this._focusIndex = 0;
        /**
         * The distance in pixels that the tab labels should be translated to the left.
         */
        this._scrollDistance = 0;
        /**
         * Whether the header should scroll to the selected index after the view has been checked.
         */
        this._selectedIndexChanged = false;
        /**
         * Combines listeners that will re-align the ink bar whenever they're invoked.
         */
        this._realignInkBar = Subscription.EMPTY;
        /**
         * Whether the controls for pagination should be displayed
         */
        this._showPaginationControls = false;
        /**
         * Whether the tab list can be scrolled more towards the end of the tab label list.
         */
        this._disableScrollAfter = true;
        /**
         * Whether the tab list can be scrolled more towards the beginning of the tab label list.
         */
        this._disableScrollBefore = true;
        this._selectedIndex = 0;
        /**
         * Event emitted when the option is selected.
         */
        this.selectFocusedIndex = new EventEmitter();
        /**
         * Event emitted when a label is focused.
         */
        this.indexFocused = new EventEmitter();
    }
    /**
     * The index of the active tab.
     * @return {?}
     */
    get selectedIndex() { return this._selectedIndex; }
    /**
     * @param {?} value
     * @return {?}
     */
    set selectedIndex(value) {
        value = coerceNumberProperty(value);
        this._selectedIndexChanged = this._selectedIndex != value;
        this._selectedIndex = value;
        this._focusIndex = value;
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        // If the number of tab labels have changed, check if scrolling should be enabled
        if (this._tabLabelCount != this._labelWrappers.length) {
            this._updatePagination();
            this._tabLabelCount = this._labelWrappers.length;
            this._changeDetectorRef.markForCheck();
        }
        // If the selected index has changed, scroll to the label and check if the scrolling controls
        // should be disabled.
        if (this._selectedIndexChanged) {
            this._scrollToLabel(this._selectedIndex);
            this._checkScrollingControls();
            this._alignInkBarToSelectedTab();
            this._selectedIndexChanged = false;
            this._changeDetectorRef.markForCheck();
        }
        // If the scroll distance has been changed (tab selected, focused, scroll controls activated),
        // then translate the header to reflect this.
        if (this._scrollDistanceChanged) {
            this._updateTabScrollPosition();
            this._scrollDistanceChanged = false;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleKeydown(event) {
        switch (event.keyCode) {
            case RIGHT_ARROW:
                this._focusNextTab();
                break;
            case LEFT_ARROW:
                this._focusPreviousTab();
                break;
            case ENTER:
            case SPACE:
                this.selectFocusedIndex.emit(this.focusIndex);
                event.preventDefault();
                break;
        }
    }
    /**
     * Aligns the ink bar to the selected tab on load.
     * @return {?}
     */
    ngAfterContentInit() {
        const /** @type {?} */ dirChange = this._dir ? this._dir.change : of(null);
        const /** @type {?} */ resize = this._viewportRuler.change(150);
        const /** @type {?} */ realign = () => {
            this._updatePagination();
            this._alignInkBarToSelectedTab();
        };
        // Defer the first call in order to allow for slower browsers to lay out the elements.
        // This helps in cases where the user lands directly on a page with paginated tabs.
        typeof requestAnimationFrame !== 'undefined' ? requestAnimationFrame(realign) : realign();
        this._realignInkBar = merge(dirChange, resize).subscribe(realign);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._realignInkBar.unsubscribe();
    }
    /**
     * Callback for when the MutationObserver detects that the content has changed.
     * @return {?}
     */
    _onContentChanges() {
        this._updatePagination();
        this._alignInkBarToSelectedTab();
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Updating the view whether pagination should be enabled or not
     * @return {?}
     */
    _updatePagination() {
        this._checkPaginationEnabled();
        this._checkScrollingControls();
        this._updateTabScrollPosition();
    }
    /**
     * When the focus index is set, we must manually send focus to the correct label
     * @param {?} value
     * @return {?}
     */
    set focusIndex(value) {
        if (!this._isValidIndex(value) || this._focusIndex == value) {
            return;
        }
        this._focusIndex = value;
        this.indexFocused.emit(value);
        this._setTabFocus(value);
    }
    /**
     * Tracks which element has focus; used for keyboard navigation
     * @return {?}
     */
    get focusIndex() { return this._focusIndex; }
    /**
     * Determines if an index is valid.  If the tabs are not ready yet, we assume that the user is
     * providing a valid index and return true.
     * @param {?} index
     * @return {?}
     */
    _isValidIndex(index) {
        if (!this._labelWrappers) {
            return true;
        }
        const /** @type {?} */ tab = this._labelWrappers ? this._labelWrappers.toArray()[index] : null;
        return !!tab && !tab.disabled;
    }
    /**
     * Sets focus on the HTML element for the label wrapper and scrolls it into the view if
     * scrolling is enabled.
     * @param {?} tabIndex
     * @return {?}
     */
    _setTabFocus(tabIndex) {
        if (this._showPaginationControls) {
            this._scrollToLabel(tabIndex);
        }
        if (this._labelWrappers && this._labelWrappers.length) {
            this._labelWrappers.toArray()[tabIndex].focus();
            // Do not let the browser manage scrolling to focus the element, this will be handled
            // by using translation. In LTR, the scroll left should be 0. In RTL, the scroll width
            // should be the full width minus the offset width.
            const /** @type {?} */ containerEl = this._tabListContainer.nativeElement;
            const /** @type {?} */ dir = this._getLayoutDirection();
            if (dir == 'ltr') {
                containerEl.scrollLeft = 0;
            }
            else {
                containerEl.scrollLeft = containerEl.scrollWidth - containerEl.offsetWidth;
            }
        }
    }
    /**
     * Moves the focus towards the beginning or the end of the list depending on the offset provided.
     * Valid offsets are 1 and -1.
     * @param {?} offset
     * @return {?}
     */
    _moveFocus(offset) {
        if (this._labelWrappers) {
            const /** @type {?} */ tabs = this._labelWrappers.toArray();
            for (let /** @type {?} */ i = this.focusIndex + offset; i < tabs.length && i >= 0; i += offset) {
                if (this._isValidIndex(i)) {
                    this.focusIndex = i;
                    return;
                }
            }
        }
    }
    /**
     * Increment the focus index by 1 until a valid tab is found.
     * @return {?}
     */
    _focusNextTab() {
        this._moveFocus(this._getLayoutDirection() == 'ltr' ? 1 : -1);
    }
    /**
     * Decrement the focus index by 1 until a valid tab is found.
     * @return {?}
     */
    _focusPreviousTab() {
        this._moveFocus(this._getLayoutDirection() == 'ltr' ? -1 : 1);
    }
    /**
     * The layout direction of the containing app.
     * @return {?}
     */
    _getLayoutDirection() {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }
    /**
     * Performs the CSS transformation on the tab list that will cause the list to scroll.
     * @return {?}
     */
    _updateTabScrollPosition() {
        const /** @type {?} */ scrollDistance = this.scrollDistance;
        const /** @type {?} */ translateX = this._getLayoutDirection() === 'ltr' ? -scrollDistance : scrollDistance;
        this._tabList.nativeElement.style.transform = `translate3d(${translateX}px, 0, 0)`;
    }
    /**
     * Sets the distance in pixels that the tab header should be transformed in the X-axis.
     * @param {?} v
     * @return {?}
     */
    set scrollDistance(v) {
        this._scrollDistance = Math.max(0, Math.min(this._getMaxScrollDistance(), v));
        // Mark that the scroll distance has changed so that after the view is checked, the CSS
        // transformation can move the header.
        this._scrollDistanceChanged = true;
        this._checkScrollingControls();
    }
    /**
     * @return {?}
     */
    get scrollDistance() { return this._scrollDistance; }
    /**
     * Moves the tab list in the 'before' or 'after' direction (towards the beginning of the list or
     * the end of the list, respectively). The distance to scroll is computed to be a third of the
     * length of the tab list view window.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @param {?} scrollDir
     * @return {?}
     */
    _scrollHeader(scrollDir) {
        const /** @type {?} */ viewLength = this._tabListContainer.nativeElement.offsetWidth;
        // Move the scroll distance one-third the length of the tab list's viewport.
        this.scrollDistance += (scrollDir == 'before' ? -1 : 1) * viewLength / 3;
    }
    /**
     * Moves the tab list such that the desired tab label (marked by index) is moved into view.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @param {?} labelIndex
     * @return {?}
     */
    _scrollToLabel(labelIndex) {
        const /** @type {?} */ selectedLabel = this._labelWrappers ? this._labelWrappers.toArray()[labelIndex] : null;
        if (!selectedLabel) {
            return;
        }
        // The view length is the visible width of the tab labels.
        const /** @type {?} */ viewLength = this._tabListContainer.nativeElement.offsetWidth;
        let /** @type {?} */ labelBeforePos, /** @type {?} */ labelAfterPos;
        if (this._getLayoutDirection() == 'ltr') {
            labelBeforePos = selectedLabel.getOffsetLeft();
            labelAfterPos = labelBeforePos + selectedLabel.getOffsetWidth();
        }
        else {
            labelAfterPos = this._tabList.nativeElement.offsetWidth - selectedLabel.getOffsetLeft();
            labelBeforePos = labelAfterPos - selectedLabel.getOffsetWidth();
        }
        const /** @type {?} */ beforeVisiblePos = this.scrollDistance;
        const /** @type {?} */ afterVisiblePos = this.scrollDistance + viewLength;
        if (labelBeforePos < beforeVisiblePos) {
            // Scroll header to move label to the before direction
            this.scrollDistance -= beforeVisiblePos - labelBeforePos + EXAGGERATED_OVERSCROLL;
        }
        else if (labelAfterPos > afterVisiblePos) {
            // Scroll header to move label to the after direction
            this.scrollDistance += labelAfterPos - afterVisiblePos + EXAGGERATED_OVERSCROLL;
        }
    }
    /**
     * Evaluate whether the pagination controls should be displayed. If the scroll width of the
     * tab list is wider than the size of the header container, then the pagination controls should
     * be shown.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    _checkPaginationEnabled() {
        const /** @type {?} */ isEnabled = this._tabList.nativeElement.scrollWidth > this._elementRef.nativeElement.offsetWidth;
        if (!isEnabled) {
            this.scrollDistance = 0;
        }
        if (isEnabled !== this._showPaginationControls) {
            this._changeDetectorRef.markForCheck();
        }
        this._showPaginationControls = isEnabled;
    }
    /**
     * Evaluate whether the before and after controls should be enabled or disabled.
     * If the header is at the beginning of the list (scroll distance is equal to 0) then disable the
     * before button. If the header is at the end of the list (scroll distance is equal to the
     * maximum distance we can scroll), then disable the after button.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    _checkScrollingControls() {
        // Check if the pagination arrows should be activated.
        this._disableScrollBefore = this.scrollDistance == 0;
        this._disableScrollAfter = this.scrollDistance == this._getMaxScrollDistance();
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Determines what is the maximum length in pixels that can be set for the scroll distance. This
     * is equal to the difference in width between the tab list container and tab header container.
     *
     * This is an expensive call that forces a layout reflow to compute box and scroll metrics and
     * should be called sparingly.
     * @return {?}
     */
    _getMaxScrollDistance() {
        const /** @type {?} */ lengthOfTabList = this._tabList.nativeElement.scrollWidth;
        const /** @type {?} */ viewLength = this._tabListContainer.nativeElement.offsetWidth;
        return (lengthOfTabList - viewLength) || 0;
    }
    /**
     * Tells the ink-bar to align itself to the current label wrapper
     * @return {?}
     */
    _alignInkBarToSelectedTab() {
        const /** @type {?} */ selectedLabelWrapper = this._labelWrappers && this._labelWrappers.length ?
            this._labelWrappers.toArray()[this.selectedIndex].elementRef.nativeElement :
            null;
        this._inkBar.alignToElement(selectedLabelWrapper);
    }
}
MatTabHeader.decorators = [
    { type: Component, args: [{selector: 'mat-tab-header',
                template: "<div class=\"mat-tab-header-pagination mat-tab-header-pagination-before mat-elevation-z4\" aria-hidden=\"true\" mat-ripple [matRippleDisabled]=\"_disableScrollBefore || disableRipple\" [class.mat-tab-header-pagination-disabled]=\"_disableScrollBefore\" (click)=\"_scrollHeader('before')\"><div class=\"mat-tab-header-pagination-chevron\"></div></div><div class=\"mat-tab-label-container\" #tabListContainer (keydown)=\"_handleKeydown($event)\"><div class=\"mat-tab-list\" #tabList role=\"tablist\" (cdkObserveContent)=\"_onContentChanges()\"><div class=\"mat-tab-labels\"><ng-content></ng-content></div><mat-ink-bar></mat-ink-bar></div></div><div class=\"mat-tab-header-pagination mat-tab-header-pagination-after mat-elevation-z4\" aria-hidden=\"true\" mat-ripple [matRippleDisabled]=\"_disableScrollAfter || disableRipple\" [class.mat-tab-header-pagination-disabled]=\"_disableScrollAfter\" (click)=\"_scrollHeader('after')\"><div class=\"mat-tab-header-pagination-chevron\"></div></div>",
                styles: [".mat-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mat-tab-label{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;position:relative}.mat-tab-label:focus{outline:0;opacity:1}.mat-tab-label.mat-tab-disabled{cursor:default}@media (max-width:600px){.mat-tab-label{min-width:72px}}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:.5s cubic-bezier(.35,0,.25,1)}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0}.mat-tab-header-pagination{position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2}.mat-tab-header-pagination-controls-enabled .mat-tab-header-pagination{display:flex}.mat-tab-header-pagination-before,.mat-tab-header-rtl .mat-tab-header-pagination-after{padding-left:4px}.mat-tab-header-pagination-before .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-after .mat-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-tab-header-pagination-after,.mat-tab-header-rtl .mat-tab-header-pagination-before{padding-right:4px}.mat-tab-header-pagination-after .mat-tab-header-pagination-chevron,.mat-tab-header-rtl .mat-tab-header-pagination-before .mat-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;content:'';height:8px;width:8px}.mat-tab-header-pagination-disabled{box-shadow:none;cursor:default}.mat-tab-label-container{display:flex;flex-grow:1;overflow:hidden;z-index:1}.mat-tab-list{flex-grow:1;position:relative;transition:transform .5s cubic-bezier(.35,0,.25,1)}.mat-tab-labels{display:flex}"],
                inputs: ['disableRipple'],
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
                host: {
                    'class': 'mat-tab-header',
                    '[class.mat-tab-header-pagination-controls-enabled]': '_showPaginationControls',
                    '[class.mat-tab-header-rtl]': "_getLayoutDirection() == 'rtl'",
                },
            },] },
];
/** @nocollapse */
MatTabHeader.ctorParameters = () => [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
    { type: ViewportRuler, },
    { type: Directionality, decorators: [{ type: Optional },] },
];
MatTabHeader.propDecorators = {
    "_labelWrappers": [{ type: ContentChildren, args: [MatTabLabelWrapper,] },],
    "_inkBar": [{ type: ViewChild, args: [MatInkBar,] },],
    "_tabListContainer": [{ type: ViewChild, args: ['tabListContainer',] },],
    "_tabList": [{ type: ViewChild, args: ['tabList',] },],
    "selectedIndex": [{ type: Input },],
    "selectFocusedIndex": [{ type: Output },],
    "indexFocused": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * \@docs-private
 */
class MatTabNavBase {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _MatTabNavMixinBase = mixinDisableRipple(mixinColor(MatTabNavBase, 'primary'));
/**
 * Navigation component matching the styles of the tab group header.
 * Provides anchored navigation with animated ink bar.
 */
class MatTabNav extends _MatTabNavMixinBase {
    /**
     * @param {?} elementRef
     * @param {?} _dir
     * @param {?} _ngZone
     * @param {?} _changeDetectorRef
     * @param {?} _viewportRuler
     */
    constructor(elementRef, _dir, _ngZone, _changeDetectorRef, _viewportRuler) {
        super(elementRef);
        this._dir = _dir;
        this._ngZone = _ngZone;
        this._changeDetectorRef = _changeDetectorRef;
        this._viewportRuler = _viewportRuler;
        /**
         * Subject that emits when the component has been destroyed.
         */
        this._onDestroy = new Subject();
        this._disableRipple = false;
    }
    /**
     * Background color of the tab nav.
     * @return {?}
     */
    get backgroundColor() { return this._backgroundColor; }
    /**
     * @param {?} value
     * @return {?}
     */
    set backgroundColor(value) {
        const /** @type {?} */ nativeElement = this._elementRef.nativeElement;
        nativeElement.classList.remove(`mat-background-${this.backgroundColor}`);
        if (value) {
            nativeElement.classList.add(`mat-background-${value}`);
        }
        this._backgroundColor = value;
    }
    /**
     * Whether ripples should be disabled for all links or not.
     * @return {?}
     */
    get disableRipple() { return this._disableRipple; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disableRipple(value) {
        this._disableRipple = coerceBooleanProperty(value);
        this._setLinkDisableRipple();
    }
    /**
     * Notifies the component that the active link has been changed.
     * @param {?} element
     * @return {?}
     */
    updateActiveLink(element) {
        this._activeLinkChanged = this._activeLinkElement != element;
        this._activeLinkElement = element;
        if (this._activeLinkChanged) {
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._ngZone.runOutsideAngular(() => {
            const /** @type {?} */ dirChange = this._dir ? this._dir.change : of(null);
            return merge(dirChange, this._viewportRuler.change(10)).pipe(takeUntil(this._onDestroy))
                .subscribe(() => this._alignInkBar());
        });
        this._setLinkDisableRipple();
    }
    /**
     * Checks if the active link has been changed and, if so, will update the ink bar.
     * @return {?}
     */
    ngAfterContentChecked() {
        if (this._activeLinkChanged) {
            this._alignInkBar();
            this._activeLinkChanged = false;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Aligns the ink bar to the active link.
     * @return {?}
     */
    _alignInkBar() {
        if (this._activeLinkElement) {
            this._inkBar.alignToElement(this._activeLinkElement.nativeElement);
        }
    }
    /**
     * Sets the `disableRipple` property on each link of the navigation bar.
     * @return {?}
     */
    _setLinkDisableRipple() {
        if (this._tabLinks) {
            this._tabLinks.forEach(link => link.disableRipple = this.disableRipple);
        }
    }
}
MatTabNav.decorators = [
    { type: Component, args: [{selector: '[mat-tab-nav-bar]',
                exportAs: 'matTabNavBar, matTabNav',
                inputs: ['color', 'disableRipple'],
                template: "<div class=\"mat-tab-links\" (cdkObserveContent)=\"_alignInkBar()\"><ng-content></ng-content><mat-ink-bar></mat-ink-bar></div>",
                styles: [".mat-tab-nav-bar{overflow:hidden;position:relative;flex-shrink:0}.mat-tab-links{position:relative}.mat-tab-link{height:48px;padding:0 24px;cursor:pointer;box-sizing:border-box;opacity:.6;min-width:160px;text-align:center;display:inline-flex;justify-content:center;align-items:center;white-space:nowrap;vertical-align:top;text-decoration:none;position:relative;overflow:hidden}.mat-tab-link:focus{outline:0;opacity:1}.mat-tab-link.mat-tab-disabled{cursor:default}@media (max-width:600px){.mat-tab-link{min-width:72px}}.mat-ink-bar{position:absolute;bottom:0;height:2px;transition:.5s cubic-bezier(.35,0,.25,1)}.mat-tab-group-inverted-header .mat-ink-bar{bottom:auto;top:0}"],
                host: { 'class': 'mat-tab-nav-bar' },
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
MatTabNav.ctorParameters = () => [
    { type: ElementRef, },
    { type: Directionality, decorators: [{ type: Optional },] },
    { type: NgZone, },
    { type: ChangeDetectorRef, },
    { type: ViewportRuler, },
];
MatTabNav.propDecorators = {
    "_inkBar": [{ type: ViewChild, args: [MatInkBar,] },],
    "_tabLinks": [{ type: ContentChildren, args: [forwardRef(() => MatTabLink), { descendants: true },] },],
    "backgroundColor": [{ type: Input },],
};
class MatTabLinkBase {
}
const _MatTabLinkMixinBase = mixinTabIndex(mixinDisableRipple(mixinDisabled(MatTabLinkBase)));
/**
 * Link inside of a `mat-tab-nav-bar`.
 */
class MatTabLink extends _MatTabLinkMixinBase {
    /**
     * @param {?} _tabNavBar
     * @param {?} _elementRef
     * @param {?} ngZone
     * @param {?} platform
     * @param {?} globalOptions
     * @param {?} tabIndex
     */
    constructor(_tabNavBar, _elementRef, ngZone, platform, globalOptions, tabIndex) {
        super();
        this._tabNavBar = _tabNavBar;
        this._elementRef = _elementRef;
        /**
         * Whether the tab link is active or not.
         */
        this._isActive = false;
        /**
         * Ripple configuration for ripples that are launched on pointer down.
         * \@docs-private
         */
        this.rippleConfig = {};
        this._tabLinkRipple = new RippleRenderer(this, ngZone, _elementRef, platform);
        this._tabLinkRipple.setupTriggerEvents(_elementRef.nativeElement);
        this.tabIndex = parseInt(tabIndex) || 0;
        if (globalOptions) {
            this.rippleConfig = { speedFactor: globalOptions.baseSpeedFactor };
        }
    }
    /**
     * Whether the link is active.
     * @return {?}
     */
    get active() { return this._isActive; }
    /**
     * @param {?} value
     * @return {?}
     */
    set active(value) {
        this._isActive = value;
        if (value) {
            this._tabNavBar.updateActiveLink(this._elementRef);
        }
    }
    /**
     * Whether ripples are disabled on interaction
     * \@docs-private
     * @return {?}
     */
    get rippleDisabled() {
        return this.disabled || this.disableRipple;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._tabLinkRipple._removeTriggerEvents();
    }
}
MatTabLink.decorators = [
    { type: Directive, args: [{
                selector: '[mat-tab-link], [matTabLink]',
                exportAs: 'matTabLink',
                inputs: ['disabled', 'disableRipple', 'tabIndex'],
                host: {
                    'class': 'mat-tab-link',
                    '[attr.aria-disabled]': 'disabled.toString()',
                    '[attr.tabIndex]': 'tabIndex',
                    '[class.mat-tab-disabled]': 'disabled',
                    '[class.mat-tab-label-active]': 'active',
                }
            },] },
];
/** @nocollapse */
MatTabLink.ctorParameters = () => [
    { type: MatTabNav, },
    { type: ElementRef, },
    { type: NgZone, },
    { type: Platform, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_RIPPLE_GLOBAL_OPTIONS,] },] },
    { type: undefined, decorators: [{ type: Attribute, args: ['tabindex',] },] },
];
MatTabLink.propDecorators = {
    "active": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

class MatTabsModule {
}
MatTabsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatCommonModule,
                    PortalModule,
                    MatRippleModule,
                    ObserversModule,
                    ScrollDispatchModule,
                ],
                // Don't export all components because some are only to be used internally.
                exports: [
                    MatCommonModule,
                    MatTabGroup,
                    MatTabLabel,
                    MatTab,
                    MatTabNav,
                    MatTabLink,
                ],
                declarations: [
                    MatTabGroup,
                    MatTabLabel,
                    MatTab,
                    MatInkBar,
                    MatTabLabelWrapper,
                    MatTabNav,
                    MatTabLink,
                    MatTabBody,
                    MatTabBodyPortal,
                    MatTabHeader
                ],
                providers: [VIEWPORT_RULER_PROVIDER],
            },] },
];
/** @nocollapse */
MatTabsModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { MatInkBar, MatTabBody, MatTabBodyPortal, MatTabHeader, MatTabLabelWrapper, MatTab, MatTabLabel, MatTabNav, MatTabLink, MatTabsModule, MatTabChangeEvent, MatTabGroupBase, _MatTabGroupMixinBase, MatTabGroup, MatTabBase as ɵe22, _MatTabMixinBase as ɵf22, MatTabHeaderBase as ɵa22, _MatTabHeaderMixinBase as ɵb22, MatTabLabelWrapperBase as ɵc22, _MatTabLabelWrapperMixinBase as ɵd22, MatTabLinkBase as ɵi22, MatTabNavBase as ɵg22, _MatTabLinkMixinBase as ɵj22, _MatTabNavMixinBase as ɵh22 };
//# sourceMappingURL=tabs.js.map
