/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core'), require('@angular/material/core'), require('@angular/cdk/a11y'), require('@angular/cdk/coercion'), require('@angular/cdk/collections'), require('@angular/cdk/keycodes'), require('@angular/forms')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/common', '@angular/core', '@angular/material/core', '@angular/cdk/a11y', '@angular/cdk/coercion', '@angular/cdk/collections', '@angular/cdk/keycodes', '@angular/forms'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.material = global.ng.material || {}, global.ng.material.list = global.ng.material.list || {}),global.ng.common,global.ng.core,global.ng.material.core,global.ng.cdk.a11y,global.ng.cdk.coercion,global.ng.cdk.collections,global.ng.cdk.keycodes,global.ng.forms));
}(this, (function (exports,_angular_common,_angular_core,_angular_material_core,_angular_cdk_a11y,_angular_cdk_coercion,_angular_cdk_collections,_angular_cdk_keycodes,_angular_forms) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * \@docs-private
 */
var MatListBase = /** @class */ (function () {
    function MatListBase() {
    }
    return MatListBase;
}());
var _MatListMixinBase = _angular_material_core.mixinDisableRipple(MatListBase);
/**
 * \@docs-private
 */
var MatListItemBase = /** @class */ (function () {
    function MatListItemBase() {
    }
    return MatListItemBase;
}());
var _MatListItemMixinBase = _angular_material_core.mixinDisableRipple(MatListItemBase);
/**
 * Divider between items within a list.
 */
var MatListDivider = /** @class */ (function () {
    function MatListDivider() {
    }
    MatListDivider.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: 'mat-divider',
                    host: {
                        'role': 'separator',
                        'aria-orientation': 'horizontal'
                    }
                },] },
    ];
    /** @nocollapse */
    MatListDivider.ctorParameters = function () { return []; };
    return MatListDivider;
}());
/**
 * A Material Design list component.
 */
var MatNavList = /** @class */ (function (_super) {
    __extends(MatNavList, _super);
    function MatNavList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatNavList.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-nav-list',
                    exportAs: 'matNavList',
                    host: {
                        'role': 'navigation',
                        'class': 'mat-nav-list'
                    },
                    template: "<ng-content></ng-content>",
                    styles: [".mat-subheader{display:flex;box-sizing:border-box;padding:16px;align-items:center}.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{margin:0}.mat-list,.mat-nav-list,.mat-selection-list{padding-top:8px;display:block}.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{height:48px;line-height:16px}.mat-list .mat-subheader:first-child,.mat-nav-list .mat-subheader:first-child,.mat-selection-list .mat-subheader:first-child{margin-top:-8px}.mat-list .mat-list-item,.mat-list .mat-list-option,.mat-nav-list .mat-list-item,.mat-nav-list .mat-list-option,.mat-selection-list .mat-list-item,.mat-selection-list .mat-list-option{display:block;height:48px}.mat-list .mat-list-item .mat-list-item-content,.mat-list .mat-list-option .mat-list-item-content,.mat-nav-list .mat-list-item .mat-list-item-content,.mat-nav-list .mat-list-option .mat-list-item-content,.mat-selection-list .mat-list-item .mat-list-item-content,.mat-selection-list .mat-list-option .mat-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.mat-list .mat-list-item .mat-list-item-content-reverse,.mat-list .mat-list-option .mat-list-item-content-reverse,.mat-nav-list .mat-list-item .mat-list-item-content-reverse,.mat-nav-list .mat-list-option .mat-list-item-content-reverse,.mat-selection-list .mat-list-item .mat-list-item-content-reverse,.mat-selection-list .mat-list-option .mat-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.mat-list .mat-list-item .mat-list-item-ripple,.mat-list .mat-list-option .mat-list-item-ripple,.mat-nav-list .mat-list-item .mat-list-item-ripple,.mat-nav-list .mat-list-option .mat-list-item-ripple,.mat-selection-list .mat-list-item .mat-list-item-ripple,.mat-selection-list .mat-list-option .mat-list-item-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-list .mat-list-item.mat-list-item-avatar,.mat-list .mat-list-option.mat-list-item-avatar,.mat-nav-list .mat-list-item.mat-list-item-avatar,.mat-nav-list .mat-list-option.mat-list-item-avatar,.mat-selection-list .mat-list-item.mat-list-item-avatar,.mat-selection-list .mat-list-option.mat-list-item-avatar{height:56px}.mat-list .mat-list-item.mat-2-line,.mat-list .mat-list-option.mat-2-line,.mat-nav-list .mat-list-item.mat-2-line,.mat-nav-list .mat-list-option.mat-2-line,.mat-selection-list .mat-list-item.mat-2-line,.mat-selection-list .mat-list-option.mat-2-line{height:72px}.mat-list .mat-list-item.mat-3-line,.mat-list .mat-list-option.mat-3-line,.mat-nav-list .mat-list-item.mat-3-line,.mat-nav-list .mat-list-option.mat-3-line,.mat-selection-list .mat-list-item.mat-3-line,.mat-selection-list .mat-list-option.mat-3-line{height:88px}.mat-list .mat-list-item.mat-multi-line,.mat-list .mat-list-option.mat-multi-line,.mat-nav-list .mat-list-item.mat-multi-line,.mat-nav-list .mat-list-option.mat-multi-line,.mat-selection-list .mat-list-item.mat-multi-line,.mat-selection-list .mat-list-option.mat-multi-line{height:auto}.mat-list .mat-list-item.mat-multi-line .mat-list-item-content,.mat-list .mat-list-option.mat-multi-line .mat-list-item-content,.mat-nav-list .mat-list-item.mat-multi-line .mat-list-item-content,.mat-nav-list .mat-list-option.mat-multi-line .mat-list-item-content,.mat-selection-list .mat-list-item.mat-multi-line .mat-list-item-content,.mat-selection-list .mat-list-option.mat-multi-line .mat-list-item-content{padding-top:16px;padding-bottom:16px}.mat-list .mat-list-item .mat-list-text,.mat-list .mat-list-option .mat-list-text,.mat-nav-list .mat-list-item .mat-list-text,.mat-nav-list .mat-list-option .mat-list-text,.mat-selection-list .mat-list-item .mat-list-text,.mat-selection-list .mat-list-option .mat-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0 16px}.mat-list .mat-list-item .mat-list-text>*,.mat-list .mat-list-option .mat-list-text>*,.mat-nav-list .mat-list-item .mat-list-text>*,.mat-nav-list .mat-list-option .mat-list-text>*,.mat-selection-list .mat-list-item .mat-list-text>*,.mat-selection-list .mat-list-option .mat-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-list .mat-list-item .mat-list-text:empty,.mat-list .mat-list-option .mat-list-text:empty,.mat-nav-list .mat-list-item .mat-list-text:empty,.mat-nav-list .mat-list-option .mat-list-text:empty,.mat-selection-list .mat-list-item .mat-list-text:empty,.mat-selection-list .mat-list-option .mat-list-text:empty{display:none}.mat-list .mat-list-item .mat-list-text:nth-child(2),.mat-list .mat-list-option .mat-list-text:nth-child(2),.mat-nav-list .mat-list-item .mat-list-text:nth-child(2),.mat-nav-list .mat-list-option .mat-list-text:nth-child(2),.mat-selection-list .mat-list-item .mat-list-text:nth-child(2),.mat-selection-list .mat-list-option .mat-list-text:nth-child(2){padding:0}.mat-list .mat-list-item .mat-list-avatar,.mat-list .mat-list-option .mat-list-avatar,.mat-nav-list .mat-list-item .mat-list-avatar,.mat-nav-list .mat-list-option .mat-list-avatar,.mat-selection-list .mat-list-item .mat-list-avatar,.mat-selection-list .mat-list-option .mat-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%}.mat-list .mat-list-item .mat-list-icon,.mat-list .mat-list-option .mat-list-icon,.mat-nav-list .mat-list-item .mat-list-icon,.mat-nav-list .mat-list-option .mat-list-icon,.mat-selection-list .mat-list-item .mat-list-icon,.mat-selection-list .mat-list-option .mat-list-icon{width:24px;height:24px;font-size:24px;box-sizing:content-box;border-radius:50%;padding:4px}.mat-list[dense],.mat-nav-list[dense],.mat-selection-list[dense]{padding-top:4px;display:block}.mat-list[dense] .mat-subheader,.mat-nav-list[dense] .mat-subheader,.mat-selection-list[dense] .mat-subheader{height:40px;line-height:8px}.mat-list[dense] .mat-subheader:first-child,.mat-nav-list[dense] .mat-subheader:first-child,.mat-selection-list[dense] .mat-subheader:first-child{margin-top:-4px}.mat-list[dense] .mat-list-item,.mat-list[dense] .mat-list-option,.mat-nav-list[dense] .mat-list-item,.mat-nav-list[dense] .mat-list-option,.mat-selection-list[dense] .mat-list-item,.mat-selection-list[dense] .mat-list-option{display:block;height:40px}.mat-list[dense] .mat-list-item .mat-list-item-content,.mat-list[dense] .mat-list-option .mat-list-item-content,.mat-nav-list[dense] .mat-list-item .mat-list-item-content,.mat-nav-list[dense] .mat-list-option .mat-list-item-content,.mat-selection-list[dense] .mat-list-item .mat-list-item-content,.mat-selection-list[dense] .mat-list-option .mat-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.mat-list[dense] .mat-list-item .mat-list-item-content-reverse,.mat-list[dense] .mat-list-option .mat-list-item-content-reverse,.mat-nav-list[dense] .mat-list-item .mat-list-item-content-reverse,.mat-nav-list[dense] .mat-list-option .mat-list-item-content-reverse,.mat-selection-list[dense] .mat-list-item .mat-list-item-content-reverse,.mat-selection-list[dense] .mat-list-option .mat-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.mat-list[dense] .mat-list-item .mat-list-item-ripple,.mat-list[dense] .mat-list-option .mat-list-item-ripple,.mat-nav-list[dense] .mat-list-item .mat-list-item-ripple,.mat-nav-list[dense] .mat-list-option .mat-list-item-ripple,.mat-selection-list[dense] .mat-list-item .mat-list-item-ripple,.mat-selection-list[dense] .mat-list-option .mat-list-item-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-list[dense] .mat-list-item.mat-list-item-avatar,.mat-list[dense] .mat-list-option.mat-list-item-avatar,.mat-nav-list[dense] .mat-list-item.mat-list-item-avatar,.mat-nav-list[dense] .mat-list-option.mat-list-item-avatar,.mat-selection-list[dense] .mat-list-item.mat-list-item-avatar,.mat-selection-list[dense] .mat-list-option.mat-list-item-avatar{height:48px}.mat-list[dense] .mat-list-item.mat-2-line,.mat-list[dense] .mat-list-option.mat-2-line,.mat-nav-list[dense] .mat-list-item.mat-2-line,.mat-nav-list[dense] .mat-list-option.mat-2-line,.mat-selection-list[dense] .mat-list-item.mat-2-line,.mat-selection-list[dense] .mat-list-option.mat-2-line{height:60px}.mat-list[dense] .mat-list-item.mat-3-line,.mat-list[dense] .mat-list-option.mat-3-line,.mat-nav-list[dense] .mat-list-item.mat-3-line,.mat-nav-list[dense] .mat-list-option.mat-3-line,.mat-selection-list[dense] .mat-list-item.mat-3-line,.mat-selection-list[dense] .mat-list-option.mat-3-line{height:76px}.mat-list[dense] .mat-list-item.mat-multi-line,.mat-list[dense] .mat-list-option.mat-multi-line,.mat-nav-list[dense] .mat-list-item.mat-multi-line,.mat-nav-list[dense] .mat-list-option.mat-multi-line,.mat-selection-list[dense] .mat-list-item.mat-multi-line,.mat-selection-list[dense] .mat-list-option.mat-multi-line{height:auto}.mat-list[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-list[dense] .mat-list-option.mat-multi-line .mat-list-item-content,.mat-nav-list[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-nav-list[dense] .mat-list-option.mat-multi-line .mat-list-item-content,.mat-selection-list[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-selection-list[dense] .mat-list-option.mat-multi-line .mat-list-item-content{padding-top:16px;padding-bottom:16px}.mat-list[dense] .mat-list-item .mat-list-text,.mat-list[dense] .mat-list-option .mat-list-text,.mat-nav-list[dense] .mat-list-item .mat-list-text,.mat-nav-list[dense] .mat-list-option .mat-list-text,.mat-selection-list[dense] .mat-list-item .mat-list-text,.mat-selection-list[dense] .mat-list-option .mat-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0 16px}.mat-list[dense] .mat-list-item .mat-list-text>*,.mat-list[dense] .mat-list-option .mat-list-text>*,.mat-nav-list[dense] .mat-list-item .mat-list-text>*,.mat-nav-list[dense] .mat-list-option .mat-list-text>*,.mat-selection-list[dense] .mat-list-item .mat-list-text>*,.mat-selection-list[dense] .mat-list-option .mat-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-list[dense] .mat-list-item .mat-list-text:empty,.mat-list[dense] .mat-list-option .mat-list-text:empty,.mat-nav-list[dense] .mat-list-item .mat-list-text:empty,.mat-nav-list[dense] .mat-list-option .mat-list-text:empty,.mat-selection-list[dense] .mat-list-item .mat-list-text:empty,.mat-selection-list[dense] .mat-list-option .mat-list-text:empty{display:none}.mat-list[dense] .mat-list-item .mat-list-text:nth-child(2),.mat-list[dense] .mat-list-option .mat-list-text:nth-child(2),.mat-nav-list[dense] .mat-list-item .mat-list-text:nth-child(2),.mat-nav-list[dense] .mat-list-option .mat-list-text:nth-child(2),.mat-selection-list[dense] .mat-list-item .mat-list-text:nth-child(2),.mat-selection-list[dense] .mat-list-option .mat-list-text:nth-child(2){padding:0}.mat-list[dense] .mat-list-item .mat-list-avatar,.mat-list[dense] .mat-list-option .mat-list-avatar,.mat-nav-list[dense] .mat-list-item .mat-list-avatar,.mat-nav-list[dense] .mat-list-option .mat-list-avatar,.mat-selection-list[dense] .mat-list-item .mat-list-avatar,.mat-selection-list[dense] .mat-list-option .mat-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%}.mat-list[dense] .mat-list-item .mat-list-icon,.mat-list[dense] .mat-list-option .mat-list-icon,.mat-nav-list[dense] .mat-list-item .mat-list-icon,.mat-nav-list[dense] .mat-list-option .mat-list-icon,.mat-selection-list[dense] .mat-list-item .mat-list-icon,.mat-selection-list[dense] .mat-list-option .mat-list-icon{width:20px;height:20px;font-size:20px;box-sizing:content-box;border-radius:50%;padding:4px}.mat-divider{display:block;border-top-style:solid;border-top-width:1px;margin:0}.mat-nav-list a{text-decoration:none;color:inherit}.mat-nav-list .mat-list-item-content{cursor:pointer}.mat-nav-list .mat-list-item-content.mat-list-item-focus,.mat-nav-list .mat-list-item-content:hover{outline:0}.mat-list-option:not([disabled]){cursor:pointer}"],
                    inputs: ['disableRipple'],
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatNavList.ctorParameters = function () { return []; };
    return MatNavList;
}(_MatListMixinBase));
var MatList = /** @class */ (function (_super) {
    __extends(MatList, _super);
    function MatList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatList.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-list',
                    exportAs: 'matList',
                    template: "<ng-content></ng-content>",
                    host: { 'class': 'mat-list' },
                    styles: [".mat-subheader{display:flex;box-sizing:border-box;padding:16px;align-items:center}.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{margin:0}.mat-list,.mat-nav-list,.mat-selection-list{padding-top:8px;display:block}.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{height:48px;line-height:16px}.mat-list .mat-subheader:first-child,.mat-nav-list .mat-subheader:first-child,.mat-selection-list .mat-subheader:first-child{margin-top:-8px}.mat-list .mat-list-item,.mat-list .mat-list-option,.mat-nav-list .mat-list-item,.mat-nav-list .mat-list-option,.mat-selection-list .mat-list-item,.mat-selection-list .mat-list-option{display:block;height:48px}.mat-list .mat-list-item .mat-list-item-content,.mat-list .mat-list-option .mat-list-item-content,.mat-nav-list .mat-list-item .mat-list-item-content,.mat-nav-list .mat-list-option .mat-list-item-content,.mat-selection-list .mat-list-item .mat-list-item-content,.mat-selection-list .mat-list-option .mat-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.mat-list .mat-list-item .mat-list-item-content-reverse,.mat-list .mat-list-option .mat-list-item-content-reverse,.mat-nav-list .mat-list-item .mat-list-item-content-reverse,.mat-nav-list .mat-list-option .mat-list-item-content-reverse,.mat-selection-list .mat-list-item .mat-list-item-content-reverse,.mat-selection-list .mat-list-option .mat-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.mat-list .mat-list-item .mat-list-item-ripple,.mat-list .mat-list-option .mat-list-item-ripple,.mat-nav-list .mat-list-item .mat-list-item-ripple,.mat-nav-list .mat-list-option .mat-list-item-ripple,.mat-selection-list .mat-list-item .mat-list-item-ripple,.mat-selection-list .mat-list-option .mat-list-item-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-list .mat-list-item.mat-list-item-avatar,.mat-list .mat-list-option.mat-list-item-avatar,.mat-nav-list .mat-list-item.mat-list-item-avatar,.mat-nav-list .mat-list-option.mat-list-item-avatar,.mat-selection-list .mat-list-item.mat-list-item-avatar,.mat-selection-list .mat-list-option.mat-list-item-avatar{height:56px}.mat-list .mat-list-item.mat-2-line,.mat-list .mat-list-option.mat-2-line,.mat-nav-list .mat-list-item.mat-2-line,.mat-nav-list .mat-list-option.mat-2-line,.mat-selection-list .mat-list-item.mat-2-line,.mat-selection-list .mat-list-option.mat-2-line{height:72px}.mat-list .mat-list-item.mat-3-line,.mat-list .mat-list-option.mat-3-line,.mat-nav-list .mat-list-item.mat-3-line,.mat-nav-list .mat-list-option.mat-3-line,.mat-selection-list .mat-list-item.mat-3-line,.mat-selection-list .mat-list-option.mat-3-line{height:88px}.mat-list .mat-list-item.mat-multi-line,.mat-list .mat-list-option.mat-multi-line,.mat-nav-list .mat-list-item.mat-multi-line,.mat-nav-list .mat-list-option.mat-multi-line,.mat-selection-list .mat-list-item.mat-multi-line,.mat-selection-list .mat-list-option.mat-multi-line{height:auto}.mat-list .mat-list-item.mat-multi-line .mat-list-item-content,.mat-list .mat-list-option.mat-multi-line .mat-list-item-content,.mat-nav-list .mat-list-item.mat-multi-line .mat-list-item-content,.mat-nav-list .mat-list-option.mat-multi-line .mat-list-item-content,.mat-selection-list .mat-list-item.mat-multi-line .mat-list-item-content,.mat-selection-list .mat-list-option.mat-multi-line .mat-list-item-content{padding-top:16px;padding-bottom:16px}.mat-list .mat-list-item .mat-list-text,.mat-list .mat-list-option .mat-list-text,.mat-nav-list .mat-list-item .mat-list-text,.mat-nav-list .mat-list-option .mat-list-text,.mat-selection-list .mat-list-item .mat-list-text,.mat-selection-list .mat-list-option .mat-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0 16px}.mat-list .mat-list-item .mat-list-text>*,.mat-list .mat-list-option .mat-list-text>*,.mat-nav-list .mat-list-item .mat-list-text>*,.mat-nav-list .mat-list-option .mat-list-text>*,.mat-selection-list .mat-list-item .mat-list-text>*,.mat-selection-list .mat-list-option .mat-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-list .mat-list-item .mat-list-text:empty,.mat-list .mat-list-option .mat-list-text:empty,.mat-nav-list .mat-list-item .mat-list-text:empty,.mat-nav-list .mat-list-option .mat-list-text:empty,.mat-selection-list .mat-list-item .mat-list-text:empty,.mat-selection-list .mat-list-option .mat-list-text:empty{display:none}.mat-list .mat-list-item .mat-list-text:nth-child(2),.mat-list .mat-list-option .mat-list-text:nth-child(2),.mat-nav-list .mat-list-item .mat-list-text:nth-child(2),.mat-nav-list .mat-list-option .mat-list-text:nth-child(2),.mat-selection-list .mat-list-item .mat-list-text:nth-child(2),.mat-selection-list .mat-list-option .mat-list-text:nth-child(2){padding:0}.mat-list .mat-list-item .mat-list-avatar,.mat-list .mat-list-option .mat-list-avatar,.mat-nav-list .mat-list-item .mat-list-avatar,.mat-nav-list .mat-list-option .mat-list-avatar,.mat-selection-list .mat-list-item .mat-list-avatar,.mat-selection-list .mat-list-option .mat-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%}.mat-list .mat-list-item .mat-list-icon,.mat-list .mat-list-option .mat-list-icon,.mat-nav-list .mat-list-item .mat-list-icon,.mat-nav-list .mat-list-option .mat-list-icon,.mat-selection-list .mat-list-item .mat-list-icon,.mat-selection-list .mat-list-option .mat-list-icon{width:24px;height:24px;font-size:24px;box-sizing:content-box;border-radius:50%;padding:4px}.mat-list[dense],.mat-nav-list[dense],.mat-selection-list[dense]{padding-top:4px;display:block}.mat-list[dense] .mat-subheader,.mat-nav-list[dense] .mat-subheader,.mat-selection-list[dense] .mat-subheader{height:40px;line-height:8px}.mat-list[dense] .mat-subheader:first-child,.mat-nav-list[dense] .mat-subheader:first-child,.mat-selection-list[dense] .mat-subheader:first-child{margin-top:-4px}.mat-list[dense] .mat-list-item,.mat-list[dense] .mat-list-option,.mat-nav-list[dense] .mat-list-item,.mat-nav-list[dense] .mat-list-option,.mat-selection-list[dense] .mat-list-item,.mat-selection-list[dense] .mat-list-option{display:block;height:40px}.mat-list[dense] .mat-list-item .mat-list-item-content,.mat-list[dense] .mat-list-option .mat-list-item-content,.mat-nav-list[dense] .mat-list-item .mat-list-item-content,.mat-nav-list[dense] .mat-list-option .mat-list-item-content,.mat-selection-list[dense] .mat-list-item .mat-list-item-content,.mat-selection-list[dense] .mat-list-option .mat-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.mat-list[dense] .mat-list-item .mat-list-item-content-reverse,.mat-list[dense] .mat-list-option .mat-list-item-content-reverse,.mat-nav-list[dense] .mat-list-item .mat-list-item-content-reverse,.mat-nav-list[dense] .mat-list-option .mat-list-item-content-reverse,.mat-selection-list[dense] .mat-list-item .mat-list-item-content-reverse,.mat-selection-list[dense] .mat-list-option .mat-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.mat-list[dense] .mat-list-item .mat-list-item-ripple,.mat-list[dense] .mat-list-option .mat-list-item-ripple,.mat-nav-list[dense] .mat-list-item .mat-list-item-ripple,.mat-nav-list[dense] .mat-list-option .mat-list-item-ripple,.mat-selection-list[dense] .mat-list-item .mat-list-item-ripple,.mat-selection-list[dense] .mat-list-option .mat-list-item-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-list[dense] .mat-list-item.mat-list-item-avatar,.mat-list[dense] .mat-list-option.mat-list-item-avatar,.mat-nav-list[dense] .mat-list-item.mat-list-item-avatar,.mat-nav-list[dense] .mat-list-option.mat-list-item-avatar,.mat-selection-list[dense] .mat-list-item.mat-list-item-avatar,.mat-selection-list[dense] .mat-list-option.mat-list-item-avatar{height:48px}.mat-list[dense] .mat-list-item.mat-2-line,.mat-list[dense] .mat-list-option.mat-2-line,.mat-nav-list[dense] .mat-list-item.mat-2-line,.mat-nav-list[dense] .mat-list-option.mat-2-line,.mat-selection-list[dense] .mat-list-item.mat-2-line,.mat-selection-list[dense] .mat-list-option.mat-2-line{height:60px}.mat-list[dense] .mat-list-item.mat-3-line,.mat-list[dense] .mat-list-option.mat-3-line,.mat-nav-list[dense] .mat-list-item.mat-3-line,.mat-nav-list[dense] .mat-list-option.mat-3-line,.mat-selection-list[dense] .mat-list-item.mat-3-line,.mat-selection-list[dense] .mat-list-option.mat-3-line{height:76px}.mat-list[dense] .mat-list-item.mat-multi-line,.mat-list[dense] .mat-list-option.mat-multi-line,.mat-nav-list[dense] .mat-list-item.mat-multi-line,.mat-nav-list[dense] .mat-list-option.mat-multi-line,.mat-selection-list[dense] .mat-list-item.mat-multi-line,.mat-selection-list[dense] .mat-list-option.mat-multi-line{height:auto}.mat-list[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-list[dense] .mat-list-option.mat-multi-line .mat-list-item-content,.mat-nav-list[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-nav-list[dense] .mat-list-option.mat-multi-line .mat-list-item-content,.mat-selection-list[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-selection-list[dense] .mat-list-option.mat-multi-line .mat-list-item-content{padding-top:16px;padding-bottom:16px}.mat-list[dense] .mat-list-item .mat-list-text,.mat-list[dense] .mat-list-option .mat-list-text,.mat-nav-list[dense] .mat-list-item .mat-list-text,.mat-nav-list[dense] .mat-list-option .mat-list-text,.mat-selection-list[dense] .mat-list-item .mat-list-text,.mat-selection-list[dense] .mat-list-option .mat-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0 16px}.mat-list[dense] .mat-list-item .mat-list-text>*,.mat-list[dense] .mat-list-option .mat-list-text>*,.mat-nav-list[dense] .mat-list-item .mat-list-text>*,.mat-nav-list[dense] .mat-list-option .mat-list-text>*,.mat-selection-list[dense] .mat-list-item .mat-list-text>*,.mat-selection-list[dense] .mat-list-option .mat-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-list[dense] .mat-list-item .mat-list-text:empty,.mat-list[dense] .mat-list-option .mat-list-text:empty,.mat-nav-list[dense] .mat-list-item .mat-list-text:empty,.mat-nav-list[dense] .mat-list-option .mat-list-text:empty,.mat-selection-list[dense] .mat-list-item .mat-list-text:empty,.mat-selection-list[dense] .mat-list-option .mat-list-text:empty{display:none}.mat-list[dense] .mat-list-item .mat-list-text:nth-child(2),.mat-list[dense] .mat-list-option .mat-list-text:nth-child(2),.mat-nav-list[dense] .mat-list-item .mat-list-text:nth-child(2),.mat-nav-list[dense] .mat-list-option .mat-list-text:nth-child(2),.mat-selection-list[dense] .mat-list-item .mat-list-text:nth-child(2),.mat-selection-list[dense] .mat-list-option .mat-list-text:nth-child(2){padding:0}.mat-list[dense] .mat-list-item .mat-list-avatar,.mat-list[dense] .mat-list-option .mat-list-avatar,.mat-nav-list[dense] .mat-list-item .mat-list-avatar,.mat-nav-list[dense] .mat-list-option .mat-list-avatar,.mat-selection-list[dense] .mat-list-item .mat-list-avatar,.mat-selection-list[dense] .mat-list-option .mat-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%}.mat-list[dense] .mat-list-item .mat-list-icon,.mat-list[dense] .mat-list-option .mat-list-icon,.mat-nav-list[dense] .mat-list-item .mat-list-icon,.mat-nav-list[dense] .mat-list-option .mat-list-icon,.mat-selection-list[dense] .mat-list-item .mat-list-icon,.mat-selection-list[dense] .mat-list-option .mat-list-icon{width:20px;height:20px;font-size:20px;box-sizing:content-box;border-radius:50%;padding:4px}.mat-divider{display:block;border-top-style:solid;border-top-width:1px;margin:0}.mat-nav-list a{text-decoration:none;color:inherit}.mat-nav-list .mat-list-item-content{cursor:pointer}.mat-nav-list .mat-list-item-content.mat-list-item-focus,.mat-nav-list .mat-list-item-content:hover{outline:0}.mat-list-option:not([disabled]){cursor:pointer}"],
                    inputs: ['disableRipple'],
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatList.ctorParameters = function () { return []; };
    return MatList;
}(_MatListMixinBase));
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * \@docs-private
 */
var MatDividerCssMatStyler = /** @class */ (function () {
    function MatDividerCssMatStyler() {
    }
    MatDividerCssMatStyler.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: 'mat-divider',
                    host: { 'class': 'mat-divider' }
                },] },
    ];
    /** @nocollapse */
    MatDividerCssMatStyler.ctorParameters = function () { return []; };
    return MatDividerCssMatStyler;
}());
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * \@docs-private
 */
var MatListAvatarCssMatStyler = /** @class */ (function () {
    function MatListAvatarCssMatStyler() {
    }
    MatListAvatarCssMatStyler.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[mat-list-avatar], [matListAvatar]',
                    host: { 'class': 'mat-list-avatar' }
                },] },
    ];
    /** @nocollapse */
    MatListAvatarCssMatStyler.ctorParameters = function () { return []; };
    return MatListAvatarCssMatStyler;
}());
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * \@docs-private
 */
var MatListIconCssMatStyler = /** @class */ (function () {
    function MatListIconCssMatStyler() {
    }
    MatListIconCssMatStyler.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[mat-list-icon], [matListIcon]',
                    host: { 'class': 'mat-list-icon' }
                },] },
    ];
    /** @nocollapse */
    MatListIconCssMatStyler.ctorParameters = function () { return []; };
    return MatListIconCssMatStyler;
}());
/**
 * Directive whose purpose is to add the mat- CSS styling to this selector.
 * \@docs-private
 */
var MatListSubheaderCssMatStyler = /** @class */ (function () {
    function MatListSubheaderCssMatStyler() {
    }
    MatListSubheaderCssMatStyler.decorators = [
        { type: _angular_core.Directive, args: [{
                    selector: '[mat-subheader], [matSubheader]',
                    host: { 'class': 'mat-subheader' }
                },] },
    ];
    /** @nocollapse */
    MatListSubheaderCssMatStyler.ctorParameters = function () { return []; };
    return MatListSubheaderCssMatStyler;
}());
/**
 * An item within a Material Design list.
 */
var MatListItem = /** @class */ (function (_super) {
    __extends(MatListItem, _super);
    function MatListItem(_element, _navList) {
        var _this = _super.call(this) || this;
        _this._element = _element;
        _this._navList = _navList;
        _this._isNavList = false;
        _this._isNavList = !!_navList;
        return _this;
    }
    Object.defineProperty(MatListItem.prototype, "_hasAvatar", {
        set: /**
         * @param {?} avatar
         * @return {?}
         */
        function (avatar) {
            if (avatar != null) {
                this._element.nativeElement.classList.add('mat-list-item-avatar');
            }
            else {
                this._element.nativeElement.classList.remove('mat-list-item-avatar');
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatListItem.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._lineSetter = new _angular_material_core.MatLineSetter(this._lines, this._element);
    };
    /** Whether this list item should show a ripple effect when clicked.  */
    /**
     * Whether this list item should show a ripple effect when clicked.
     * @return {?}
     */
    MatListItem.prototype._isRippleDisabled = /**
     * Whether this list item should show a ripple effect when clicked.
     * @return {?}
     */
    function () {
        return !this._isNavList || this.disableRipple || this._navList.disableRipple;
    };
    /**
     * @return {?}
     */
    MatListItem.prototype._handleFocus = /**
     * @return {?}
     */
    function () {
        this._element.nativeElement.classList.add('mat-list-item-focus');
    };
    /**
     * @return {?}
     */
    MatListItem.prototype._handleBlur = /**
     * @return {?}
     */
    function () {
        this._element.nativeElement.classList.remove('mat-list-item-focus');
    };
    /** Retrieves the DOM element of the component host. */
    /**
     * Retrieves the DOM element of the component host.
     * @return {?}
     */
    MatListItem.prototype._getHostElement = /**
     * Retrieves the DOM element of the component host.
     * @return {?}
     */
    function () {
        return this._element.nativeElement;
    };
    MatListItem.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-list-item, a[mat-list-item]',
                    exportAs: 'matListItem',
                    host: {
                        'class': 'mat-list-item',
                        '(focus)': '_handleFocus()',
                        '(blur)': '_handleBlur()',
                    },
                    inputs: ['disableRipple'],
                    template: "<div class=\"mat-list-item-content\"><div class=\"mat-list-item-ripple\" mat-ripple [matRippleTrigger]=\"_getHostElement()\" [matRippleDisabled]=\"_isRippleDisabled()\"></div><ng-content select=\"[mat-list-avatar], [mat-list-icon], [matListAvatar], [matListIcon]\"></ng-content><div class=\"mat-list-text\"><ng-content select=\"[mat-line], [matLine]\"></ng-content></div><ng-content></ng-content></div>",
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatListItem.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: MatNavList, decorators: [{ type: _angular_core.Optional },] },
    ]; };
    MatListItem.propDecorators = {
        "_lines": [{ type: _angular_core.ContentChildren, args: [_angular_material_core.MatLine,] },],
        "_hasAvatar": [{ type: _angular_core.ContentChild, args: [MatListAvatarCssMatStyler,] },],
    };
    return MatListItem;
}(_MatListItemMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * \@docs-private
 */
var MatSelectionListBase = /** @class */ (function () {
    function MatSelectionListBase() {
    }
    return MatSelectionListBase;
}());
var _MatSelectionListMixinBase = _angular_material_core.mixinTabIndex(_angular_material_core.mixinDisableRipple(_angular_material_core.mixinDisabled(MatSelectionListBase)));
/**
 * \@docs-private
 */
var MatListOptionBase = /** @class */ (function () {
    function MatListOptionBase() {
    }
    return MatListOptionBase;
}());
var _MatListOptionMixinBase = _angular_material_core.mixinDisableRipple(MatListOptionBase);
/**
 * \@docs-private
 */
var MAT_SELECTION_LIST_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return MatSelectionList; }),
    multi: true
};
/**
 * Change event object emitted by MatListOption whenever the selected state changes.
 * @deprecated Use the `MatSelectionListChange` event on the selection list instead.
 */
var MatListOptionChange = /** @class */ (function () {
    function MatListOptionChange(source, selected) {
        this.source = source;
        this.selected = selected;
    }
    return MatListOptionChange;
}());
/**
 * Change event that is being fired whenever the selected state of an option changes.
 */
var MatSelectionListChange = /** @class */ (function () {
    function MatSelectionListChange(source, option) {
        this.source = source;
        this.option = option;
    }
    return MatSelectionListChange;
}());
/**
 * Component for list-options of selection-list. Each list-option can automatically
 * generate a checkbox and can put current item into the selectionModel of selection-list
 * if the current item is selected.
 */
var MatListOption = /** @class */ (function (_super) {
    __extends(MatListOption, _super);
    function MatListOption(_element, _changeDetector, selectionList) {
        var _this = _super.call(this) || this;
        _this._element = _element;
        _this._changeDetector = _changeDetector;
        _this.selectionList = selectionList;
        _this._selected = false;
        _this._disabled = false;
        /**
         * Whether the option has focus.
         */
        _this._hasFocus = false;
        /**
         * Whether the label should appear before or after the checkbox. Defaults to 'after'
         */
        _this.checkboxPosition = 'after';
        /**
         * Emits a change event whenever the selected state of an option changes.
         * @deprecated Use the `selectionChange` event on the `<mat-selection-list>` instead.
         */
        _this.selectionChange = new _angular_core.EventEmitter();
        return _this;
    }
    Object.defineProperty(MatListOption.prototype, "disabled", {
        get: /**
         * Whether the option is disabled.
         * @return {?}
         */
        function () { return (this.selectionList && this.selectionList.disabled) || this._disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var /** @type {?} */ newValue = _angular_cdk_coercion.coerceBooleanProperty(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                this._changeDetector.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatListOption.prototype, "selected", {
        get: /**
         * Whether the option is selected.
         * @return {?}
         */
        function () { return this.selectionList.selectedOptions.isSelected(this); },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var /** @type {?} */ isSelected = _angular_cdk_coercion.coerceBooleanProperty(value);
            if (isSelected !== this._selected) {
                this._setSelected(isSelected);
                this.selectionList._reportValueChange();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatListOption.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._selected) {
            // List options that are selected at initialization can't be reported properly to the form
            // control. This is because it takes some time until the selection-list knows about all
            // available options. Also it can happen that the ControlValueAccessor has an initial value
            // that should be used instead. Deferring the value change report to the next tick ensures
            // that the form control value is not being overwritten.
            Promise.resolve().then(function () { return _this.selected = true; });
        }
    };
    /**
     * @return {?}
     */
    MatListOption.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._lineSetter = new _angular_material_core.MatLineSetter(this._lines, this._element);
    };
    /**
     * @return {?}
     */
    MatListOption.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.selected) {
            // We have to delay this until the next tick in order
            // to avoid changed after checked errors.
            Promise.resolve().then(function () { return _this.selected = false; });
        }
        this.selectionList._removeOptionFromList(this);
    };
    /** Toggles the selection state of the option. */
    /**
     * Toggles the selection state of the option.
     * @return {?}
     */
    MatListOption.prototype.toggle = /**
     * Toggles the selection state of the option.
     * @return {?}
     */
    function () {
        this.selected = !this.selected;
    };
    /** Allows for programmatic focusing of the option. */
    /**
     * Allows for programmatic focusing of the option.
     * @return {?}
     */
    MatListOption.prototype.focus = /**
     * Allows for programmatic focusing of the option.
     * @return {?}
     */
    function () {
        this._element.nativeElement.focus();
    };
    /**
     * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
     * @docs-private
     */
    /**
     * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
     * \@docs-private
     * @return {?}
     */
    MatListOption.prototype.getLabel = /**
     * Returns the list item's text label. Implemented as a part of the FocusKeyManager.
     * \@docs-private
     * @return {?}
     */
    function () {
        return this._text ? this._text.nativeElement.textContent : '';
    };
    /** Whether this list item should show a ripple effect when clicked.  */
    /**
     * Whether this list item should show a ripple effect when clicked.
     * @return {?}
     */
    MatListOption.prototype._isRippleDisabled = /**
     * Whether this list item should show a ripple effect when clicked.
     * @return {?}
     */
    function () {
        return this.disabled || this.disableRipple || this.selectionList.disableRipple;
    };
    /**
     * @return {?}
     */
    MatListOption.prototype._handleClick = /**
     * @return {?}
     */
    function () {
        if (!this.disabled) {
            this.toggle();
            // Emit a change event if the selected state of the option changed through user interaction.
            this.selectionList._emitChangeEvent(this);
            // TODO: the `selectionChange` event on the option is deprecated. Remove that in the future.
            this._emitDeprecatedChangeEvent();
        }
    };
    /**
     * @return {?}
     */
    MatListOption.prototype._handleFocus = /**
     * @return {?}
     */
    function () {
        this._hasFocus = true;
        this.selectionList._setFocusedOption(this);
    };
    /**
     * @return {?}
     */
    MatListOption.prototype._handleBlur = /**
     * @return {?}
     */
    function () {
        this._hasFocus = false;
        this.selectionList.onTouched();
    };
    /** Retrieves the DOM element of the component host. */
    /**
     * Retrieves the DOM element of the component host.
     * @return {?}
     */
    MatListOption.prototype._getHostElement = /**
     * Retrieves the DOM element of the component host.
     * @return {?}
     */
    function () {
        return this._element.nativeElement;
    };
    /** Sets the selected state of the option. */
    /**
     * Sets the selected state of the option.
     * @param {?} selected
     * @return {?}
     */
    MatListOption.prototype._setSelected = /**
     * Sets the selected state of the option.
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        if (selected === this._selected) {
            return;
        }
        this._selected = selected;
        if (selected) {
            this.selectionList.selectedOptions.select(this);
        }
        else {
            this.selectionList.selectedOptions.deselect(this);
        }
        this._changeDetector.markForCheck();
    };
    /** Emits a selectionChange event for this option. */
    /**
     * Emits a selectionChange event for this option.
     * @return {?}
     */
    MatListOption.prototype._emitDeprecatedChangeEvent = /**
     * Emits a selectionChange event for this option.
     * @return {?}
     */
    function () {
        // TODO: the `selectionChange` event on the option is deprecated. Remove that in the future.
        this.selectionChange.emit(new MatListOptionChange(this, this.selected));
    };
    MatListOption.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-list-option',
                    exportAs: 'matListOption',
                    inputs: ['disableRipple'],
                    host: {
                        'role': 'option',
                        'class': 'mat-list-item mat-list-option',
                        '(focus)': '_handleFocus()',
                        '(blur)': '_handleBlur()',
                        '(click)': '_handleClick()',
                        'tabindex': '-1',
                        '[class.mat-list-item-disabled]': 'disabled',
                        '[class.mat-list-item-focus]': '_hasFocus',
                        '[attr.aria-selected]': 'selected.toString()',
                        '[attr.aria-disabled]': 'disabled.toString()',
                    },
                    template: "<div class=\"mat-list-item-content\" [class.mat-list-item-content-reverse]=\"checkboxPosition == 'after'\" [class.mat-list-item-disabled]=\"disabled\"><div mat-ripple class=\"mat-list-item-ripple\" [matRippleTrigger]=\"_getHostElement()\" [matRippleDisabled]=\"_isRippleDisabled()\"></div><mat-pseudo-checkbox [state]=\"selected ? 'checked' : 'unchecked'\" [disabled]=\"disabled\"></mat-pseudo-checkbox><div class=\"mat-list-text\" #text><ng-content></ng-content></div></div>",
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    MatListOption.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: _angular_core.ChangeDetectorRef, },
        { type: MatSelectionList, decorators: [{ type: _angular_core.Optional }, { type: _angular_core.Inject, args: [_angular_core.forwardRef(function () { return MatSelectionList; }),] },] },
    ]; };
    MatListOption.propDecorators = {
        "_lines": [{ type: _angular_core.ContentChildren, args: [_angular_material_core.MatLine,] },],
        "_text": [{ type: _angular_core.ViewChild, args: ['text',] },],
        "checkboxPosition": [{ type: _angular_core.Input },],
        "value": [{ type: _angular_core.Input },],
        "disabled": [{ type: _angular_core.Input },],
        "selected": [{ type: _angular_core.Input },],
        "selectionChange": [{ type: _angular_core.Output },],
    };
    return MatListOption;
}(_MatListOptionMixinBase));
/**
 * Material Design list component where each item is a selectable option. Behaves as a listbox.
 */
var MatSelectionList = /** @class */ (function (_super) {
    __extends(MatSelectionList, _super);
    function MatSelectionList(_element, tabIndex) {
        var _this = _super.call(this) || this;
        _this._element = _element;
        /**
         * Emits a change event whenever the selected state of an option changes.
         */
        _this.selectionChange = new _angular_core.EventEmitter();
        /**
         * The currently selected options.
         */
        _this.selectedOptions = new _angular_cdk_collections.SelectionModel(true);
        /**
         * View to model callback that should be called whenever the selected options change.
         */
        _this._onChange = function (_) { };
        /**
         * View to model callback that should be called if the list or its options lost focus.
         */
        _this.onTouched = function () { };
        _this.tabIndex = parseInt(tabIndex) || 0;
        return _this;
    }
    /**
     * @return {?}
     */
    MatSelectionList.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._keyManager = new _angular_cdk_a11y.FocusKeyManager(this.options).withWrap().withTypeAhead();
        if (this._tempValues) {
            this._setOptionsFromValues(this._tempValues);
            this._tempValues = null;
        }
    };
    /** Focus the selection-list. */
    /**
     * Focus the selection-list.
     * @return {?}
     */
    MatSelectionList.prototype.focus = /**
     * Focus the selection-list.
     * @return {?}
     */
    function () {
        this._element.nativeElement.focus();
    };
    /** Selects all of the options. */
    /**
     * Selects all of the options.
     * @return {?}
     */
    MatSelectionList.prototype.selectAll = /**
     * Selects all of the options.
     * @return {?}
     */
    function () {
        this.options.forEach(function (option) { return option._setSelected(true); });
        this._reportValueChange();
    };
    /** Deselects all of the options. */
    /**
     * Deselects all of the options.
     * @return {?}
     */
    MatSelectionList.prototype.deselectAll = /**
     * Deselects all of the options.
     * @return {?}
     */
    function () {
        this.options.forEach(function (option) { return option._setSelected(false); });
        this._reportValueChange();
    };
    /** Sets the focused option of the selection-list. */
    /**
     * Sets the focused option of the selection-list.
     * @param {?} option
     * @return {?}
     */
    MatSelectionList.prototype._setFocusedOption = /**
     * Sets the focused option of the selection-list.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this._keyManager.updateActiveItemIndex(this._getOptionIndex(option));
    };
    /** Removes an option from the selection list and updates the active item. */
    /**
     * Removes an option from the selection list and updates the active item.
     * @param {?} option
     * @return {?}
     */
    MatSelectionList.prototype._removeOptionFromList = /**
     * Removes an option from the selection list and updates the active item.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        if (option._hasFocus) {
            var /** @type {?} */ optionIndex = this._getOptionIndex(option);
            // Check whether the option is the last item
            if (optionIndex > 0) {
                this._keyManager.setPreviousItemActive();
            }
            else if (optionIndex === 0 && this.options.length > 1) {
                this._keyManager.setNextItemActive();
            }
        }
    };
    /** Passes relevant key presses to our key manager. */
    /**
     * Passes relevant key presses to our key manager.
     * @param {?} event
     * @return {?}
     */
    MatSelectionList.prototype._keydown = /**
     * Passes relevant key presses to our key manager.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        switch (event.keyCode) {
            case _angular_cdk_keycodes.SPACE:
            case _angular_cdk_keycodes.ENTER:
                this._toggleSelectOnFocusedOption();
                // Always prevent space from scrolling the page since the list has focus
                event.preventDefault();
                break;
            case _angular_cdk_keycodes.HOME:
            case _angular_cdk_keycodes.END:
                event.keyCode === _angular_cdk_keycodes.HOME ? this._keyManager.setFirstItemActive() :
                    this._keyManager.setLastItemActive();
                event.preventDefault();
                break;
            default:
                this._keyManager.onKeydown(event);
        }
    };
    /** Reports a value change to the ControlValueAccessor */
    /**
     * Reports a value change to the ControlValueAccessor
     * @return {?}
     */
    MatSelectionList.prototype._reportValueChange = /**
     * Reports a value change to the ControlValueAccessor
     * @return {?}
     */
    function () {
        if (this.options) {
            this._onChange(this._getSelectedOptionValues());
        }
    };
    /** Emits a change event if the selected state of an option changed. */
    /**
     * Emits a change event if the selected state of an option changed.
     * @param {?} option
     * @return {?}
     */
    MatSelectionList.prototype._emitChangeEvent = /**
     * Emits a change event if the selected state of an option changed.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        this.selectionChange.emit(new MatSelectionListChange(this, option));
    };
    /** Implemented as part of ControlValueAccessor. */
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} values
     * @return {?}
     */
    MatSelectionList.prototype.writeValue = /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} values
     * @return {?}
     */
    function (values) {
        if (this.options) {
            this._setOptionsFromValues(values || []);
        }
        else {
            this._tempValues = values;
        }
    };
    /** Implemented as a part of ControlValueAccessor. */
    /**
     * Implemented as a part of ControlValueAccessor.
     * @param {?} isDisabled
     * @return {?}
     */
    MatSelectionList.prototype.setDisabledState = /**
     * Implemented as a part of ControlValueAccessor.
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        if (this.options) {
            this.options.forEach(function (option) { return option.disabled = isDisabled; });
        }
    };
    /** Implemented as part of ControlValueAccessor. */
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    MatSelectionList.prototype.registerOnChange = /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChange = fn;
    };
    /** Implemented as part of ControlValueAccessor. */
    /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    MatSelectionList.prototype.registerOnTouched = /**
     * Implemented as part of ControlValueAccessor.
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * Returns the option with the specified value.
     * @param {?} value
     * @return {?}
     */
    MatSelectionList.prototype._getOptionByValue = /**
     * Returns the option with the specified value.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this.options.find(function (option) { return option.value === value; });
    };
    /**
     * Sets the selected options based on the specified values.
     * @param {?} values
     * @return {?}
     */
    MatSelectionList.prototype._setOptionsFromValues = /**
     * Sets the selected options based on the specified values.
     * @param {?} values
     * @return {?}
     */
    function (values) {
        var _this = this;
        this.options.forEach(function (option) { return option._setSelected(false); });
        values
            .map(function (value) { return _this._getOptionByValue(value); })
            .filter(Boolean)
            .forEach(function (option) { return ((option))._setSelected(true); });
    };
    /**
     * Returns the values of the selected options.
     * @return {?}
     */
    MatSelectionList.prototype._getSelectedOptionValues = /**
     * Returns the values of the selected options.
     * @return {?}
     */
    function () {
        return this.options.filter(function (option) { return option.selected; }).map(function (option) { return option.value; });
    };
    /**
     * Toggles the selected state of the currently focused option.
     * @return {?}
     */
    MatSelectionList.prototype._toggleSelectOnFocusedOption = /**
     * Toggles the selected state of the currently focused option.
     * @return {?}
     */
    function () {
        var /** @type {?} */ focusedIndex = this._keyManager.activeItemIndex;
        if (focusedIndex != null && this._isValidIndex(focusedIndex)) {
            var /** @type {?} */ focusedOption = this.options.toArray()[focusedIndex];
            if (focusedOption) {
                focusedOption.toggle();
                // Emit a change event because the focused option changed its state through user
                // interaction.
                this._emitChangeEvent(focusedOption);
                // TODO: the `selectionChange` event on the option is deprecated. Remove that in the future.
                focusedOption._emitDeprecatedChangeEvent();
            }
        }
    };
    /**
     * Utility to ensure all indexes are valid.
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of options.
     */
    MatSelectionList.prototype._isValidIndex = /**
     * Utility to ensure all indexes are valid.
     * @param {?} index The index to be checked.
     * @return {?} True if the index is valid for our list of options.
     */
    function (index) {
        return index >= 0 && index < this.options.length;
    };
    /**
     * Returns the index of the specified list option.
     * @param {?} option
     * @return {?}
     */
    MatSelectionList.prototype._getOptionIndex = /**
     * Returns the index of the specified list option.
     * @param {?} option
     * @return {?}
     */
    function (option) {
        return this.options.toArray().indexOf(option);
    };
    MatSelectionList.decorators = [
        { type: _angular_core.Component, args: [{selector: 'mat-selection-list',
                    exportAs: 'matSelectionList',
                    inputs: ['disabled', 'disableRipple', 'tabIndex'],
                    host: {
                        'role': 'listbox',
                        '[tabIndex]': 'tabIndex',
                        'class': 'mat-selection-list',
                        '(focus)': 'focus()',
                        '(blur)': 'onTouched()',
                        '(keydown)': '_keydown($event)',
                        '[attr.aria-disabled]': 'disabled.toString()'
                    },
                    template: '<ng-content></ng-content>',
                    styles: [".mat-subheader{display:flex;box-sizing:border-box;padding:16px;align-items:center}.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{margin:0}.mat-list,.mat-nav-list,.mat-selection-list{padding-top:8px;display:block}.mat-list .mat-subheader,.mat-nav-list .mat-subheader,.mat-selection-list .mat-subheader{height:48px;line-height:16px}.mat-list .mat-subheader:first-child,.mat-nav-list .mat-subheader:first-child,.mat-selection-list .mat-subheader:first-child{margin-top:-8px}.mat-list .mat-list-item,.mat-list .mat-list-option,.mat-nav-list .mat-list-item,.mat-nav-list .mat-list-option,.mat-selection-list .mat-list-item,.mat-selection-list .mat-list-option{display:block;height:48px}.mat-list .mat-list-item .mat-list-item-content,.mat-list .mat-list-option .mat-list-item-content,.mat-nav-list .mat-list-item .mat-list-item-content,.mat-nav-list .mat-list-option .mat-list-item-content,.mat-selection-list .mat-list-item .mat-list-item-content,.mat-selection-list .mat-list-option .mat-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.mat-list .mat-list-item .mat-list-item-content-reverse,.mat-list .mat-list-option .mat-list-item-content-reverse,.mat-nav-list .mat-list-item .mat-list-item-content-reverse,.mat-nav-list .mat-list-option .mat-list-item-content-reverse,.mat-selection-list .mat-list-item .mat-list-item-content-reverse,.mat-selection-list .mat-list-option .mat-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.mat-list .mat-list-item .mat-list-item-ripple,.mat-list .mat-list-option .mat-list-item-ripple,.mat-nav-list .mat-list-item .mat-list-item-ripple,.mat-nav-list .mat-list-option .mat-list-item-ripple,.mat-selection-list .mat-list-item .mat-list-item-ripple,.mat-selection-list .mat-list-option .mat-list-item-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-list .mat-list-item.mat-list-item-avatar,.mat-list .mat-list-option.mat-list-item-avatar,.mat-nav-list .mat-list-item.mat-list-item-avatar,.mat-nav-list .mat-list-option.mat-list-item-avatar,.mat-selection-list .mat-list-item.mat-list-item-avatar,.mat-selection-list .mat-list-option.mat-list-item-avatar{height:56px}.mat-list .mat-list-item.mat-2-line,.mat-list .mat-list-option.mat-2-line,.mat-nav-list .mat-list-item.mat-2-line,.mat-nav-list .mat-list-option.mat-2-line,.mat-selection-list .mat-list-item.mat-2-line,.mat-selection-list .mat-list-option.mat-2-line{height:72px}.mat-list .mat-list-item.mat-3-line,.mat-list .mat-list-option.mat-3-line,.mat-nav-list .mat-list-item.mat-3-line,.mat-nav-list .mat-list-option.mat-3-line,.mat-selection-list .mat-list-item.mat-3-line,.mat-selection-list .mat-list-option.mat-3-line{height:88px}.mat-list .mat-list-item.mat-multi-line,.mat-list .mat-list-option.mat-multi-line,.mat-nav-list .mat-list-item.mat-multi-line,.mat-nav-list .mat-list-option.mat-multi-line,.mat-selection-list .mat-list-item.mat-multi-line,.mat-selection-list .mat-list-option.mat-multi-line{height:auto}.mat-list .mat-list-item.mat-multi-line .mat-list-item-content,.mat-list .mat-list-option.mat-multi-line .mat-list-item-content,.mat-nav-list .mat-list-item.mat-multi-line .mat-list-item-content,.mat-nav-list .mat-list-option.mat-multi-line .mat-list-item-content,.mat-selection-list .mat-list-item.mat-multi-line .mat-list-item-content,.mat-selection-list .mat-list-option.mat-multi-line .mat-list-item-content{padding-top:16px;padding-bottom:16px}.mat-list .mat-list-item .mat-list-text,.mat-list .mat-list-option .mat-list-text,.mat-nav-list .mat-list-item .mat-list-text,.mat-nav-list .mat-list-option .mat-list-text,.mat-selection-list .mat-list-item .mat-list-text,.mat-selection-list .mat-list-option .mat-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0 16px}.mat-list .mat-list-item .mat-list-text>*,.mat-list .mat-list-option .mat-list-text>*,.mat-nav-list .mat-list-item .mat-list-text>*,.mat-nav-list .mat-list-option .mat-list-text>*,.mat-selection-list .mat-list-item .mat-list-text>*,.mat-selection-list .mat-list-option .mat-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-list .mat-list-item .mat-list-text:empty,.mat-list .mat-list-option .mat-list-text:empty,.mat-nav-list .mat-list-item .mat-list-text:empty,.mat-nav-list .mat-list-option .mat-list-text:empty,.mat-selection-list .mat-list-item .mat-list-text:empty,.mat-selection-list .mat-list-option .mat-list-text:empty{display:none}.mat-list .mat-list-item .mat-list-text:nth-child(2),.mat-list .mat-list-option .mat-list-text:nth-child(2),.mat-nav-list .mat-list-item .mat-list-text:nth-child(2),.mat-nav-list .mat-list-option .mat-list-text:nth-child(2),.mat-selection-list .mat-list-item .mat-list-text:nth-child(2),.mat-selection-list .mat-list-option .mat-list-text:nth-child(2){padding:0}.mat-list .mat-list-item .mat-list-avatar,.mat-list .mat-list-option .mat-list-avatar,.mat-nav-list .mat-list-item .mat-list-avatar,.mat-nav-list .mat-list-option .mat-list-avatar,.mat-selection-list .mat-list-item .mat-list-avatar,.mat-selection-list .mat-list-option .mat-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%}.mat-list .mat-list-item .mat-list-icon,.mat-list .mat-list-option .mat-list-icon,.mat-nav-list .mat-list-item .mat-list-icon,.mat-nav-list .mat-list-option .mat-list-icon,.mat-selection-list .mat-list-item .mat-list-icon,.mat-selection-list .mat-list-option .mat-list-icon{width:24px;height:24px;font-size:24px;box-sizing:content-box;border-radius:50%;padding:4px}.mat-list[dense],.mat-nav-list[dense],.mat-selection-list[dense]{padding-top:4px;display:block}.mat-list[dense] .mat-subheader,.mat-nav-list[dense] .mat-subheader,.mat-selection-list[dense] .mat-subheader{height:40px;line-height:8px}.mat-list[dense] .mat-subheader:first-child,.mat-nav-list[dense] .mat-subheader:first-child,.mat-selection-list[dense] .mat-subheader:first-child{margin-top:-4px}.mat-list[dense] .mat-list-item,.mat-list[dense] .mat-list-option,.mat-nav-list[dense] .mat-list-item,.mat-nav-list[dense] .mat-list-option,.mat-selection-list[dense] .mat-list-item,.mat-selection-list[dense] .mat-list-option{display:block;height:40px}.mat-list[dense] .mat-list-item .mat-list-item-content,.mat-list[dense] .mat-list-option .mat-list-item-content,.mat-nav-list[dense] .mat-list-item .mat-list-item-content,.mat-nav-list[dense] .mat-list-option .mat-list-item-content,.mat-selection-list[dense] .mat-list-item .mat-list-item-content,.mat-selection-list[dense] .mat-list-option .mat-list-item-content{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;padding:0 16px;position:relative;height:inherit}.mat-list[dense] .mat-list-item .mat-list-item-content-reverse,.mat-list[dense] .mat-list-option .mat-list-item-content-reverse,.mat-nav-list[dense] .mat-list-item .mat-list-item-content-reverse,.mat-nav-list[dense] .mat-list-option .mat-list-item-content-reverse,.mat-selection-list[dense] .mat-list-item .mat-list-item-content-reverse,.mat-selection-list[dense] .mat-list-option .mat-list-item-content-reverse{display:flex;align-items:center;padding:0 16px;flex-direction:row-reverse;justify-content:space-around}.mat-list[dense] .mat-list-item .mat-list-item-ripple,.mat-list[dense] .mat-list-option .mat-list-item-ripple,.mat-nav-list[dense] .mat-list-item .mat-list-item-ripple,.mat-nav-list[dense] .mat-list-option .mat-list-item-ripple,.mat-selection-list[dense] .mat-list-item .mat-list-item-ripple,.mat-selection-list[dense] .mat-list-option .mat-list-item-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-list[dense] .mat-list-item.mat-list-item-avatar,.mat-list[dense] .mat-list-option.mat-list-item-avatar,.mat-nav-list[dense] .mat-list-item.mat-list-item-avatar,.mat-nav-list[dense] .mat-list-option.mat-list-item-avatar,.mat-selection-list[dense] .mat-list-item.mat-list-item-avatar,.mat-selection-list[dense] .mat-list-option.mat-list-item-avatar{height:48px}.mat-list[dense] .mat-list-item.mat-2-line,.mat-list[dense] .mat-list-option.mat-2-line,.mat-nav-list[dense] .mat-list-item.mat-2-line,.mat-nav-list[dense] .mat-list-option.mat-2-line,.mat-selection-list[dense] .mat-list-item.mat-2-line,.mat-selection-list[dense] .mat-list-option.mat-2-line{height:60px}.mat-list[dense] .mat-list-item.mat-3-line,.mat-list[dense] .mat-list-option.mat-3-line,.mat-nav-list[dense] .mat-list-item.mat-3-line,.mat-nav-list[dense] .mat-list-option.mat-3-line,.mat-selection-list[dense] .mat-list-item.mat-3-line,.mat-selection-list[dense] .mat-list-option.mat-3-line{height:76px}.mat-list[dense] .mat-list-item.mat-multi-line,.mat-list[dense] .mat-list-option.mat-multi-line,.mat-nav-list[dense] .mat-list-item.mat-multi-line,.mat-nav-list[dense] .mat-list-option.mat-multi-line,.mat-selection-list[dense] .mat-list-item.mat-multi-line,.mat-selection-list[dense] .mat-list-option.mat-multi-line{height:auto}.mat-list[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-list[dense] .mat-list-option.mat-multi-line .mat-list-item-content,.mat-nav-list[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-nav-list[dense] .mat-list-option.mat-multi-line .mat-list-item-content,.mat-selection-list[dense] .mat-list-item.mat-multi-line .mat-list-item-content,.mat-selection-list[dense] .mat-list-option.mat-multi-line .mat-list-item-content{padding-top:16px;padding-bottom:16px}.mat-list[dense] .mat-list-item .mat-list-text,.mat-list[dense] .mat-list-option .mat-list-text,.mat-nav-list[dense] .mat-list-item .mat-list-text,.mat-nav-list[dense] .mat-list-option .mat-list-text,.mat-selection-list[dense] .mat-list-item .mat-list-text,.mat-selection-list[dense] .mat-list-option .mat-list-text{display:flex;flex-direction:column;width:100%;box-sizing:border-box;overflow:hidden;padding:0 16px}.mat-list[dense] .mat-list-item .mat-list-text>*,.mat-list[dense] .mat-list-option .mat-list-text>*,.mat-nav-list[dense] .mat-list-item .mat-list-text>*,.mat-nav-list[dense] .mat-list-option .mat-list-text>*,.mat-selection-list[dense] .mat-list-item .mat-list-text>*,.mat-selection-list[dense] .mat-list-option .mat-list-text>*{margin:0;padding:0;font-weight:400;font-size:inherit}.mat-list[dense] .mat-list-item .mat-list-text:empty,.mat-list[dense] .mat-list-option .mat-list-text:empty,.mat-nav-list[dense] .mat-list-item .mat-list-text:empty,.mat-nav-list[dense] .mat-list-option .mat-list-text:empty,.mat-selection-list[dense] .mat-list-item .mat-list-text:empty,.mat-selection-list[dense] .mat-list-option .mat-list-text:empty{display:none}.mat-list[dense] .mat-list-item .mat-list-text:nth-child(2),.mat-list[dense] .mat-list-option .mat-list-text:nth-child(2),.mat-nav-list[dense] .mat-list-item .mat-list-text:nth-child(2),.mat-nav-list[dense] .mat-list-option .mat-list-text:nth-child(2),.mat-selection-list[dense] .mat-list-item .mat-list-text:nth-child(2),.mat-selection-list[dense] .mat-list-option .mat-list-text:nth-child(2){padding:0}.mat-list[dense] .mat-list-item .mat-list-avatar,.mat-list[dense] .mat-list-option .mat-list-avatar,.mat-nav-list[dense] .mat-list-item .mat-list-avatar,.mat-nav-list[dense] .mat-list-option .mat-list-avatar,.mat-selection-list[dense] .mat-list-item .mat-list-avatar,.mat-selection-list[dense] .mat-list-option .mat-list-avatar{flex-shrink:0;width:40px;height:40px;border-radius:50%}.mat-list[dense] .mat-list-item .mat-list-icon,.mat-list[dense] .mat-list-option .mat-list-icon,.mat-nav-list[dense] .mat-list-item .mat-list-icon,.mat-nav-list[dense] .mat-list-option .mat-list-icon,.mat-selection-list[dense] .mat-list-item .mat-list-icon,.mat-selection-list[dense] .mat-list-option .mat-list-icon{width:20px;height:20px;font-size:20px;box-sizing:content-box;border-radius:50%;padding:4px}.mat-divider{display:block;border-top-style:solid;border-top-width:1px;margin:0}.mat-nav-list a{text-decoration:none;color:inherit}.mat-nav-list .mat-list-item-content{cursor:pointer}.mat-nav-list .mat-list-item-content.mat-list-item-focus,.mat-nav-list .mat-list-item-content:hover{outline:0}.mat-list-option:not([disabled]){cursor:pointer}"],
                    encapsulation: _angular_core.ViewEncapsulation.None,
                    providers: [MAT_SELECTION_LIST_VALUE_ACCESSOR],
                    preserveWhitespaces: false,
                    changeDetection: _angular_core.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    MatSelectionList.ctorParameters = function () { return [
        { type: _angular_core.ElementRef, },
        { type: undefined, decorators: [{ type: _angular_core.Attribute, args: ['tabindex',] },] },
    ]; };
    MatSelectionList.propDecorators = {
        "options": [{ type: _angular_core.ContentChildren, args: [MatListOption,] },],
        "selectionChange": [{ type: _angular_core.Output },],
    };
    return MatSelectionList;
}(_MatSelectionListMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

var MatListModule = /** @class */ (function () {
    function MatListModule() {
    }
    MatListModule.decorators = [
        { type: _angular_core.NgModule, args: [{
                    imports: [_angular_material_core.MatLineModule, _angular_material_core.MatRippleModule, _angular_material_core.MatCommonModule, _angular_material_core.MatPseudoCheckboxModule, _angular_common.CommonModule],
                    exports: [
                        MatList,
                        MatNavList,
                        MatListItem,
                        MatListDivider,
                        MatListAvatarCssMatStyler,
                        _angular_material_core.MatLineModule,
                        _angular_material_core.MatCommonModule,
                        MatListIconCssMatStyler,
                        MatDividerCssMatStyler,
                        MatListSubheaderCssMatStyler,
                        _angular_material_core.MatPseudoCheckboxModule,
                        MatSelectionList,
                        MatListOption
                    ],
                    declarations: [
                        MatList,
                        MatNavList,
                        MatListItem,
                        MatListDivider,
                        MatListAvatarCssMatStyler,
                        MatListIconCssMatStyler,
                        MatDividerCssMatStyler,
                        MatListSubheaderCssMatStyler,
                        MatSelectionList,
                        MatListOption
                    ],
                },] },
    ];
    /** @nocollapse */
    MatListModule.ctorParameters = function () { return []; };
    return MatListModule;
}());

exports.MatListModule = MatListModule;
exports.MatListBase = MatListBase;
exports._MatListMixinBase = _MatListMixinBase;
exports.MatListItemBase = MatListItemBase;
exports._MatListItemMixinBase = _MatListItemMixinBase;
exports.MatListDivider = MatListDivider;
exports.MatNavList = MatNavList;
exports.MatList = MatList;
exports.MatDividerCssMatStyler = MatDividerCssMatStyler;
exports.MatListAvatarCssMatStyler = MatListAvatarCssMatStyler;
exports.MatListIconCssMatStyler = MatListIconCssMatStyler;
exports.MatListSubheaderCssMatStyler = MatListSubheaderCssMatStyler;
exports.MatListItem = MatListItem;
exports.MatSelectionListBase = MatSelectionListBase;
exports._MatSelectionListMixinBase = _MatSelectionListMixinBase;
exports.MatListOptionBase = MatListOptionBase;
exports._MatListOptionMixinBase = _MatListOptionMixinBase;
exports.MAT_SELECTION_LIST_VALUE_ACCESSOR = MAT_SELECTION_LIST_VALUE_ACCESSOR;
exports.MatListOptionChange = MatListOptionChange;
exports.MatSelectionListChange = MatSelectionListChange;
exports.MatListOption = MatListOption;
exports.MatSelectionList = MatSelectionList;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=material-list.umd.js.map
