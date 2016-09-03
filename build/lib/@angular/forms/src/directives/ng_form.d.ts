import { EventEmitter } from '../facade/async';
import { AbstractControl, FormControl, FormGroup } from '../model';
import { ControlContainer } from './control_container';
import { Form } from './form_interface';
import { NgControl } from './ng_control';
import { NgModel } from './ng_model';
import { NgModelGroup } from './ng_model_group';
export declare const formDirectiveProvider: any;
/**
 * If `NgForm` is bound in a component, `<form>` elements in that component will be
 * upgraded to use the Angular form system.
 *
 * ### Typical Use
 *
 * Include `FORM_DIRECTIVES` in the `directives` section of a {@link Component} annotation
 * to use `NgForm` and its associated controls.
 *
 * ### Structure
 *
 * An Angular form is a collection of `FormControl`s in some hierarchy.
 * `FormControl`s can be at the top level or can be organized in `FormGroup`s
 * or `FormArray`s. This hierarchy is reflected in the form's `value`, a
 * JSON object that mirrors the form structure.
 *
 * ### Submission
 *
 * The `ngSubmit` event signals when the user triggers a form submission.
 *
 *  ```typescript
 * @Component({
 *   selector: 'my-app',
 *   template: `
 *     <div>
 *       <p>Submit the form to see the data object Angular builds</p>
 *       <h2>NgForm demo</h2>
 *       <form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
 *         <h3>Control group: credentials</h3>
 *         <div ngModelGroup="credentials">
 *           <p>Login: <input type="text" name="login" ngModel></p>
 *           <p>Password: <input type="password" name="password" ngModel></p>
 *         </div>
 *         <h3>Control group: person</h3>
 *         <div ngModelGroup="person">
 *           <p>First name: <input type="text" name="firstName" ngModel></p>
 *           <p>Last name: <input type="text" name="lastName" ngModel></p>
 *         </div>
 *         <button type="submit">Submit Form</button>
 *       <p>Form data submitted:</p>
 *       </form>
 *       <pre>{{data}}</pre>
 *     </div>
 * `,
 *   directives: []
 * })
 * export class App {
 *   constructor() {}
 *
 *   data: string;
 *
 *   onSubmit(data) {
 *     this.data = JSON.stringify(data, null, 2);
 *   }
 * }
 *  ```
 *
 *  @stable
 */
export declare class NgForm extends ControlContainer implements Form {
    private _submitted;
    form: FormGroup;
    ngSubmit: EventEmitter<{}>;
    constructor(validators: any[], asyncValidators: any[]);
    submitted: boolean;
    formDirective: Form;
    control: FormGroup;
    path: string[];
    controls: {
        [key: string]: AbstractControl;
    };
    addControl(dir: NgModel): void;
    getControl(dir: NgModel): FormControl;
    removeControl(dir: NgModel): void;
    addFormGroup(dir: NgModelGroup): void;
    removeFormGroup(dir: NgModelGroup): void;
    getFormGroup(dir: NgModelGroup): FormGroup;
    updateModel(dir: NgControl, value: any): void;
    setValue(value: {
        [key: string]: any;
    }): void;
    onSubmit(): boolean;
    onReset(): void;
    resetForm(value?: any): void;
}
