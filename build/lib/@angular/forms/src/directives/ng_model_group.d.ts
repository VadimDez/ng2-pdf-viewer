/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OnDestroy, OnInit } from '@angular/core';
import { AbstractFormGroupDirective } from './abstract_form_group_directive';
import { ControlContainer } from './control_container';
export declare const modelGroupProvider: any;
/**
 * Creates and binds a model group to a DOM element.
 *
 * This directive can only be used as a child of {@link NgForm}.
 *
 * ```typescript
 * @Component({
 *   selector: 'my-app',
 *   template: `
 *     <div>
 *       <h2>Angular forms Example</h2>
 *       <form #f="ngForm">
 *         <div ngModelGroup="name" #mgName="ngModelGroup">
 *           <h3>Enter your name:</h3>
 *           <p>First: <input name="first" ngModel required></p>
 *           <p>Middle: <input name="middle" ngModel></p>
 *           <p>Last: <input name="last" ngModel required></p>
 *         </div>
 *         <h3>Name value:</h3>
 *         <pre>{{ mgName.value | json }}</pre>
 *         <p>Name is {{mgName?.valid ? "valid" : "invalid"}}</p>
 *         <h3>What's your favorite food?</h3>
 *         <p><input name="food" ngModel></p>
 *         <h3>Form value</h3>
 *         <pre>{{ f.value | json }}</pre>
 *       </form>
 *     </div>
 *   `
 * })
 * export class App {}
 * ```
 *
 * This example declares a model group for a user's name. The value and validation state of
 * this group can be accessed separately from the overall form.
 *
 * @stable
 */
export declare class NgModelGroup extends AbstractFormGroupDirective implements OnInit, OnDestroy {
    name: string;
    constructor(parent: ControlContainer, validators: any[], asyncValidators: any[]);
}
