/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AUTO_STYLE } from '@angular/core';
import { StringMapWrapper } from '../facade/collection';
import { isPresent } from '../facade/lang';
import { getDOM } from './dom_adapter';
export class WebAnimationsPlayer {
    constructor(element, keyframes, options) {
        this.element = element;
        this.keyframes = keyframes;
        this.options = options;
        this._subscriptions = [];
        this._finished = false;
        this._initialized = false;
        this._started = false;
        this.parentPlayer = null;
        this._duration = options['duration'];
    }
    _onFinish() {
        if (!this._finished) {
            this._finished = true;
            if (!isPresent(this.parentPlayer)) {
                this.destroy();
            }
            this._subscriptions.forEach(fn => fn());
            this._subscriptions = [];
        }
    }
    init() {
        if (this._initialized)
            return;
        this._initialized = true;
        var keyframes = this.keyframes.map(styles => {
            var formattedKeyframe = {};
            StringMapWrapper.forEach(styles, (value, prop) => {
                formattedKeyframe[prop] = value == AUTO_STYLE ? _computeStyle(this.element, prop) : value;
            });
            return formattedKeyframe;
        });
        this._player = this._triggerWebAnimation(this.element, keyframes, this.options);
        // this is required so that the player doesn't start to animate right away
        this.reset();
        this._player.onfinish = () => this._onFinish();
    }
    /** @internal */
    _triggerWebAnimation(element, keyframes, options) {
        return element.animate(keyframes, options);
    }
    onDone(fn) { this._subscriptions.push(fn); }
    play() {
        this.init();
        this._player.play();
    }
    pause() {
        this.init();
        this._player.pause();
    }
    finish() {
        this.init();
        this._onFinish();
        this._player.finish();
    }
    reset() { this._player.cancel(); }
    restart() {
        this.reset();
        this.play();
    }
    hasStarted() { return this._started; }
    destroy() {
        this.reset();
        this._onFinish();
    }
    get totalTime() { return this._duration; }
    setPosition(p) { this._player.currentTime = p * this.totalTime; }
    getPosition() { return this._player.currentTime / this.totalTime; }
}
function _computeStyle(element, prop) {
    return getDOM().getComputedStyle(element)[prop];
}
//# sourceMappingURL=web_animations_player.js.map