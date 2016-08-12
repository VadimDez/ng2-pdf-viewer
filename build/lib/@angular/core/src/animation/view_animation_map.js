/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var collection_1 = require('../facade/collection');
var lang_1 = require('../facade/lang');
var ViewAnimationMap = (function () {
    function ViewAnimationMap() {
        this._map = new collection_1.Map();
        this._allPlayers = [];
    }
    Object.defineProperty(ViewAnimationMap.prototype, "length", {
        get: function () { return this.getAllPlayers().length; },
        enumerable: true,
        configurable: true
    });
    ViewAnimationMap.prototype.find = function (element, animationName) {
        var playersByAnimation = this._map.get(element);
        if (lang_1.isPresent(playersByAnimation)) {
            return playersByAnimation[animationName];
        }
    };
    ViewAnimationMap.prototype.findAllPlayersByElement = function (element) {
        var el = this._map.get(element);
        return el ? collection_1.StringMapWrapper.values(el) : [];
    };
    ViewAnimationMap.prototype.set = function (element, animationName, player) {
        var playersByAnimation = this._map.get(element);
        if (!lang_1.isPresent(playersByAnimation)) {
            playersByAnimation = {};
        }
        var existingEntry = playersByAnimation[animationName];
        if (lang_1.isPresent(existingEntry)) {
            this.remove(element, animationName);
        }
        playersByAnimation[animationName] = player;
        this._allPlayers.push(player);
        this._map.set(element, playersByAnimation);
    };
    ViewAnimationMap.prototype.getAllPlayers = function () { return this._allPlayers; };
    ViewAnimationMap.prototype.remove = function (element, animationName) {
        var playersByAnimation = this._map.get(element);
        if (lang_1.isPresent(playersByAnimation)) {
            var player = playersByAnimation[animationName];
            delete playersByAnimation[animationName];
            var index = this._allPlayers.indexOf(player);
            collection_1.ListWrapper.removeAt(this._allPlayers, index);
            if (collection_1.StringMapWrapper.isEmpty(playersByAnimation)) {
                this._map.delete(element);
            }
        }
    };
    return ViewAnimationMap;
}());
exports.ViewAnimationMap = ViewAnimationMap;
//# sourceMappingURL=view_animation_map.js.map