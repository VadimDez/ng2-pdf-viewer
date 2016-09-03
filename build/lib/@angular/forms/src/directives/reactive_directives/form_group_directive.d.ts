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
 * Binds an existing form group to a DOM element.  It requires importing the {@link
 * ReactiveFormsModule}.
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
 *       <pre>{{ loginForm.value | json}}</pre>
 *     </div>
 *   `
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
 * }
 *  ```
 *
 * We can also use setValue() to populate the form programmatically.
 *
 *  ```typescript
 * @Component({
 *      selector: "login-comp",
 *      template: `
 *        <form [formGroup]='loginForm'>
 *          Login <input type='text' formControlName='login'>
 *          Password <input type='password' formControlName='password'>
 *          <button (click)="onLogin()">Login</button>
 *        </form>`
 *      })
 * class LoginComp {
 *  loginForm: FormGroup;
 *
 *  constructor() {
 *    this.loginForm = new FormGroup({
 *      login: new FormControl(''),
 *      password: new FormControl('')
 *    });
 *  }
 *
 *  populate() {
 *    this.loginForm.setValue({ login: 'some login', password: 'some password'});
 *  }
 *
 *  onLogin(): void {
 *    // this.credentials.login === 'some login'
 *    // this.credentials.password === 'some password'
 *  }
 * }
 *  ```
 *
 *  @stable
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
    resetForm(value?: any): void;
    private _checkFormPresent();
}
