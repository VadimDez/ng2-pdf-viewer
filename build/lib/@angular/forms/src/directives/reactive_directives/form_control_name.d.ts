/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { EventEmitter } from '../../facade/async';
import { FormControl } from '../../model';
import { ControlContainer } from '../control_container';
import { ControlValueAccessor } from '../control_value_accessor';
import { NgControl } from '../ng_control';
import { AsyncValidatorFn, ValidatorFn } from '../validators';
export declare const controlNameBinding: any;
/**
 * Syncs an existing form control with the specified name to a DOM element.
 *
 * This directive can only be used as a child of {@link FormGroupDirective}.

 * ### Example
 *
 * In this example, we create the login and password controls.
 * We can work with each control separately: check its validity, get its value, listen to its
 * changes.
 *
 *  ```
 * @Component({
 *      selector: "login-comp",
 *      directives: [REACTIVE_FORM_DIRECTIVES],
 *      template: `
 *        <form [formGroup]="myForm" (submit)="onLogIn()">
 *          Login <input type="text" formControlName="login">
 *          <div *ngIf="!loginCtrl.valid">Login is invalid</div>
 *          Password <input type="password" formControlName="password">
 *          <button type="submit">Log in!</button>
 *        </form>
 *      `})
 * class LoginComp {
 *  loginCtrl = new Control();
 *  passwordCtrl = new Control();
 *  myForm = new FormGroup({
 *     login: loginCtrl,
 *     password: passwordCtrl
 *  });
 *  onLogIn(): void {
 *    // value === {login: 'some login', password: 'some password'}
 *  }
 * }
 *  ```
 *
 * TODO(kara): Remove ngModel example with reactive paradigm
 * We can also use ngModel to bind a domain model to the form, if you don't want to provide
 * individual init values to each control.
 *
 *  ```
 * @Component({
 *      selector: "login-comp",
 *      directives: [REACTIVE_FORM_DIRECTIVES],
 *      template: `
 *        <form [formGroup]="myForm" (submit)='onLogIn()'>
 *          Login <input type='text' formControlName='login' [(ngModel)]="credentials.login">
 *          Password <input type='password' formControlName='password'
 *                          [(ngModel)]="credentials.password">
 *          <button type='submit'>Log in!</button>
 *        </form>
 *      `})
 * class LoginComp {
 *  credentials: {login:string, password:string};
 *  myForm = new FormGroup({
 *    login: new Control(this.credentials.login),
 *    password: new Control(this.credentials.password)
 *  });
 *
 *  onLogIn(): void {
 *    // this.credentials.login === "some login"
 *    // this.credentials.password === "some password"
 *  }
 * }
 *  ```
 *
 *  @experimental
 */
export declare class FormControlName extends NgControl implements OnChanges, OnDestroy {
    private _parent;
    private _validators;
    private _asyncValidators;
    private _added;
    name: string;
    model: any;
    update: EventEmitter<{}>;
    constructor(_parent: ControlContainer, _validators: any[], _asyncValidators: any[], valueAccessors: ControlValueAccessor[]);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    viewToModelUpdate(newValue: any): void;
    path: string[];
    formDirective: any;
    validator: ValidatorFn;
    asyncValidator: AsyncValidatorFn;
    control: FormControl;
    private _checkParentType();
}
