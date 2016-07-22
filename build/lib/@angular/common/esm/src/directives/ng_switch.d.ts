/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { TemplateRef, ViewContainerRef } from '@angular/core';
export declare class SwitchView {
    private _viewContainerRef;
    private _templateRef;
    constructor(_viewContainerRef: ViewContainerRef, _templateRef: TemplateRef<Object>);
    create(): void;
    destroy(): void;
}
/**
 * Adds or removes DOM sub-trees when their match expressions match the switch expression.
 *
 * Elements within `NgSwitch` but without `ngSwitchCase` or `NgSwitchDefault` directives will be
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
 *   directives: [NgSwitch, ngSwitchCase, NgSwitchDefault]
 * })
 * export class App {
 *   value = 'init';
 *
 *   inc() {
 *     this.value = this.value === 'init' ? 0 : this.value + 1;
 *   }
 * }
 *
 * bootstrap(App).catch(err => console.error(err));
 * ```
 *
 * @experimental
 */
export declare class NgSwitch {
    private _switchValue;
    private _useDefault;
    private _valueViews;
    private _activeViews;
    ngSwitch: any;
}
/**
 * Insert the sub-tree when the `ngSwitchCase` expression evaluates to the same value as the
 * enclosing switch expression.
 *
 * If multiple match expression match the switch expression value, all of them are displayed.
 *
 * See {@link NgSwitch} for more details and example.
 *
 * @experimental
 */
export declare class NgSwitchCase {
    private _switch;
    constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<Object>, ngSwitch: NgSwitch);
    ngSwitchCase: any;
    ngSwitchWhen: any;
}
/**
 * Default case statements are displayed when no match expression matches the switch expression
 * value.
 *
 * See {@link NgSwitch} for more details and example.
 *
 * @experimental
 */
export declare class NgSwitchDefault {
    constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<Object>, sswitch: NgSwitch);
}
