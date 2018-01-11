/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PositionStrategy } from './position-strategy';
import { ElementRef } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ConnectionPositionPair, OriginConnectionPosition, OverlayConnectionPosition, ConnectedOverlayPositionChange } from './connected-position';
import { Observable } from 'rxjs/Observable';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { OverlayRef } from '../overlay-ref';
/**
 * A strategy for positioning overlays. Using this strategy, an overlay is given an
 * implicit position relative some origin element. The relative position is defined in terms of
 * a point on the origin element that is connected to a point on the overlay element. For example,
 * a basic dropdown is connecting the bottom-left corner of the origin to the top-left corner
 * of the overlay.
 */
export declare class ConnectedPositionStrategy implements PositionStrategy {
    private _connectedTo;
    private _viewportRuler;
    private _document;
    /** The overlay to which this strategy is attached. */
    private _overlayRef;
    /** Layout direction of the position strategy. */
    private _dir;
    /** The offset in pixels for the overlay connection point on the x-axis */
    private _offsetX;
    /** The offset in pixels for the overlay connection point on the y-axis */
    private _offsetY;
    /** The Scrollable containers used to check scrollable view properties on position change. */
    private scrollables;
    /** Subscription to viewport resize events. */
    private _resizeSubscription;
    /** Whether the we're dealing with an RTL context */
    readonly _isRtl: boolean;
    /** Ordered list of preferred positions, from most to least desirable. */
    _preferredPositions: ConnectionPositionPair[];
    /** The origin element against which the overlay will be positioned. */
    private _origin;
    /** The overlay pane element. */
    private _pane;
    /** The last position to have been calculated as the best fit position. */
    private _lastConnectedPosition;
    /** Whether the position strategy is applied currently. */
    private _applied;
    /** Whether the overlay position is locked. */
    private _positionLocked;
    private _onPositionChange;
    /** Emits an event when the connection point changes. */
    readonly onPositionChange: Observable<ConnectedOverlayPositionChange>;
    constructor(originPos: OriginConnectionPosition, overlayPos: OverlayConnectionPosition, _connectedTo: ElementRef, _viewportRuler: ViewportRuler, _document: any);
    /** Ordered list of preferred positions, from most to least desirable. */
    readonly positions: ConnectionPositionPair[];
    /** Attach this position strategy to an overlay. */
    attach(overlayRef: OverlayRef): void;
    /** Disposes all resources used by the position strategy. */
    dispose(): void;
    /** @docs-private */
    detach(): void;
    /**
     * Updates the position of the overlay element, using whichever preferred position relative
     * to the origin fits on-screen.
     * @docs-private
     */
    apply(): void;
    /**
     * Re-positions the overlay element with the trigger in its last calculated position,
     * even if a position higher in the "preferred positions" list would now fit. This
     * allows one to re-align the panel without changing the orientation of the panel.
     */
    recalculateLastPosition(): void;
    /**
     * Sets the list of Scrollable containers that host the origin element so that
     * on reposition we can evaluate if it or the overlay has been clipped or outside view. Every
     * Scrollable must be an ancestor element of the strategy's origin element.
     */
    withScrollableContainers(scrollables: CdkScrollable[]): void;
    /**
     * Adds a new preferred fallback position.
     * @param originPos
     * @param overlayPos
     */
    withFallbackPosition(originPos: OriginConnectionPosition, overlayPos: OverlayConnectionPosition, offsetX?: number, offsetY?: number): this;
    /**
     * Sets the layout direction so the overlay's position can be adjusted to match.
     * @param dir New layout direction.
     */
    withDirection(dir: 'ltr' | 'rtl'): this;
    /**
     * Sets an offset for the overlay's connection point on the x-axis
     * @param offset New offset in the X axis.
     */
    withOffsetX(offset: number): this;
    /**
     * Sets an offset for the overlay's connection point on the y-axis
     * @param  offset New offset in the Y axis.
     */
    withOffsetY(offset: number): this;
    /**
     * Sets whether the overlay's position should be locked in after it is positioned
     * initially. When an overlay is locked in, it won't attempt to reposition itself
     * when the position is re-applied (e.g. when the user scrolls away).
     * @param isLocked Whether the overlay should locked in.
     */
    withLockedPosition(isLocked: boolean): this;
    /**
     * Overwrites the current set of positions with an array of new ones.
     * @param positions Position pairs to be set on the strategy.
     */
    withPositions(positions: ConnectionPositionPair[]): this;
    /**
     * Gets the horizontal (x) "start" dimension based on whether the overlay is in an RTL context.
     * @param rect
     */
    private _getStartX(rect);
    /**
     * Gets the horizontal (x) "end" dimension based on whether the overlay is in an RTL context.
     * @param rect
     */
    private _getEndX(rect);
    /**
     * Gets the (x, y) coordinate of a connection point on the origin based on a relative position.
     * @param originRect
     * @param pos
     */
    private _getOriginConnectionPoint(originRect, pos);
    /**
     * Gets the (x, y) coordinate of the top-left corner of the overlay given a given position and
     * origin point to which the overlay should be connected, as well as how much of the element
     * would be inside the viewport at that position.
     */
    private _getOverlayPoint(originPoint, overlayRect, viewportSize, pos);
    /**
     * Gets the view properties of the trigger and overlay, including whether they are clipped
     * or completely outside the view of any of the strategy's scrollables.
     */
    private _getScrollVisibility(overlay);
    /** Physically positions the overlay element to the given coordinate. */
    private _setElementPosition(element, overlayRect, overlayPoint, pos);
    /**
     * Subtracts the amount that an element is overflowing on an axis from it's length.
     */
    private _subtractOverflows(length, ...overflows);
}
