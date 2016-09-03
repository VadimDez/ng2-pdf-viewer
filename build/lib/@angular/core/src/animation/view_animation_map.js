/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ListWrapper, Map, StringMapWrapper } from '../facade/collection';
import { isPresent } from '../facade/lang';
export var ViewAnimationMap = (function () {
    function ViewAnimationMap() {
        this._map = new Map();
        this._allPlayers = [];
    }
    Object.defineProperty(ViewAnimationMap.prototype, "length", {
        get: function () { return this.getAllPlayers().length; },
        enumerable: true,
        configurable: true
    });
    ViewAnimationMap.prototype.find = function (element, animationName) {
        var playersByAnimation = this._map.get(element);
        if (isPresent(playersByAnimation)) {
            return playersByAnimation[animationName];
        }
    };
    ViewAnimationMap.prototype.findAllPlayersByElement = function (element) {
        var el = this._map.get(element);
        return el ? StringMapWrapper.values(el) : [];
    };
    ViewAnimationMap.prototype.set = function (element, animationName, player) {
        var playersByAnimation = this._map.get(element);
        if (!isPresent(playersByAnimation)) {
            playersByAnimation = {};
        }
        var existingEntry = playersByAnimation[animationName];
        if (isPresent(existingEntry)) {
            this.remove(element, animationName);
        }
        playersByAnimation[animationName] = player;
        this._allPlayers.push(player);
        this._map.set(element, playersByAnimation);
    };
    ViewAnimationMap.prototype.getAllPlayers = function () { return this._allPlayers; };
    ViewAnimationMap.prototype.remove = function (element, animationName) {
        var playersByAnimation = this._map.get(element);
        if (isPresent(playersByAnimation)) {
            var player = playersByAnimation[animationName];
            delete playersByAnimation[animationName];
            var index = this._allPlayers.indexOf(player);
            ListWrapper.removeAt(this._allPlayers, index);
            if (StringMapWrapper.isEmpty(playersByAnimation)) {
                this._map.delete(element);
            }
        }
    };
    return ViewAnimationMap;
}());
//# sourceMappingURL=view_animation_map.js.map