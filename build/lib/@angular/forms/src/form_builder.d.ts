import { AsyncValidatorFn, ValidatorFn } from './directives/validators';
import { FormArray, FormControl, FormGroup } from './model';
/**
 * Creates a form object from a user-specified configuration.
 *
 * ```typescript
 * @Component({
 *   selector: 'my-app',
 *   template: `
 *     <form [formGroup]="loginForm">
 *       <p>Login <input formControlName="login"></p>
 *       <div formGroupName="passwordRetry">
 *         <p>Password <input type="password" formControlName="password"></p>
 *         <p>Confirm password <input type="password" formControlName="passwordConfirmation"></p>
 *       </div>
 *     </form>
 *     <h3>Form value:</h3>
 *     <pre>{{value}}</pre>
 *   `,
 *   directives: [REACTIVE_FORM_DIRECTIVES]
 * })
 * export class App {
 *   loginForm: FormGroup;
 *
 *   constructor(builder: FormBuilder) {
 *     this.loginForm = builder.group({
 *       login: ["", Validators.required],
 *       passwordRetry: builder.group({
 *         password: ["", Validators.required],
 *         passwordConfirmation: ["", Validators.required, asyncValidator]
 *       })
 *     });
 *   }
 *
 *   get value(): string {
 *     return JSON.stringify(this.loginForm.value, null, 2);
 *   }
 * }
 * ```
 *
 * @experimental
 */
export declare class FormBuilder {
    /**
     * Construct a new {@link FormGroup} with the given map of configuration.
     * Valid keys for the `extra` parameter map are `optionals` and `validator`.
     *
     * See the {@link FormGroup} constructor for more details.
     */
    group(controlsConfig: {
        [key: string]: any;
    }, extra?: {
        [key: string]: any;
    }): FormGroup;
    /**
     * Construct a new {@link FormControl} with the given `value`,`validator`, and `asyncValidator`.
     */
    control(value: Object, validator?: ValidatorFn | ValidatorFn[], asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]): FormControl;
    /**
     * Construct an array of {@link FormControl}s from the given `controlsConfig` array of
     * configuration, with the given optional `validator` and `asyncValidator`.
     */
    array(controlsConfig: any[], validator?: ValidatorFn, asyncValidator?: AsyncValidatorFn): FormArray;
}
