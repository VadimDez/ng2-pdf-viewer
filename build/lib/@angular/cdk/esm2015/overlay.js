/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, EventEmitter, Inject, Injectable, InjectionToken, Injector, Input, NgModule, NgZone, Optional, Output, SkipSelf, TemplateRef, ViewContainerRef } from '@angular/core';
import { CdkScrollable, ScrollDispatchModule, ScrollDispatcher, VIEWPORT_RULER_PROVIDER, ViewportRuler } from '@angular/cdk/scrolling';
import { BidiModule, Directionality } from '@angular/cdk/bidi';
import { DomPortalOutlet, PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { take } from 'rxjs/operators/take';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators/filter';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ESCAPE } from '@angular/cdk/keycodes';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Scroll strategy that doesn't do anything.
 */
class NoopScrollStrategy {
    /**
     * Does nothing, as this scroll strategy is a no-op.
     * @return {?}
     */
    enable() { }
    /**
     * Does nothing, as this scroll strategy is a no-op.
     * @return {?}
     */
    disable() { }
    /**
     * Does nothing, as this scroll strategy is a no-op.
     * @return {?}
     */
    attach() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Initial configuration used when creating an overlay.
 */
class OverlayConfig {
    /**
     * @param {?=} config
     */
    constructor(config) {
        /**
         * Strategy to be used when handling scroll events while the overlay is open.
         */
        this.scrollStrategy = new NoopScrollStrategy();
        /**
         * Custom class to add to the overlay pane.
         */
        this.panelClass = '';
        /**
         * Whether the overlay has a backdrop.
         */
        this.hasBackdrop = false;
        /**
         * Custom class to add to the backdrop
         */
        this.backdropClass = 'cdk-overlay-dark-backdrop';
        /**
         * The direction of the text in the overlay panel.
         */
        this.direction = 'ltr';
        if (config) {
            Object.keys(config).forEach(key => this[key] = config[key]);
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/** Horizontal dimension of a connection point on the perimeter of the origin or overlay element. */
/**
 * A connection point on the origin element.
 * @record
 */

/**
 * A connection point on the overlay element.
 * @record
 */

/**
 * The points of the origin element and the overlay element to connect.
 */
class ConnectionPositionPair {
    /**
     * @param {?} origin
     * @param {?} overlay
     * @param {?=} offsetX
     * @param {?=} offsetY
     */
    constructor(origin, overlay, offsetX, offsetY) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.originX = origin.originX;
        this.originY = origin.originY;
        this.overlayX = overlay.overlayX;
        this.overlayY = overlay.overlayY;
    }
}
/**
 * Set of properties regarding the position of the origin and overlay relative to the viewport
 * with respect to the containing Scrollable elements.
 *
 * The overlay and origin are clipped if any part of their bounding client rectangle exceeds the
 * bounds of any one of the strategy's Scrollable's bounding client rectangle.
 *
 * The overlay and origin are outside view if there is no overlap between their bounding client
 * rectangle and any one of the strategy's Scrollable's bounding client rectangle.
 *
 *       -----------                    -----------
 *       | outside |                    | clipped |
 *       |  view   |              --------------------------
 *       |         |              |     |         |        |
 *       ----------               |     -----------        |
 *  --------------------------    |                        |
 *  |                        |    |      Scrollable        |
 *  |                        |    |                        |
 *  |                        |     --------------------------
 *  |      Scrollable        |
 *  |                        |
 *  --------------------------
 *
 *  \@docs-private
 */
class ScrollingVisibility {
}
/**
 * The change event emitted by the strategy when a fallback position is used.
 */
class ConnectedOverlayPositionChange {
    /**
     * @param {?} connectionPair
     * @param {?} scrollableViewProperties
     */
    constructor(connectionPair, /** @docs-private */
        scrollableViewProperties) {
        this.connectionPair = connectionPair;
        this.scrollableViewProperties = scrollableViewProperties;
    }
}
/** @nocollapse */
ConnectedOverlayPositionChange.ctorParameters = () => [
    { type: ConnectionPositionPair, },
    { type: ScrollingVisibility, decorators: [{ type: Optional },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Describes a strategy that will be used by an overlay to handle scroll events while it is open.
 * @record
 */

/**
 * Returns an error to be thrown when attempting to attach an already-attached scroll strategy.
 * @return {?}
 */
function getMatScrollStrategyAlreadyAttachedError() {
    return Error(`Scroll strategy has already been attached.`);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Strategy that will close the overlay as soon as the user starts scrolling.
 */
class CloseScrollStrategy {
    /**
     * @param {?} _scrollDispatcher
     * @param {?} _ngZone
     */
    constructor(_scrollDispatcher, _ngZone) {
        this._scrollDispatcher = _scrollDispatcher;
        this._ngZone = _ngZone;
        this._scrollSubscription = null;
    }
    /**
     * Attaches this scroll strategy to an overlay.
     * @param {?} overlayRef
     * @return {?}
     */
    attach(overlayRef) {
        if (this._overlayRef) {
            throw getMatScrollStrategyAlreadyAttachedError();
        }
        this._overlayRef = overlayRef;
    }
    /**
     * Enables the closing of the attached on scroll.
     * @return {?}
     */
    enable() {
        if (!this._scrollSubscription) {
            this._scrollSubscription = this._scrollDispatcher.scrolled(0).subscribe(() => {
                this._ngZone.run(() => {
                    this.disable();
                    if (this._overlayRef.hasAttached()) {
                        this._overlayRef.detach();
                    }
                });
            });
        }
    }
    /**
     * Disables the closing the attached overlay on scroll.
     * @return {?}
     */
    disable() {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Strategy that will prevent the user from scrolling while the overlay is visible.
 */
class BlockScrollStrategy {
    /**
     * @param {?} _viewportRuler
     */
    constructor(_viewportRuler) {
        this._viewportRuler = _viewportRuler;
        this._previousHTMLStyles = { top: '', left: '' };
        this._isEnabled = false;
    }
    /**
     * Attaches this scroll strategy to an overlay.
     * @return {?}
     */
    attach() { }
    /**
     * Blocks page-level scroll while the attached overlay is open.
     * @return {?}
     */
    enable() {
        if (this._canBeEnabled()) {
            const /** @type {?} */ root = document.documentElement;
            this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition();
            // Cache the previous inline styles in case the user had set them.
            this._previousHTMLStyles.left = root.style.left || '';
            this._previousHTMLStyles.top = root.style.top || '';
            // Note: we're using the `html` node, instead of the `body`, because the `body` may
            // have the user agent margin, whereas the `html` is guaranteed not to have one.
            root.style.left = `${-this._previousScrollPosition.left}px`;
            root.style.top = `${-this._previousScrollPosition.top}px`;
            root.classList.add('cdk-global-scrollblock');
            this._isEnabled = true;
        }
    }
    /**
     * Unblocks page-level scroll while the attached overlay is open.
     * @return {?}
     */
    disable() {
        if (this._isEnabled) {
            const /** @type {?} */ html = document.documentElement;
            const /** @type {?} */ body = document.body;
            const /** @type {?} */ previousHtmlScrollBehavior = html.style['scrollBehavior'] || '';
            const /** @type {?} */ previousBodyScrollBehavior = body.style['scrollBehavior'] || '';
            this._isEnabled = false;
            html.style.left = this._previousHTMLStyles.left;
            html.style.top = this._previousHTMLStyles.top;
            html.classList.remove('cdk-global-scrollblock');
            // Disable user-defined smooth scrolling temporarily while we restore the scroll position.
            // See https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior
            html.style['scrollBehavior'] = body.style['scrollBehavior'] = 'auto';
            window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top);
            html.style['scrollBehavior'] = previousHtmlScrollBehavior;
            body.style['scrollBehavior'] = previousBodyScrollBehavior;
        }
    }
    /**
     * @return {?}
     */
    _canBeEnabled() {
        // Since the scroll strategies can't be singletons, we have to use a global CSS class
        // (`cdk-global-scrollblock`) to make sure that we don't try to disable global
        // scrolling multiple times.
        if (document.documentElement.classList.contains('cdk-global-scrollblock') || this._isEnabled) {
            return false;
        }
        const /** @type {?} */ body = document.body;
        const /** @type {?} */ viewport = this._viewportRuler.getViewportSize();
        return body.scrollHeight > viewport.height || body.scrollWidth > viewport.width;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

// TODO(jelbourn): move this to live with the rest of the scrolling code
// TODO(jelbourn): someday replace this with IntersectionObservers
/**
 * Gets whether an element is scrolled outside of view by any of its parent scrolling containers.
 * \@docs-private
 * @param {?} element Dimensions of the element (from getBoundingClientRect)
 * @param {?} scrollContainers Dimensions of element's scrolling containers (from getBoundingClientRect)
 * @return {?} Whether the element is scrolled out of view
 */
function isElementScrolledOutsideView(element, scrollContainers) {
    return scrollContainers.some(containerBounds => {
        const /** @type {?} */ outsideAbove = element.bottom < containerBounds.top;
        const /** @type {?} */ outsideBelow = element.top > containerBounds.bottom;
        const /** @type {?} */ outsideLeft = element.right < containerBounds.left;
        const /** @type {?} */ outsideRight = element.left > containerBounds.right;
        return outsideAbove || outsideBelow || outsideLeft || outsideRight;
    });
}
/**
 * Gets whether an element is clipped by any of its scrolling containers.
 * \@docs-private
 * @param {?} element Dimensions of the element (from getBoundingClientRect)
 * @param {?} scrollContainers Dimensions of element's scrolling containers (from getBoundingClientRect)
 * @return {?} Whether the element is clipped
 */
function isElementClippedByScrolling(element, scrollContainers) {
    return scrollContainers.some(scrollContainerRect => {
        const /** @type {?} */ clippedAbove = element.top < scrollContainerRect.top;
        const /** @type {?} */ clippedBelow = element.bottom > scrollContainerRect.bottom;
        const /** @type {?} */ clippedLeft = element.left < scrollContainerRect.left;
        const /** @type {?} */ clippedRight = element.right > scrollContainerRect.right;
        return clippedAbove || clippedBelow || clippedLeft || clippedRight;
    });
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Config options for the RepositionScrollStrategy.
 * @record
 */

/**
 * Strategy that will update the element position as the user is scrolling.
 */
class RepositionScrollStrategy {
    /**
     * @param {?} _scrollDispatcher
     * @param {?} _viewportRuler
     * @param {?} _ngZone
     * @param {?=} _config
     */
    constructor(_scrollDispatcher, _viewportRuler, _ngZone, _config) {
        this._scrollDispatcher = _scrollDispatcher;
        this._viewportRuler = _viewportRuler;
        this._ngZone = _ngZone;
        this._config = _config;
        this._scrollSubscription = null;
    }
    /**
     * Attaches this scroll strategy to an overlay.
     * @param {?} overlayRef
     * @return {?}
     */
    attach(overlayRef) {
        if (this._overlayRef) {
            throw getMatScrollStrategyAlreadyAttachedError();
        }
        this._overlayRef = overlayRef;
    }
    /**
     * Enables repositioning of the attached overlay on scroll.
     * @return {?}
     */
    enable() {
        if (!this._scrollSubscription) {
            const /** @type {?} */ throttle = this._config ? this._config.scrollThrottle : 0;
            this._scrollSubscription = this._scrollDispatcher.scrolled(throttle).subscribe(() => {
                this._overlayRef.updatePosition();
                // TODO(crisbeto): make `close` on by default once all components can handle it.
                if (this._config && this._config.autoClose) {
                    const /** @type {?} */ overlayRect = this._overlayRef.overlayElement.getBoundingClientRect();
                    const { width, height } = this._viewportRuler.getViewportSize();
                    // TODO(crisbeto): include all ancestor scroll containers here once
                    // we have a way of exposing the trigger element to the scroll strategy.
                    const /** @type {?} */ parentRects = [{ width, height, bottom: height, right: width, top: 0, left: 0 }];
                    if (isElementScrolledOutsideView(overlayRect, parentRects)) {
                        this.disable();
                        this._ngZone.run(() => this._overlayRef.detach());
                    }
                }
            });
        }
    }
    /**
     * Disables repositioning of the attached overlay on scroll.
     * @return {?}
     */
    disable() {
        if (this._scrollSubscription) {
            this._scrollSubscription.unsubscribe();
            this._scrollSubscription = null;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Options for how an overlay will handle scrolling.
 *
 * Users can provide a custom value for `ScrollStrategyOptions` to replace the default
 * behaviors. This class primarily acts as a factory for ScrollStrategy instances.
 */
class ScrollStrategyOptions {
    /**
     * @param {?} _scrollDispatcher
     * @param {?} _viewportRuler
     * @param {?} _ngZone
     */
    constructor(_scrollDispatcher, _viewportRuler, _ngZone) {
        this._scrollDispatcher = _scrollDispatcher;
        this._viewportRuler = _viewportRuler;
        this._ngZone = _ngZone;
        /**
         * Do nothing on scroll.
         */
        this.noop = () => new NoopScrollStrategy();
        /**
         * Close the overlay as soon as the user scrolls.
         */
        this.close = () => new CloseScrollStrategy(this._scrollDispatcher, this._ngZone);
        /**
         * Block scrolling.
         */
        this.block = () => new BlockScrollStrategy(this._viewportRuler);
        /**
         * Update the overlay's position on scroll.
         * @param config Configuration to be used inside the scroll strategy.
         * Allows debouncing the reposition calls.
         */
        this.reposition = (config) => new RepositionScrollStrategy(this._scrollDispatcher, this._viewportRuler, this._ngZone, config);
    }
}
ScrollStrategyOptions.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ScrollStrategyOptions.ctorParameters = () => [
    { type: ScrollDispatcher, },
    { type: ViewportRuler, },
    { type: NgZone, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Reference to an overlay that has been created with the Overlay service.
 * Used to manipulate or dispose of said overlay.
 */
class OverlayRef {
    /**
     * @param {?} _portalOutlet
     * @param {?} _pane
     * @param {?} _config
     * @param {?} _ngZone
     * @param {?} _keyboardDispatcher
     */
    constructor(_portalOutlet, _pane, _config, _ngZone, _keyboardDispatcher) {
        this._portalOutlet = _portalOutlet;
        this._pane = _pane;
        this._config = _config;
        this._ngZone = _ngZone;
        this._keyboardDispatcher = _keyboardDispatcher;
        this._backdropElement = null;
        this._backdropClick = new Subject();
        this._attachments = new Subject();
        this._detachments = new Subject();
        /**
         * Stream of keydown events dispatched to this overlay.
         */
        this._keydownEvents = new Subject();
        if (_config.scrollStrategy) {
            _config.scrollStrategy.attach(this);
        }
    }
    /**
     * The overlay's HTML element
     * @return {?}
     */
    get overlayElement() {
        return this._pane;
    }
    /**
     * Attaches content, given via a Portal, to the overlay.
     * If the overlay is configured to have a backdrop, it will be created.
     *
     * @param {?} portal Portal instance to which to attach the overlay.
     * @return {?} The portal attachment result.
     */
    attach(portal) {
        let /** @type {?} */ attachResult = this._portalOutlet.attach(portal);
        if (this._config.positionStrategy) {
            this._config.positionStrategy.attach(this);
        }
        // Update the pane element with the given configuration.
        this._updateStackingOrder();
        this._updateElementSize();
        this._updateElementDirection();
        if (this._config.scrollStrategy) {
            this._config.scrollStrategy.enable();
        }
        // Update the position once the zone is stable so that the overlay will be fully rendered
        // before attempting to position it, as the position may depend on the size of the rendered
        // content.
        this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
            this.updatePosition();
        });
        // Enable pointer events for the overlay pane element.
        this._togglePointerEvents(true);
        if (this._config.hasBackdrop) {
            this._attachBackdrop();
        }
        if (this._config.panelClass) {
            // We can't do a spread here, because IE doesn't support setting multiple classes.
            if (Array.isArray(this._config.panelClass)) {
                this._config.panelClass.forEach(cls => this._pane.classList.add(cls));
            }
            else {
                this._pane.classList.add(this._config.panelClass);
            }
        }
        // Only emit the `attachments` event once all other setup is done.
        this._attachments.next();
        // Track this overlay by the keyboard dispatcher
        this._keyboardDispatcher.add(this);
        return attachResult;
    }
    /**
     * Detaches an overlay from a portal.
     * @return {?} The portal detachment result.
     */
    detach() {
        if (!this.hasAttached()) {
            return;
        }
        this.detachBackdrop();
        // When the overlay is detached, the pane element should disable pointer events.
        // This is necessary because otherwise the pane element will cover the page and disable
        // pointer events therefore. Depends on the position strategy and the applied pane boundaries.
        this._togglePointerEvents(false);
        if (this._config.positionStrategy && this._config.positionStrategy.detach) {
            this._config.positionStrategy.detach();
        }
        if (this._config.scrollStrategy) {
            this._config.scrollStrategy.disable();
        }
        const /** @type {?} */ detachmentResult = this._portalOutlet.detach();
        // Only emit after everything is detached.
        this._detachments.next();
        // Remove this overlay from keyboard dispatcher tracking
        this._keyboardDispatcher.remove(this);
        return detachmentResult;
    }
    /**
     * Cleans up the overlay from the DOM.
     * @return {?}
     */
    dispose() {
        const /** @type {?} */ isAttached = this.hasAttached();
        if (this._config.positionStrategy) {
            this._config.positionStrategy.dispose();
        }
        if (this._config.scrollStrategy) {
            this._config.scrollStrategy.disable();
        }
        this.detachBackdrop();
        this._keyboardDispatcher.remove(this);
        this._portalOutlet.dispose();
        this._attachments.complete();
        this._backdropClick.complete();
        this._keydownEvents.complete();
        if (isAttached) {
            this._detachments.next();
        }
        this._detachments.complete();
    }
    /**
     * Whether the overlay has attached content.
     * @return {?}
     */
    hasAttached() {
        return this._portalOutlet.hasAttached();
    }
    /**
     * Gets an observable that emits when the backdrop has been clicked.
     * @return {?}
     */
    backdropClick() {
        return this._backdropClick.asObservable();
    }
    /**
     * Gets an observable that emits when the overlay has been attached.
     * @return {?}
     */
    attachments() {
        return this._attachments.asObservable();
    }
    /**
     * Gets an observable that emits when the overlay has been detached.
     * @return {?}
     */
    detachments() {
        return this._detachments.asObservable();
    }
    /**
     * Gets an observable of keydown events targeted to this overlay.
     * @return {?}
     */
    keydownEvents() {
        return this._keydownEvents.asObservable();
    }
    /**
     * Gets the the current overlay configuration, which is immutable.
     * @return {?}
     */
    getConfig() {
        return this._config;
    }
    /**
     * Updates the position of the overlay based on the position strategy.
     * @return {?}
     */
    updatePosition() {
        if (this._config.positionStrategy) {
            this._config.positionStrategy.apply();
        }
    }
    /**
     * Update the size properties of the overlay.
     * @param {?} sizeConfig
     * @return {?}
     */
    updateSize(sizeConfig) {
        this._config = Object.assign({}, this._config, sizeConfig);
        this._updateElementSize();
    }
    /**
     * Sets the LTR/RTL direction for the overlay.
     * @param {?} dir
     * @return {?}
     */
    setDirection(dir) {
        this._config = Object.assign({}, this._config, { direction: dir });
        this._updateElementDirection();
    }
    /**
     * Updates the text direction of the overlay panel.
     * @return {?}
     */
    _updateElementDirection() {
        this._pane.setAttribute('dir', /** @type {?} */ ((this._config.direction)));
    }
    /**
     * Updates the size of the overlay element based on the overlay config.
     * @return {?}
     */
    _updateElementSize() {
        if (this._config.width || this._config.width === 0) {
            this._pane.style.width = formatCssUnit(this._config.width);
        }
        if (this._config.height || this._config.height === 0) {
            this._pane.style.height = formatCssUnit(this._config.height);
        }
        if (this._config.minWidth || this._config.minWidth === 0) {
            this._pane.style.minWidth = formatCssUnit(this._config.minWidth);
        }
        if (this._config.minHeight || this._config.minHeight === 0) {
            this._pane.style.minHeight = formatCssUnit(this._config.minHeight);
        }
        if (this._config.maxWidth || this._config.maxWidth === 0) {
            this._pane.style.maxWidth = formatCssUnit(this._config.maxWidth);
        }
        if (this._config.maxHeight || this._config.maxHeight === 0) {
            this._pane.style.maxHeight = formatCssUnit(this._config.maxHeight);
        }
    }
    /**
     * Toggles the pointer events for the overlay pane element.
     * @param {?} enablePointer
     * @return {?}
     */
    _togglePointerEvents(enablePointer) {
        this._pane.style.pointerEvents = enablePointer ? 'auto' : 'none';
    }
    /**
     * Attaches a backdrop for this overlay.
     * @return {?}
     */
    _attachBackdrop() {
        this._backdropElement = document.createElement('div');
        this._backdropElement.classList.add('cdk-overlay-backdrop');
        if (this._config.backdropClass) {
            this._backdropElement.classList.add(this._config.backdropClass);
        } /** @type {?} */
        ((
        // Insert the backdrop before the pane in the DOM order,
        // in order to handle stacked overlays properly.
        this._pane.parentElement)).insertBefore(this._backdropElement, this._pane);
        // Forward backdrop clicks such that the consumer of the overlay can perform whatever
        // action desired when such a click occurs (usually closing the overlay).
        this._backdropElement.addEventListener('click', () => this._backdropClick.next(null));
        // Add class to fade-in the backdrop after one frame.
        this._ngZone.runOutsideAngular(() => {
            requestAnimationFrame(() => {
                if (this._backdropElement) {
                    this._backdropElement.classList.add('cdk-overlay-backdrop-showing');
                }
            });
        });
    }
    /**
     * Updates the stacking order of the element, moving it to the top if necessary.
     * This is required in cases where one overlay was detached, while another one,
     * that should be behind it, was destroyed. The next time both of them are opened,
     * the stacking will be wrong, because the detached element's pane will still be
     * in its original DOM position.
     * @return {?}
     */
    _updateStackingOrder() {
        if (this._pane.nextSibling) {
            /** @type {?} */ ((this._pane.parentNode)).appendChild(this._pane);
        }
    }
    /**
     * Detaches the backdrop (if any) associated with the overlay.
     * @return {?}
     */
    detachBackdrop() {
        let /** @type {?} */ backdropToDetach = this._backdropElement;
        if (backdropToDetach) {
            let /** @type {?} */ finishDetach = () => {
                // It may not be attached to anything in certain cases (e.g. unit tests).
                if (backdropToDetach && backdropToDetach.parentNode) {
                    backdropToDetach.parentNode.removeChild(backdropToDetach);
                }
                // It is possible that a new portal has been attached to this overlay since we started
                // removing the backdrop. If that is the case, only clear the backdrop reference if it
                // is still the same instance that we started to remove.
                if (this._backdropElement == backdropToDetach) {
                    this._backdropElement = null;
                }
            };
            backdropToDetach.classList.remove('cdk-overlay-backdrop-showing');
            if (this._config.backdropClass) {
                backdropToDetach.classList.remove(this._config.backdropClass);
            }
            backdropToDetach.addEventListener('transitionend', finishDetach);
            // If the backdrop doesn't have a transition, the `transitionend` event won't fire.
            // In this case we make it unclickable and we try to remove it after a delay.
            backdropToDetach.style.pointerEvents = 'none';
            // Run this outside the Angular zone because there's nothing that Angular cares about.
            // If it were to run inside the Angular zone, every test that used Overlay would have to be
            // either async or fakeAsync.
            this._ngZone.runOutsideAngular(() => {
                setTimeout(finishDetach, 500);
            });
        }
    }
}
/**
 * @param {?} value
 * @return {?}
 */
function formatCssUnit(value) {
    return typeof value === 'string' ? /** @type {?} */ (value) : `${value}px`;
}
/**
 * Size properties for an overlay.
 * @record
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
class ConnectedPositionStrategy {
    /**
     * @param {?} originPos
     * @param {?} overlayPos
     * @param {?} _connectedTo
     * @param {?} _viewportRuler
     * @param {?} _document
     */
    constructor(originPos, overlayPos, _connectedTo, _viewportRuler, _document) {
        this._connectedTo = _connectedTo;
        this._viewportRuler = _viewportRuler;
        this._document = _document;
        /**
         * Layout direction of the position strategy.
         */
        this._dir = 'ltr';
        /**
         * The offset in pixels for the overlay connection point on the x-axis
         */
        this._offsetX = 0;
        /**
         * The offset in pixels for the overlay connection point on the y-axis
         */
        this._offsetY = 0;
        /**
         * The Scrollable containers used to check scrollable view properties on position change.
         */
        this.scrollables = [];
        /**
         * Subscription to viewport resize events.
         */
        this._resizeSubscription = Subscription.EMPTY;
        /**
         * Ordered list of preferred positions, from most to least desirable.
         */
        this._preferredPositions = [];
        /**
         * Whether the position strategy is applied currently.
         */
        this._applied = false;
        /**
         * Whether the overlay position is locked.
         */
        this._positionLocked = false;
        this._onPositionChange = new Subject();
        this._origin = this._connectedTo.nativeElement;
        this.withFallbackPosition(originPos, overlayPos);
    }
    /**
     * Whether the we're dealing with an RTL context
     * @return {?}
     */
    get _isRtl() {
        return this._dir === 'rtl';
    }
    /**
     * Emits an event when the connection point changes.
     * @return {?}
     */
    get onPositionChange() {
        return this._onPositionChange.asObservable();
    }
    /**
     * Ordered list of preferred positions, from most to least desirable.
     * @return {?}
     */
    get positions() {
        return this._preferredPositions;
    }
    /**
     * Attach this position strategy to an overlay.
     * @param {?} overlayRef
     * @return {?}
     */
    attach(overlayRef) {
        this._overlayRef = overlayRef;
        this._pane = overlayRef.overlayElement;
        this._resizeSubscription.unsubscribe();
        this._resizeSubscription = this._viewportRuler.change().subscribe(() => this.apply());
    }
    /**
     * Disposes all resources used by the position strategy.
     * @return {?}
     */
    dispose() {
        this._applied = false;
        this._resizeSubscription.unsubscribe();
    }
    /**
     * \@docs-private
     * @return {?}
     */
    detach() {
        this._applied = false;
        this._resizeSubscription.unsubscribe();
    }
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * \@docs-private
     * @return {?}
     */
    apply() {
        // If the position has been applied already (e.g. when the overlay was opened) and the
        // consumer opted into locking in the position, re-use the  old position, in order to
        // prevent the overlay from jumping around.
        if (this._applied && this._positionLocked && this._lastConnectedPosition) {
            this.recalculateLastPosition();
            return;
        }
        this._applied = true;
        // We need the bounding rects for the origin and the overlay to determine how to position
        // the overlay relative to the origin.
        const /** @type {?} */ element = this._pane;
        const /** @type {?} */ originRect = this._origin.getBoundingClientRect();
        const /** @type {?} */ overlayRect = element.getBoundingClientRect();
        // We use the viewport size to determine whether a position would go off-screen.
        const /** @type {?} */ viewportSize = this._viewportRuler.getViewportSize();
        // Fallback point if none of the fallbacks fit into the viewport.
        let /** @type {?} */ fallbackPoint;
        let /** @type {?} */ fallbackPosition;
        // We want to place the overlay in the first of the preferred positions such that the
        // overlay fits on-screen.
        for (let /** @type {?} */ pos of this._preferredPositions) {
            // Get the (x, y) point of connection on the origin, and then use that to get the
            // (top, left) coordinate for the overlay at `pos`.
            let /** @type {?} */ originPoint = this._getOriginConnectionPoint(originRect, pos);
            let /** @type {?} */ overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportSize, pos);
            // If the overlay in the calculated position fits on-screen, put it there and we're done.
            if (overlayPoint.fitsInViewport) {
                this._setElementPosition(element, overlayRect, overlayPoint, pos);
                // Save the last connected position in case the position needs to be re-calculated.
                this._lastConnectedPosition = pos;
                return;
            }
            else if (!fallbackPoint || fallbackPoint.visibleArea < overlayPoint.visibleArea) {
                fallbackPoint = overlayPoint;
                fallbackPosition = pos;
            }
        }
        // If none of the preferred positions were in the viewport, take the one
        // with the largest visible area.
        this._setElementPosition(element, overlayRect, /** @type {?} */ ((fallbackPoint)), /** @type {?} */ ((fallbackPosition)));
    }
    /**
     * Re-positions the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     * @return {?}
     */
    recalculateLastPosition() {
        // If the overlay has never been positioned before, do nothing.
        if (!this._lastConnectedPosition) {
            return;
        }
        const /** @type {?} */ originRect = this._origin.getBoundingClientRect();
        const /** @type {?} */ overlayRect = this._pane.getBoundingClientRect();
        const /** @type {?} */ viewportSize = this._viewportRuler.getViewportSize();
        const /** @type {?} */ lastPosition = this._lastConnectedPosition || this._preferredPositions[0];
        let /** @type {?} */ originPoint = this._getOriginConnectionPoint(originRect, lastPosition);
        let /** @type {?} */ overlayPoint = this._getOverlayPoint(originPoint, overlayRect, viewportSize, lastPosition);
        this._setElementPosition(this._pane, overlayRect, overlayPoint, lastPosition);
    }
    /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     * @param {?} scrollables
     * @return {?}
     */
    withScrollableContainers(scrollables) {
        this.scrollables = scrollables;
    }
    /**
     * Adds a new preferred fallback position.
     * @param {?} originPos
     * @param {?} overlayPos
     * @param {?=} offsetX
     * @param {?=} offsetY
     * @return {?}
     */
    withFallbackPosition(originPos, overlayPos, offsetX, offsetY) {
        const /** @type {?} */ position = new ConnectionPositionPair(originPos, overlayPos, offsetX, offsetY);
        this._preferredPositions.push(position);
        return this;
    }
    /**
     * Sets the layout direction so the overlay's position can be adjusted to match.
     * @param {?} dir New layout direction.
     * @return {?}
     */
    withDirection(dir) {
        this._dir = dir;
        return this;
    }
    /**
     * Sets an offset for the overlay's connection point on the x-axis
     * @param {?} offset New offset in the X axis.
     * @return {?}
     */
    withOffsetX(offset) {
        this._offsetX = offset;
        return this;
    }
    /**
     * Sets an offset for the overlay's connection point on the y-axis
     * @param {?} offset New offset in the Y axis.
     * @return {?}
     */
    withOffsetY(offset) {
        this._offsetY = offset;
        return this;
    }
    /**
     * Sets whether the overlay's position should be locked in after it is positioned
     * initially. When an overlay is locked in, it won't attempt to reposition itself
     * when the position is re-applied (e.g. when the user scrolls away).
     * @param {?} isLocked Whether the overlay should locked in.
     * @return {?}
     */
    withLockedPosition(isLocked) {
        this._positionLocked = isLocked;
        return this;
    }
    /**
     * Overwrites the current set of positions with an array of new ones.
     * @param {?} positions Position pairs to be set on the strategy.
     * @return {?}
     */
    withPositions(positions) {
        this._preferredPositions = positions.slice();
        return this;
    }
    /**
     * Gets the horizontal (x) "start" dimension based on whether the overlay is in an RTL context.
     * @param {?} rect
     * @return {?}
     */
    _getStartX(rect) {
        return this._isRtl ? rect.right : rect.left;
    }
    /**
     * Gets the horizontal (x) "end" dimension based on whether the overlay is in an RTL context.
     * @param {?} rect
     * @return {?}
     */
    _getEndX(rect) {
        return this._isRtl ? rect.left : rect.right;
    }
    /**
     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
     * @param {?} originRect
     * @param {?} pos
     * @return {?}
     */
    _getOriginConnectionPoint(originRect, pos) {
        const /** @type {?} */ originStartX = this._getStartX(originRect);
        const /** @type {?} */ originEndX = this._getEndX(originRect);
        let /** @type {?} */ x;
        if (pos.originX == 'center') {
            x = originStartX + (originRect.width / 2);
        }
        else {
            x = pos.originX == 'start' ? originStartX : originEndX;
        }
        let /** @type {?} */ y;
        if (pos.originY == 'center') {
            y = originRect.top + (originRect.height / 2);
        }
        else {
            y = pos.originY == 'top' ? originRect.top : originRect.bottom;
        }
        return { x, y };
    }
    /**
     * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
     * origin point to which the overlay should be connected, as well as how much of the element
     * would be inside the viewport at that position.
     * @param {?} originPoint
     * @param {?} overlayRect
     * @param {?} viewportSize
     * @param {?} pos
     * @return {?}
     */
    _getOverlayPoint(originPoint, overlayRect, viewportSize, pos) {
        // Calculate the (overlayStartX, overlayStartY), the start of the potential overlay position
        // relative to the origin point.
        let /** @type {?} */ overlayStartX;
        if (pos.overlayX == 'center') {
            overlayStartX = -overlayRect.width / 2;
        }
        else if (pos.overlayX === 'start') {
            overlayStartX = this._isRtl ? -overlayRect.width : 0;
        }
        else {
            overlayStartX = this._isRtl ? 0 : -overlayRect.width;
        }
        let /** @type {?} */ overlayStartY;
        if (pos.overlayY == 'center') {
            overlayStartY = -overlayRect.height / 2;
        }
        else {
            overlayStartY = pos.overlayY == 'top' ? 0 : -overlayRect.height;
        }
        // The (x, y) offsets of the overlay based on the current position.
        let /** @type {?} */ offsetX = typeof pos.offsetX === 'undefined' ? this._offsetX : pos.offsetX;
        let /** @type {?} */ offsetY = typeof pos.offsetY === 'undefined' ? this._offsetY : pos.offsetY;
        // The (x, y) coordinates of the overlay.
        let /** @type {?} */ x = originPoint.x + overlayStartX + offsetX;
        let /** @type {?} */ y = originPoint.y + overlayStartY + offsetY;
        // How much the overlay would overflow at this position, on each side.
        let /** @type {?} */ leftOverflow = 0 - x;
        let /** @type {?} */ rightOverflow = (x + overlayRect.width) - viewportSize.width;
        let /** @type {?} */ topOverflow = 0 - y;
        let /** @type {?} */ bottomOverflow = (y + overlayRect.height) - viewportSize.height;
        // Visible parts of the element on each axis.
        let /** @type {?} */ visibleWidth = this._subtractOverflows(overlayRect.width, leftOverflow, rightOverflow);
        let /** @type {?} */ visibleHeight = this._subtractOverflows(overlayRect.height, topOverflow, bottomOverflow);
        // The area of the element that's within the viewport.
        let /** @type {?} */ visibleArea = visibleWidth * visibleHeight;
        let /** @type {?} */ fitsInViewport = (overlayRect.width * overlayRect.height) === visibleArea;
        return { x, y, fitsInViewport, visibleArea };
    }
    /**
     * Gets the view properties of the trigger and overlay, including whether they are clipped
     * or completely outside the view of any of the strategy's scrollables.
     * @param {?} overlay
     * @return {?}
     */
    _getScrollVisibility(overlay) {
        const /** @type {?} */ originBounds = this._origin.getBoundingClientRect();
        const /** @type {?} */ overlayBounds = overlay.getBoundingClientRect();
        const /** @type {?} */ scrollContainerBounds = this.scrollables.map(s => s.getElementRef().nativeElement.getBoundingClientRect());
        return {
            isOriginClipped: isElementClippedByScrolling(originBounds, scrollContainerBounds),
            isOriginOutsideView: isElementScrolledOutsideView(originBounds, scrollContainerBounds),
            isOverlayClipped: isElementClippedByScrolling(overlayBounds, scrollContainerBounds),
            isOverlayOutsideView: isElementScrolledOutsideView(overlayBounds, scrollContainerBounds),
        };
    }
    /**
     * Physically positions the overlay element to the given coordinate.
     * @param {?} element
     * @param {?} overlayRect
     * @param {?} overlayPoint
     * @param {?} pos
     * @return {?}
     */
    _setElementPosition(element, overlayRect, overlayPoint, pos) {
        // We want to set either `top` or `bottom` based on whether the overlay wants to appear above
        // or below the origin and the direction in which the element will expand.
        let /** @type {?} */ verticalStyleProperty = pos.overlayY === 'bottom' ? 'bottom' : 'top';
        // When using `bottom`, we adjust the y position such that it is the distance
        // from the bottom of the viewport rather than the top.
        let /** @type {?} */ y = verticalStyleProperty === 'top' ?
            overlayPoint.y :
            this._document.documentElement.clientHeight - (overlayPoint.y + overlayRect.height);
        // We want to set either `left` or `right` based on whether the overlay wants to appear "before"
        // or "after" the origin, which determines the direction in which the element will expand.
        // For the horizontal axis, the meaning of "before" and "after" change based on whether the
        // page is in RTL or LTR.
        let /** @type {?} */ horizontalStyleProperty;
        if (this._dir === 'rtl') {
            horizontalStyleProperty = pos.overlayX === 'end' ? 'left' : 'right';
        }
        else {
            horizontalStyleProperty = pos.overlayX === 'end' ? 'right' : 'left';
        }
        // When we're setting `right`, we adjust the x position such that it is the distance
        // from the right edge of the viewport rather than the left edge.
        let /** @type {?} */ x = horizontalStyleProperty === 'left' ?
            overlayPoint.x :
            this._document.documentElement.clientWidth - (overlayPoint.x + overlayRect.width);
        // Reset any existing styles. This is necessary in case the preferred position has
        // changed since the last `apply`.
        ['top', 'bottom', 'left', 'right'].forEach(p => element.style[p] = null);
        element.style[verticalStyleProperty] = `${y}px`;
        element.style[horizontalStyleProperty] = `${x}px`;
        // Notify that the position has been changed along with its change properties.
        const /** @type {?} */ scrollableViewProperties = this._getScrollVisibility(element);
        const /** @type {?} */ positionChange = new ConnectedOverlayPositionChange(pos, scrollableViewProperties);
        this._onPositionChange.next(positionChange);
    }
    /**
     * Subtracts the amount that an element is overflowing on an axis from it's length.
     * @param {?} length
     * @param {...?} overflows
     * @return {?}
     */
    _subtractOverflows(length, ...overflows) {
        return overflows.reduce((currentValue, currentOverflow) => {
            return currentValue - Math.max(currentOverflow, 0);
        }, length);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * explicit position relative to the browser's viewport. We use flexbox, instead of
 * transforms, in order to avoid issues with subpixel rendering which can cause the
 * element to become blurry.
 */
class GlobalPositionStrategy {
    /**
     * @param {?} _document
     */
    constructor(_document) {
        this._document = _document;
        this._cssPosition = 'static';
        this._topOffset = '';
        this._bottomOffset = '';
        this._leftOffset = '';
        this._rightOffset = '';
        this._alignItems = '';
        this._justifyContent = '';
        this._width = '';
        this._height = '';
        this._wrapper = null;
    }
    /**
     * @param {?} overlayRef
     * @return {?}
     */
    attach(overlayRef) {
        this._overlayRef = overlayRef;
    }
    /**
     * Sets the top position of the overlay. Clears any previously set vertical position.
     * @param {?=} value New top offset.
     * @return {?}
     */
    top(value = '') {
        this._bottomOffset = '';
        this._topOffset = value;
        this._alignItems = 'flex-start';
        return this;
    }
    /**
     * Sets the left position of the overlay. Clears any previously set horizontal position.
     * @param {?=} value New left offset.
     * @return {?}
     */
    left(value = '') {
        this._rightOffset = '';
        this._leftOffset = value;
        this._justifyContent = 'flex-start';
        return this;
    }
    /**
     * Sets the bottom position of the overlay. Clears any previously set vertical position.
     * @param {?=} value New bottom offset.
     * @return {?}
     */
    bottom(value = '') {
        this._topOffset = '';
        this._bottomOffset = value;
        this._alignItems = 'flex-end';
        return this;
    }
    /**
     * Sets the right position of the overlay. Clears any previously set horizontal position.
     * @param {?=} value New right offset.
     * @return {?}
     */
    right(value = '') {
        this._leftOffset = '';
        this._rightOffset = value;
        this._justifyContent = 'flex-end';
        return this;
    }
    /**
     * Sets the overlay width and clears any previously set width.
     * @param {?=} value New width for the overlay
     * @return {?}
     */
    width(value = '') {
        this._width = value;
        // When the width is 100%, we should reset the `left` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.left('0px');
        }
        return this;
    }
    /**
     * Sets the overlay height and clears any previously set height.
     * @param {?=} value New height for the overlay
     * @return {?}
     */
    height(value = '') {
        this._height = value;
        // When the height is 100%, we should reset the `top` and the offset,
        // in order to ensure that the element is flush against the viewport edge.
        if (value === '100%') {
            this.top('0px');
        }
        return this;
    }
    /**
     * Centers the overlay horizontally with an optional offset.
     * Clears any previously set horizontal position.
     *
     * @param {?=} offset Overlay offset from the horizontal center.
     * @return {?}
     */
    centerHorizontally(offset = '') {
        this.left(offset);
        this._justifyContent = 'center';
        return this;
    }
    /**
     * Centers the overlay vertically with an optional offset.
     * Clears any previously set vertical position.
     *
     * @param {?=} offset Overlay offset from the vertical center.
     * @return {?}
     */
    centerVertically(offset = '') {
        this.top(offset);
        this._alignItems = 'center';
        return this;
    }
    /**
     * Apply the position to the element.
     * \@docs-private
     *
     * @return {?} Resolved when the styles have been applied.
     */
    apply() {
        // Since the overlay ref applies the strategy asynchronously, it could
        // have been disposed before it ends up being applied. If that is the
        // case, we shouldn't do anything.
        if (!this._overlayRef.hasAttached()) {
            return;
        }
        const /** @type {?} */ element = this._overlayRef.overlayElement;
        if (!this._wrapper && element.parentNode) {
            this._wrapper = this._document.createElement('div'); /** @type {?} */
            ((this._wrapper)).classList.add('cdk-global-overlay-wrapper');
            element.parentNode.insertBefore(/** @type {?} */ ((this._wrapper)), element); /** @type {?} */
            ((this._wrapper)).appendChild(element);
        }
        let /** @type {?} */ styles = element.style;
        let /** @type {?} */ parentStyles = (/** @type {?} */ (element.parentNode)).style;
        styles.position = this._cssPosition;
        styles.marginTop = this._topOffset;
        styles.marginLeft = this._leftOffset;
        styles.marginBottom = this._bottomOffset;
        styles.marginRight = this._rightOffset;
        styles.width = this._width;
        styles.height = this._height;
        parentStyles.justifyContent = this._justifyContent;
        parentStyles.alignItems = this._alignItems;
    }
    /**
     * Removes the wrapper element from the DOM.
     * @return {?}
     */
    dispose() {
        if (this._wrapper && this._wrapper.parentNode) {
            this._wrapper.parentNode.removeChild(this._wrapper);
            this._wrapper = null;
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Builder for overlay position strategy.
 */
class OverlayPositionBuilder {
    /**
     * @param {?} _viewportRuler
     * @param {?} _document
     */
    constructor(_viewportRuler, _document) {
        this._viewportRuler = _viewportRuler;
        this._document = _document;
    }
    /**
     * Creates a global position strategy.
     * @return {?}
     */
    global() {
        return new GlobalPositionStrategy(this._document);
    }
    /**
     * Creates a relative position strategy.
     * @param {?} elementRef
     * @param {?} originPos
     * @param {?} overlayPos
     * @return {?}
     */
    connectedTo(elementRef, originPos, overlayPos) {
        return new ConnectedPositionStrategy(originPos, overlayPos, elementRef, this._viewportRuler, this._document);
    }
}
OverlayPositionBuilder.decorators = [
    { type: Injectable },
];
/** @nocollapse */
OverlayPositionBuilder.ctorParameters = () => [
    { type: ViewportRuler, },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Service for dispatching keyboard events that land on the body to appropriate overlay ref,
 * if any. It maintains a list of attached overlays to determine best suited overlay based
 * on event target and order of overlay opens.
 */
class OverlayKeyboardDispatcher {
    /**
     * @param {?} _document
     */
    constructor(_document) {
        this._document = _document;
        /**
         * Currently attached overlays in the order they were attached.
         */
        this._attachedOverlays = [];
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._unsubscribeFromKeydownEvents();
    }
    /**
     * Add a new overlay to the list of attached overlay refs.
     * @param {?} overlayRef
     * @return {?}
     */
    add(overlayRef) {
        // Lazily start dispatcher once first overlay is added
        if (!this._keydownEventSubscription) {
            this._subscribeToKeydownEvents();
        }
        this._attachedOverlays.push(overlayRef);
    }
    /**
     * Remove an overlay from the list of attached overlay refs.
     * @param {?} overlayRef
     * @return {?}
     */
    remove(overlayRef) {
        const /** @type {?} */ index = this._attachedOverlays.indexOf(overlayRef);
        if (index > -1) {
            this._attachedOverlays.splice(index, 1);
        }
        // Remove the global listener once there are no more overlays.
        if (this._attachedOverlays.length === 0) {
            this._unsubscribeFromKeydownEvents();
        }
    }
    /**
     * Subscribe to keydown events that land on the body and dispatch those
     * events to the appropriate overlay.
     * @return {?}
     */
    _subscribeToKeydownEvents() {
        const /** @type {?} */ bodyKeydownEvents = fromEvent(this._document.body, 'keydown');
        this._keydownEventSubscription = bodyKeydownEvents.pipe(filter(() => !!this._attachedOverlays.length)).subscribe(event => {
            // Dispatch keydown event to correct overlay reference
            this._selectOverlayFromEvent(event)._keydownEvents.next(event);
        });
    }
    /**
     * Removes the global keydown subscription.
     * @return {?}
     */
    _unsubscribeFromKeydownEvents() {
        if (this._keydownEventSubscription) {
            this._keydownEventSubscription.unsubscribe();
            this._keydownEventSubscription = null;
        }
    }
    /**
     * Select the appropriate overlay from a keydown event.
     * @param {?} event
     * @return {?}
     */
    _selectOverlayFromEvent(event) {
        // Check if any overlays contain the event
        const /** @type {?} */ targetedOverlay = this._attachedOverlays.find(overlay => {
            return overlay.overlayElement === event.target ||
                overlay.overlayElement.contains(/** @type {?} */ (event.target));
        });
        // Use that overlay if it exists, otherwise choose the most recently attached one
        return targetedOverlay || this._attachedOverlays[this._attachedOverlays.length - 1];
    }
}
OverlayKeyboardDispatcher.decorators = [
    { type: Injectable },
];
/** @nocollapse */
OverlayKeyboardDispatcher.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];
/**
 * \@docs-private
 * @param {?} dispatcher
 * @param {?} _document
 * @return {?}
 */
function OVERLAY_KEYBOARD_DISPATCHER_PROVIDER_FACTORY(dispatcher, _document) {
    return dispatcher || new OverlayKeyboardDispatcher(_document);
}
/**
 * \@docs-private
 */
const OVERLAY_KEYBOARD_DISPATCHER_PROVIDER = {
    // If there is already an OverlayKeyboardDispatcher available, use that.
    // Otherwise, provide a new one.
    provide: OverlayKeyboardDispatcher,
    deps: [
        [new Optional(), new SkipSelf(), OverlayKeyboardDispatcher],
        /** @type {?} */ (
        // Coerce to `InjectionToken` so that the `deps` match the "shape"
        // of the type expected by Angular
        DOCUMENT)
    ],
    useFactory: OVERLAY_KEYBOARD_DISPATCHER_PROVIDER_FACTORY
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Container inside which all overlays will render.
 */
class OverlayContainer {
    /**
     * @param {?} _document
     */
    constructor(_document) {
        this._document = _document;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._containerElement && this._containerElement.parentNode) {
            this._containerElement.parentNode.removeChild(this._containerElement);
        }
    }
    /**
     * This method returns the overlay container element. It will lazily
     * create the element the first time  it is called to facilitate using
     * the container in non-browser environments.
     * @return {?} the container element
     */
    getContainerElement() {
        if (!this._containerElement) {
            this._createContainer();
        }
        return this._containerElement;
    }
    /**
     * Create the overlay container element, which is simply a div
     * with the 'cdk-overlay-container' class on the document body.
     * @return {?}
     */
    _createContainer() {
        const /** @type {?} */ container = this._document.createElement('div');
        container.classList.add('cdk-overlay-container');
        this._document.body.appendChild(container);
        this._containerElement = container;
    }
}
OverlayContainer.decorators = [
    { type: Injectable },
];
/** @nocollapse */
OverlayContainer.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];
/**
 * \@docs-private
 * @param {?} parentContainer
 * @param {?} _document
 * @return {?}
 */
function OVERLAY_CONTAINER_PROVIDER_FACTORY(parentContainer, _document) {
    return parentContainer || new OverlayContainer(_document);
}
/**
 * \@docs-private
 */
const OVERLAY_CONTAINER_PROVIDER = {
    // If there is already an OverlayContainer available, use that. Otherwise, provide a new one.
    provide: OverlayContainer,
    deps: [
        [new Optional(), new SkipSelf(), OverlayContainer],
        /** @type {?} */ (DOCUMENT // We need to use the InjectionToken somewhere to keep TS happy
        ) // We need to use the InjectionToken somewhere to keep TS happy
    ],
    useFactory: OVERLAY_CONTAINER_PROVIDER_FACTORY
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Next overlay unique ID.
 */
let nextUniqueId = 0;
/**
 * The default config for newly created overlays.
 */
let defaultConfig = new OverlayConfig();
/**
 * Service to create Overlays. Overlays are dynamically added pieces of floating UI, meant to be
 * used as a low-level building building block for other components. Dialogs, tooltips, menus,
 * selects, etc. can all be built using overlays. The service should primarily be used by authors
 * of re-usable components rather than developers building end-user applications.
 *
 * An overlay *is* a PortalOutlet, so any kind of Portal can be loaded into one.
 */
class Overlay {
    /**
     * @param {?} scrollStrategies
     * @param {?} _overlayContainer
     * @param {?} _componentFactoryResolver
     * @param {?} _positionBuilder
     * @param {?} _keyboardDispatcher
     * @param {?} _appRef
     * @param {?} _injector
     * @param {?} _ngZone
     * @param {?} _document
     */
    constructor(scrollStrategies, _overlayContainer, _componentFactoryResolver, _positionBuilder, _keyboardDispatcher, _appRef, _injector, _ngZone, _document) {
        this.scrollStrategies = scrollStrategies;
        this._overlayContainer = _overlayContainer;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._positionBuilder = _positionBuilder;
        this._keyboardDispatcher = _keyboardDispatcher;
        this._appRef = _appRef;
        this._injector = _injector;
        this._ngZone = _ngZone;
        this._document = _document;
    }
    /**
     * Creates an overlay.
     * @param {?=} config Configuration applied to the overlay.
     * @return {?} Reference to the created overlay.
     */
    create(config = defaultConfig) {
        const /** @type {?} */ pane = this._createPaneElement();
        const /** @type {?} */ portalOutlet = this._createPortalOutlet(pane);
        return new OverlayRef(portalOutlet, pane, config, this._ngZone, this._keyboardDispatcher);
    }
    /**
     * Gets a position builder that can be used, via fluent API,
     * to construct and configure a position strategy.
     * @return {?} An overlay position builder.
     */
    position() {
        return this._positionBuilder;
    }
    /**
     * Creates the DOM element for an overlay and appends it to the overlay container.
     * @return {?} Newly-created pane element
     */
    _createPaneElement() {
        const /** @type {?} */ pane = this._document.createElement('div');
        pane.id = `cdk-overlay-${nextUniqueId++}`;
        pane.classList.add('cdk-overlay-pane');
        this._overlayContainer.getContainerElement().appendChild(pane);
        return pane;
    }
    /**
     * Create a DomPortalOutlet into which the overlay content can be loaded.
     * @param {?} pane The DOM element to turn into a portal outlet.
     * @return {?} A portal outlet for the given DOM element.
     */
    _createPortalOutlet(pane) {
        return new DomPortalOutlet(pane, this._componentFactoryResolver, this._appRef, this._injector);
    }
}
Overlay.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Overlay.ctorParameters = () => [
    { type: ScrollStrategyOptions, },
    { type: OverlayContainer, },
    { type: ComponentFactoryResolver, },
    { type: OverlayPositionBuilder, },
    { type: OverlayKeyboardDispatcher, },
    { type: ApplicationRef, },
    { type: Injector, },
    { type: NgZone, },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Default set of positions for the overlay. Follows the behavior of a dropdown.
 */
const defaultPositionList = [
    new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
    new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
    new ConnectionPositionPair({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }),
    new ConnectionPositionPair({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }),
];
/**
 * Injection token that determines the scroll handling while the connected overlay is open.
 */
const CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY = new InjectionToken('cdk-connected-overlay-scroll-strategy');
/**
 * \@docs-private
 * @param {?} overlay
 * @return {?}
 */
function CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
    return () => overlay.scrollStrategies.reposition();
}
/**
 * \@docs-private
 */
const CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER = {
    provide: CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
/**
 * Directive applied to an element to make it usable as an origin for an Overlay using a
 * ConnectedPositionStrategy.
 */
class CdkOverlayOrigin {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
CdkOverlayOrigin.decorators = [
    { type: Directive, args: [{
                selector: '[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]',
                exportAs: 'cdkOverlayOrigin',
            },] },
];
/** @nocollapse */
CdkOverlayOrigin.ctorParameters = () => [
    { type: ElementRef, },
];
/**
 * Directive to facilitate declarative creation of an Overlay using a ConnectedPositionStrategy.
 */
class CdkConnectedOverlay {
    /**
     * @param {?} _overlay
     * @param {?} templateRef
     * @param {?} viewContainerRef
     * @param {?} _scrollStrategy
     * @param {?} _dir
     */
    constructor(_overlay, templateRef, viewContainerRef, _scrollStrategy, _dir) {
        this._overlay = _overlay;
        this._scrollStrategy = _scrollStrategy;
        this._dir = _dir;
        this._hasBackdrop = false;
        this._backdropSubscription = Subscription.EMPTY;
        this._positionSubscription = Subscription.EMPTY;
        this._offsetX = 0;
        this._offsetY = 0;
        /**
         * Strategy to be used when handling scroll events while the overlay is open.
         */
        this.scrollStrategy = this._scrollStrategy();
        /**
         * Whether the overlay is open.
         */
        this.open = false;
        /**
         * Event emitted when the backdrop is clicked.
         */
        this.backdropClick = new EventEmitter();
        /**
         * Event emitted when the position has changed.
         */
        this.positionChange = new EventEmitter();
        /**
         * Event emitted when the overlay has been attached.
         */
        this.attach = new EventEmitter();
        /**
         * Event emitted when the overlay has been detached.
         */
        this.detach = new EventEmitter();
        this._templatePortal = new TemplatePortal(templateRef, viewContainerRef);
    }
    /**
     * The offset in pixels for the overlay connection point on the x-axis
     * @return {?}
     */
    get offsetX() { return this._offsetX; }
    /**
     * @param {?} offsetX
     * @return {?}
     */
    set offsetX(offsetX) {
        this._offsetX = offsetX;
        if (this._position) {
            this._position.withOffsetX(offsetX);
        }
    }
    /**
     * The offset in pixels for the overlay connection point on the y-axis
     * @return {?}
     */
    get offsetY() { return this._offsetY; }
    /**
     * @param {?} offsetY
     * @return {?}
     */
    set offsetY(offsetY) {
        this._offsetY = offsetY;
        if (this._position) {
            this._position.withOffsetY(offsetY);
        }
    }
    /**
     * Whether or not the overlay should attach a backdrop.
     * @return {?}
     */
    get hasBackdrop() { return this._hasBackdrop; }
    /**
     * @param {?} value
     * @return {?}
     */
    set hasBackdrop(value) { this._hasBackdrop = coerceBooleanProperty(value); }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedOrigin() { return this.origin; }
    /**
     * @param {?} _origin
     * @return {?}
     */
    set _deprecatedOrigin(_origin) { this.origin = _origin; }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedPositions() { return this.positions; }
    /**
     * @param {?} _positions
     * @return {?}
     */
    set _deprecatedPositions(_positions) { this.positions = _positions; }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedOffsetX() { return this.offsetX; }
    /**
     * @param {?} _offsetX
     * @return {?}
     */
    set _deprecatedOffsetX(_offsetX) { this.offsetX = _offsetX; }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedOffsetY() { return this.offsetY; }
    /**
     * @param {?} _offsetY
     * @return {?}
     */
    set _deprecatedOffsetY(_offsetY) { this.offsetY = _offsetY; }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedWidth() { return this.width; }
    /**
     * @param {?} _width
     * @return {?}
     */
    set _deprecatedWidth(_width) { this.width = _width; }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedHeight() { return this.height; }
    /**
     * @param {?} _height
     * @return {?}
     */
    set _deprecatedHeight(_height) { this.height = _height; }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedMinWidth() { return this.minWidth; }
    /**
     * @param {?} _minWidth
     * @return {?}
     */
    set _deprecatedMinWidth(_minWidth) { this.minWidth = _minWidth; }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedMinHeight() { return this.minHeight; }
    /**
     * @param {?} _minHeight
     * @return {?}
     */
    set _deprecatedMinHeight(_minHeight) { this.minHeight = _minHeight; }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedBackdropClass() { return this.backdropClass; }
    /**
     * @param {?} _backdropClass
     * @return {?}
     */
    set _deprecatedBackdropClass(_backdropClass) { this.backdropClass = _backdropClass; }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedScrollStrategy() { return this.scrollStrategy; }
    /**
     * @param {?} _scrollStrategy
     * @return {?}
     */
    set _deprecatedScrollStrategy(_scrollStrategy) {
        this.scrollStrategy = _scrollStrategy;
    }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedOpen() { return this.open; }
    /**
     * @param {?} _open
     * @return {?}
     */
    set _deprecatedOpen(_open) { this.open = _open; }
    /**
     * @deprecated
     * @return {?}
     */
    get _deprecatedHasBackdrop() { return this.hasBackdrop; }
    /**
     * @param {?} _hasBackdrop
     * @return {?}
     */
    set _deprecatedHasBackdrop(_hasBackdrop) { this.hasBackdrop = _hasBackdrop; }
    /**
     * The associated overlay reference.
     * @return {?}
     */
    get overlayRef() {
        return this._overlayRef;
    }
    /**
     * The element's layout direction.
     * @return {?}
     */
    get dir() {
        return this._dir ? this._dir.value : 'ltr';
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._destroyOverlay();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes['open'] || changes['_deprecatedOpen']) {
            this.open ? this._attachOverlay() : this._detachOverlay();
        }
    }
    /**
     * Creates an overlay
     * @return {?}
     */
    _createOverlay() {
        if (!this.positions || !this.positions.length) {
            this.positions = defaultPositionList;
        }
        this._overlayRef = this._overlay.create(this._buildConfig());
    }
    /**
     * Builds the overlay config based on the directive's inputs
     * @return {?}
     */
    _buildConfig() {
        const /** @type {?} */ positionStrategy = this._position = this._createPositionStrategy();
        const /** @type {?} */ overlayConfig = new OverlayConfig({
            positionStrategy,
            scrollStrategy: this.scrollStrategy,
            hasBackdrop: this.hasBackdrop
        });
        if (this.width || this.width === 0) {
            overlayConfig.width = this.width;
        }
        if (this.height || this.height === 0) {
            overlayConfig.height = this.height;
        }
        if (this.minWidth || this.minWidth === 0) {
            overlayConfig.minWidth = this.minWidth;
        }
        if (this.minHeight || this.minHeight === 0) {
            overlayConfig.minHeight = this.minHeight;
        }
        if (this.backdropClass) {
            overlayConfig.backdropClass = this.backdropClass;
        }
        return overlayConfig;
    }
    /**
     * Returns the position strategy of the overlay to be set on the overlay config
     * @return {?}
     */
    _createPositionStrategy() {
        const /** @type {?} */ pos = this.positions[0];
        const /** @type {?} */ originPoint = { originX: pos.originX, originY: pos.originY };
        const /** @type {?} */ overlayPoint = { overlayX: pos.overlayX, overlayY: pos.overlayY };
        const /** @type {?} */ strategy = this._overlay.position()
            .connectedTo(this.origin.elementRef, originPoint, overlayPoint)
            .withOffsetX(this.offsetX)
            .withOffsetY(this.offsetY);
        this._handlePositionChanges(strategy);
        return strategy;
    }
    /**
     * @param {?} strategy
     * @return {?}
     */
    _handlePositionChanges(strategy) {
        for (let /** @type {?} */ i = 1; i < this.positions.length; i++) {
            strategy.withFallbackPosition({ originX: this.positions[i].originX, originY: this.positions[i].originY }, { overlayX: this.positions[i].overlayX, overlayY: this.positions[i].overlayY });
        }
        this._positionSubscription =
            strategy.onPositionChange.subscribe(pos => this.positionChange.emit(pos));
    }
    /**
     * Attaches the overlay and subscribes to backdrop clicks if backdrop exists
     * @return {?}
     */
    _attachOverlay() {
        if (!this._overlayRef) {
            this._createOverlay(); /** @type {?} */
            ((this._overlayRef)).keydownEvents().subscribe((event) => {
                if (event.keyCode === ESCAPE) {
                    this._detachOverlay();
                }
            });
        }
        this._position.withDirection(this.dir);
        this._overlayRef.setDirection(this.dir);
        if (!this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._templatePortal);
            this.attach.emit();
        }
        if (this.hasBackdrop) {
            this._backdropSubscription = this._overlayRef.backdropClick().subscribe(() => {
                this.backdropClick.emit();
            });
        }
    }
    /**
     * Detaches the overlay and unsubscribes to backdrop clicks if backdrop exists
     * @return {?}
     */
    _detachOverlay() {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this.detach.emit();
        }
        this._backdropSubscription.unsubscribe();
    }
    /**
     * Destroys the overlay created by this directive.
     * @return {?}
     */
    _destroyOverlay() {
        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
        this._backdropSubscription.unsubscribe();
        this._positionSubscription.unsubscribe();
    }
}
CdkConnectedOverlay.decorators = [
    { type: Directive, args: [{
                selector: '[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]',
                exportAs: 'cdkConnectedOverlay'
            },] },
];
/** @nocollapse */
CdkConnectedOverlay.ctorParameters = () => [
    { type: Overlay, },
    { type: TemplateRef, },
    { type: ViewContainerRef, },
    { type: undefined, decorators: [{ type: Inject, args: [CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY,] },] },
    { type: Directionality, decorators: [{ type: Optional },] },
];
CdkConnectedOverlay.propDecorators = {
    "origin": [{ type: Input, args: ['cdkConnectedOverlayOrigin',] },],
    "positions": [{ type: Input, args: ['cdkConnectedOverlayPositions',] },],
    "offsetX": [{ type: Input, args: ['cdkConnectedOverlayOffsetX',] },],
    "offsetY": [{ type: Input, args: ['cdkConnectedOverlayOffsetY',] },],
    "width": [{ type: Input, args: ['cdkConnectedOverlayWidth',] },],
    "height": [{ type: Input, args: ['cdkConnectedOverlayHeight',] },],
    "minWidth": [{ type: Input, args: ['cdkConnectedOverlayMinWidth',] },],
    "minHeight": [{ type: Input, args: ['cdkConnectedOverlayMinHeight',] },],
    "backdropClass": [{ type: Input, args: ['cdkConnectedOverlayBackdropClass',] },],
    "scrollStrategy": [{ type: Input, args: ['cdkConnectedOverlayScrollStrategy',] },],
    "open": [{ type: Input, args: ['cdkConnectedOverlayOpen',] },],
    "hasBackdrop": [{ type: Input, args: ['cdkConnectedOverlayHasBackdrop',] },],
    "_deprecatedOrigin": [{ type: Input, args: ['origin',] },],
    "_deprecatedPositions": [{ type: Input, args: ['positions',] },],
    "_deprecatedOffsetX": [{ type: Input, args: ['offsetX',] },],
    "_deprecatedOffsetY": [{ type: Input, args: ['offsetY',] },],
    "_deprecatedWidth": [{ type: Input, args: ['width',] },],
    "_deprecatedHeight": [{ type: Input, args: ['height',] },],
    "_deprecatedMinWidth": [{ type: Input, args: ['minWidth',] },],
    "_deprecatedMinHeight": [{ type: Input, args: ['minHeight',] },],
    "_deprecatedBackdropClass": [{ type: Input, args: ['backdropClass',] },],
    "_deprecatedScrollStrategy": [{ type: Input, args: ['scrollStrategy',] },],
    "_deprecatedOpen": [{ type: Input, args: ['open',] },],
    "_deprecatedHasBackdrop": [{ type: Input, args: ['hasBackdrop',] },],
    "backdropClick": [{ type: Output },],
    "positionChange": [{ type: Output },],
    "attach": [{ type: Output },],
    "detach": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

const OVERLAY_PROVIDERS = [
    Overlay,
    OverlayPositionBuilder,
    OVERLAY_KEYBOARD_DISPATCHER_PROVIDER,
    VIEWPORT_RULER_PROVIDER,
    OVERLAY_CONTAINER_PROVIDER,
    CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER,
];
class OverlayModule {
}
OverlayModule.decorators = [
    { type: NgModule, args: [{
                imports: [BidiModule, PortalModule, ScrollDispatchModule],
                exports: [CdkConnectedOverlay, CdkOverlayOrigin, ScrollDispatchModule],
                declarations: [CdkConnectedOverlay, CdkOverlayOrigin],
                providers: [OVERLAY_PROVIDERS, ScrollStrategyOptions],
            },] },
];
/** @nocollapse */
OverlayModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * Alternative to OverlayContainer that supports correct displaying of overlay elements in
 * Fullscreen mode
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
 *
 * Should be provided in the root component.
 */
class FullscreenOverlayContainer extends OverlayContainer {
    /**
     * @return {?}
     */
    _createContainer() {
        super._createContainer();
        this._adjustParentForFullscreenChange();
        this._addFullscreenChangeListener(() => this._adjustParentForFullscreenChange());
    }
    /**
     * @return {?}
     */
    _adjustParentForFullscreenChange() {
        if (!this._containerElement) {
            return;
        }
        let /** @type {?} */ fullscreenElement = this.getFullscreenElement();
        let /** @type {?} */ parent = fullscreenElement || document.body;
        parent.appendChild(this._containerElement);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    _addFullscreenChangeListener(fn) {
        if (document.fullscreenEnabled) {
            document.addEventListener('fullscreenchange', fn);
        }
        else if (document.webkitFullscreenEnabled) {
            document.addEventListener('webkitfullscreenchange', fn);
        }
        else if ((/** @type {?} */ (document)).mozFullScreenEnabled) {
            document.addEventListener('mozfullscreenchange', fn);
        }
        else if ((/** @type {?} */ (document)).msFullscreenEnabled) {
            document.addEventListener('MSFullscreenChange', fn);
        }
    }
    /**
     * When the page is put into fullscreen mode, a specific element is specified.
     * Only that element and its children are visible when in fullscreen mode.
     * @return {?}
     */
    getFullscreenElement() {
        return document.fullscreenElement ||
            document.webkitFullscreenElement ||
            (/** @type {?} */ (document)).mozFullScreenElement ||
            (/** @type {?} */ (document)).msFullscreenElement ||
            null;
    }
}
FullscreenOverlayContainer.decorators = [
    { type: Injectable },
];
/** @nocollapse */
FullscreenOverlayContainer.ctorParameters = () => [];

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

export { Overlay, OverlayContainer, CdkOverlayOrigin, CdkConnectedOverlay, FullscreenOverlayContainer, OverlayRef, ViewportRuler, OverlayKeyboardDispatcher, GlobalPositionStrategy, ConnectedPositionStrategy, VIEWPORT_RULER_PROVIDER, CdkConnectedOverlay as ConnectedOverlayDirective, CdkOverlayOrigin as OverlayOrigin, OverlayConfig, ConnectionPositionPair, ScrollingVisibility, ConnectedOverlayPositionChange, CdkScrollable, ScrollDispatcher, ScrollStrategyOptions, RepositionScrollStrategy, CloseScrollStrategy, NoopScrollStrategy, BlockScrollStrategy, OVERLAY_PROVIDERS, OverlayModule, OVERLAY_KEYBOARD_DISPATCHER_PROVIDER as ɵg, OVERLAY_KEYBOARD_DISPATCHER_PROVIDER_FACTORY as ɵf, OVERLAY_CONTAINER_PROVIDER as ɵb, OVERLAY_CONTAINER_PROVIDER_FACTORY as ɵa, CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY as ɵc, CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER as ɵe, CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY as ɵd, OverlayPositionBuilder as ɵh };
//# sourceMappingURL=overlay.js.map
