/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Host, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ListWrapper } from '../facade/collection';
import { isBlank, isPresent, normalizeBlank } from '../facade/lang';
var _CASE_DEFAULT = new Object();
export var SwitchView = (function () {
    function SwitchView(_viewContainerRef, _templateRef) {
        this._viewContainerRef = _viewContainerRef;
        this._templateRef = _templateRef;
    }
    SwitchView.prototype.create = function () { this._viewContainerRef.createEmbeddedView(this._templateRef); };
    SwitchView.prototype.destroy = function () { this._viewContainerRef.clear(); };
    return SwitchView;
}());
/**
 * Adds or removes DOM sub-trees when their match expressions match the switch expression.
 *
 * Elements within `NgSwitch` but without `NgSwitchCase` or `NgSwitchDefault` directives will be
 * preserved at the location as specified in the template.
 *
 * `NgSwitch` simply inserts nested elements based on which match expression matches the value
 * obtained from the evaluated switch expression. In other words, you define a container element
 * (where you place the directive with a switch expression on the
 * `[ngSwitch]="..."` attribute), define any inner elements inside of the directive and
 * place a `[ngSwitchCase]` attribute per element.
 *
 * The `ngSwitchCase` property is used to inform `NgSwitch` which element to display when the
 * expression is evaluated. If a matching expression is not found via a `ngSwitchCase` property
 * then an element with the `ngSwitchDefault` attribute is displayed.
 *
 * ### Example ([live demo](http://plnkr.co/edit/DQMTII95CbuqWrl3lYAs?p=preview))
 *
 * ```typescript
 * @Component({
 *   selector: 'app',
 *   template: `
 *     <p>Value = {{value}}</p>
 *     <button (click)="inc()">Increment</button>
 *
 *     <div [ngSwitch]="value">
 *       <p *ngSwitchCase="'init'">increment to start</p>
 *       <p *ngSwitchCase="0">0, increment again</p>
 *       <p *ngSwitchCase="1">1, increment again</p>
 *       <p *ngSwitchCase="2">2, stop incrementing</p>
 *       <p *ngSwitchDefault>&gt; 2, STOP!</p>
 *     </div>
 *
 *     <!-- alternate syntax -->
 *
 *     <p [ngSwitch]="value">
 *       <template ngSwitchCase="init">increment to start</template>
 *       <template [ngSwitchCase]="0">0, increment again</template>
 *       <template [ngSwitchCase]="1">1, increment again</template>
 *       <template [ngSwitchCase]="2">2, stop incrementing</template>
 *       <template ngSwitchDefault>&gt; 2, STOP!</template>
 *     </p>
 *   `,
 *   directives: [NgSwitch, NgSwitchCase, NgSwitchDefault]
 * })
 * export class App {
 *   value = 'init';
 *
 *   inc() {
 *     this.value = this.value === 'init' ? 0 : this.value + 1;
 *   }
 * }
 * ```
 *
 * @stable
 */
export var NgSwitch = (function () {
    function NgSwitch() {
        this._useDefault = false;
        this._valueViews = new Map();
        this._activeViews = [];
    }
    Object.defineProperty(NgSwitch.prototype, "ngSwitch", {
        set: function (value) {
            // Empty the currently active ViewContainers
            this._emptyAllActiveViews();
            // Add the ViewContainers matching the value (with a fallback to default)
            this._useDefault = false;
            var views = this._valueViews.get(value);
            if (isBlank(views)) {
                this._useDefault = true;
                views = normalizeBlank(this._valueViews.get(_CASE_DEFAULT));
            }
            this._activateViews(views);
            this._switchValue = value;
        },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    NgSwitch.prototype._onCaseValueChanged = function (oldCase, newCase, view) {
        this._deregisterView(oldCase, view);
        this._registerView(newCase, view);
        if (oldCase === this._switchValue) {
            view.destroy();
            ListWrapper.remove(this._activeViews, view);
        }
        else if (newCase === this._switchValue) {
            if (this._useDefault) {
                this._useDefault = false;
                this._emptyAllActiveViews();
            }
            view.create();
            this._activeViews.push(view);
        }
        // Switch to default when there is no more active ViewContainers
        if (this._activeViews.length === 0 && !this._useDefault) {
            this._useDefault = true;
            this._activateViews(this._valueViews.get(_CASE_DEFAULT));
        }
    };
    /** @internal */
    NgSwitch.prototype._emptyAllActiveViews = function () {
        var activeContainers = this._activeViews;
        for (var i = 0; i < activeContainers.length; i++) {
            activeContainers[i].destroy();
        }
        this._activeViews = [];
    };
    /** @internal */
    NgSwitch.prototype._activateViews = function (views) {
        // TODO(vicb): assert(this._activeViews.length === 0);
        if (isPresent(views)) {
            for (var i = 0; i < views.length; i++) {
                views[i].create();
            }
            this._activeViews = views;
        }
    };
    /** @internal */
    NgSwitch.prototype._registerView = function (value, view) {
        var views = this._valueViews.get(value);
        if (isBlank(views)) {
            views = [];
            this._valueViews.set(value, views);
        }
        views.push(view);
    };
    /** @internal */
    NgSwitch.prototype._deregisterView = function (value, view) {
        // `_CASE_DEFAULT` is used a marker for non-registered cases
        if (value === _CASE_DEFAULT)
            return;
        var views = this._valueViews.get(value);
        if (views.length == 1) {
            this._valueViews.delete(value);
        }
        else {
            ListWrapper.remove(views, view);
        }
    };
    NgSwitch.decorators = [
        { type: Directive, args: [{ selector: '[ngSwitch]' },] },
    ];
    /** @nocollapse */
    NgSwitch.ctorParameters = [];
    NgSwitch.propDecorators = {
        'ngSwitch': [{ type: Input },],
    };
    return NgSwitch;
}());
/**
 * Insert the sub-tree when the `ngSwitchCase` expression evaluates to the same value as the
 * enclosing switch expression.
 *
 * If multiple match expression match the switch expression value, all of them are displayed.
 *
 * See {@link NgSwitch} for more details and example.
 *
 * @stable
 */
export var NgSwitchCase = (function () {
    function NgSwitchCase(viewContainer, templateRef, ngSwitch) {
        // `_CASE_DEFAULT` is used as a marker for a not yet initialized value
        /** @internal */
        this._value = _CASE_DEFAULT;
        this._switch = ngSwitch;
        this._view = new SwitchView(viewContainer, templateRef);
    }
    Object.defineProperty(NgSwitchCase.prototype, "ngSwitchCase", {
        set: function (value) {
            this._switch._onCaseValueChanged(this._value, value, this._view);
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    NgSwitchCase.decorators = [
        { type: Directive, args: [{ selector: '[ngSwitchCase]' },] },
    ];
    /** @nocollapse */
    NgSwitchCase.ctorParameters = [
        { type: ViewContainerRef, },
        { type: TemplateRef, },
        { type: NgSwitch, decorators: [{ type: Host },] },
    ];
    NgSwitchCase.propDecorators = {
        'ngSwitchCase': [{ type: Input },],
    };
    return NgSwitchCase;
}());
/**
 * Default case statements are displayed when no match expression matches the switch expression
 * value.
 *
 * See {@link NgSwitch} for more details and example.
 *
 * @stable
 */
export var NgSwitchDefault = (function () {
    function NgSwitchDefault(viewContainer, templateRef, sswitch) {
        sswitch._registerView(_CASE_DEFAULT, new SwitchView(viewContainer, templateRef));
    }
    NgSwitchDefault.decorators = [
        { type: Directive, args: [{ selector: '[ngSwitchDefault]' },] },
    ];
    /** @nocollapse */
    NgSwitchDefault.ctorParameters = [
        { type: ViewContainerRef, },
        { type: TemplateRef, },
        { type: NgSwitch, decorators: [{ type: Host },] },
    ];
    return NgSwitchDefault;
}());
//# sourceMappingURL=ng_switch.js.map