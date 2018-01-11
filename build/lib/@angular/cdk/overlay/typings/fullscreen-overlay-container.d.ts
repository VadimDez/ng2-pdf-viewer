import { OverlayContainer } from './overlay-container';
/**
 * Alternative to OverlayContainer that supports correct displaying of overlay elements in
 * Fullscreen mode
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
 *
 * Should be provided in the root component.
 */
export declare class FullscreenOverlayContainer extends OverlayContainer {
    protected _createContainer(): void;
    private _adjustParentForFullscreenChange();
    private _addFullscreenChangeListener(fn);
    /**
     * When the page is put into fullscreen mode, a specific element is specified.
     * Only that element and its children are visible when in fullscreen mode.
    */
    getFullscreenElement(): Element;
}
