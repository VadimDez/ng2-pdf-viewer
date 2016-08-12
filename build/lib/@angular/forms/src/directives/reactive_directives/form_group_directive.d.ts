/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OnChanges, SimpleChanges } from '@angular/core';
import { EventEmitter } from '../../facade/async';
import { FormArray, FormControl, FormGroup } from '../../model';
import { ControlContainer } from '../control_container';
import { Form } from '../form_interface';
import { NgControl } from '../ng_control';
import { FormArrayName, FormGroupName } from './form_group_name';
export declare const formDirectiveProvider: any;
/**
 * Binds an existing form group to a DOM element.
 *
 * ### Example ([live demo](http://plnkr.co/edit/jqrVirudY8anJxTMUjTP?p=preview))
 *
 * In this example, we bind the form group to the form element, and we bind the login and
 * password controls to the login and password elements.
 *
 *  ```typescript
 * @Component({
 *   selector: 'my-app',
 *   template: `
 *     <div>
 *       <h2>Binding an existing form group</h2>
 *       <form [formGroup]="loginForm">
 *         <p>Login: <input type="text" formControlName="login"></p>
 *         <p>Password: <input type="password" formControlName="password"></p>
 *       </form>
 *       <p>Value:</p>
 *       <pre>{{value}}</pre>
 *     </div>
 *   `,
 *   directives: [REACTIVE_FORM_DIRECTIVES]
 * })
 * export class App {
 *   loginForm: FormGroup;
 *
 *   constructor() {
 *     this.loginForm = new FormGroup({
 *       login: new FormControl(""),
 *       password: new FormControl("")
 *     });
 *   }
 *
 *   get value(): string {
 *     return JSON.stringify(this.loginForm.value, null, 2);
 *   }
 * }
 *  ```
 *
 * We can also use ngModel to bind a domain model to the form.
 *
 *  ```typescript
 * @Component({
 *      selector: "login-comp",
 *      directives: [REACTIVE_FORM_DIRECTIVES],
 *      template: `
 *        <form [formGroup]='loginForm'>
 *          Login <input type='text' formControlName='login' [(ngModel)]='credentials.login'>
 *          Password <input type='password' formControlName='password'
 *                          [(ngModel)]='credentials.password'>
 *          <button (click)="onLogin()">Login</button>
 *        </form>`
 *      })
 * class LoginComp {
 *  credentials: {login: string, password: string};
 *  loginForm: FormGroup;
 *
 *  constructor() {
 *    this.loginForm = new FormGroup({
 *      login: new FormControl(""),
 *      password: new FormControl("")
 *    });
 *  }
 *
 *  onLogin(): void {
 *    // this.credentials.login === 'some login'
 *    // this.credentials.password === 'some password'
 *  }
 * }
 *  ```
 *
 *  @experimental
 */
export declare class FormGroupDirective extends ControlContainer implements Form, OnChanges {
    private _validators;
    private _asyncValidators;
    private _submitted;
    directives: NgControl[];
    form: FormGroup;
    ngSubmit: EventEmitter<{}>;
    constructor(_validators: any[], _asyncValidators: any[]);
    ngOnChanges(changes: SimpleChanges): void;
    submitted: boolean;
    formDirective: Form;
    control: FormGroup;
    path: string[];
    addControl(dir: NgControl): void;
    getControl(dir: NgControl): FormControl;
    removeControl(dir: NgControl): void;
    addFormGroup(dir: FormGroupName): void;
    removeFormGroup(dir: FormGroupName): void;
    getFormGroup(dir: FormGroupName): FormGroup;
    addFormArray(dir: FormArrayName): void;
    removeFormArray(dir: FormArrayName): void;
    getFormArray(dir: FormArrayName): FormArray;
    updateModel(dir: NgControl, value: any): void;
    onSubmit(): boolean;
    onReset(): void;
    private _checkFormPresent();
}
