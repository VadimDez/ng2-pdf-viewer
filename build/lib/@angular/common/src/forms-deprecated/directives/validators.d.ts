import { AbstractControl } from '../model';
import { Validators } from '../validators';
/**
 * An interface that can be implemented by classes that can act as validators.
 *
 * ## Usage
 *
 * ```typescript
 * @Directive({
 *   selector: '[custom-validator]',
 *   providers: [{provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true}]
 * })
 * class CustomValidatorDirective implements Validator {
 *   validate(c: Control): {[key: string]: any} {
 *     return {"custom": true};
 *   }
 * }
 * ```
 *
 * @experimental
 */
export interface Validator {
    validate(c: AbstractControl): {
        [key: string]: any;
    };
}
export declare const REQUIRED: typeof Validators.required;
export declare const REQUIRED_VALIDATOR: any;
/**
 * A Directive that adds the `required` validator to any controls marked with the
 * `required` attribute, via the {@link NG_VALIDATORS} binding.
 *
 * ### Example
 *
 * ```
 * <input ngControl="fullName" required>
 * ```
 *
 * @experimental
 */
export declare class RequiredValidator {
}
export interface ValidatorFn {
    (c: AbstractControl): {
        [key: string]: any;
    };
}
export interface AsyncValidatorFn {
    (c: AbstractControl): any;
}
/**
 * Provivder which adds {@link MinLengthValidator} to {@link NG_VALIDATORS}.
 *
 * ## Example:
 *
 * {@example common/forms/ts/validators/validators.ts region='min'}
 */
export declare const MIN_LENGTH_VALIDATOR: any;
/**
 * A directive which installs the {@link MinLengthValidator} for any `ngControl`,
 * `ngFormControl`, or control with `ngModel` that also has a `minlength` attribute.
 *
 * @experimental
 */
export declare class MinLengthValidator implements Validator {
    private _validator;
    constructor(minLength: string);
    validate(c: AbstractControl): {
        [key: string]: any;
    };
}
/**
 * Provider which adds {@link MaxLengthValidator} to {@link NG_VALIDATORS}.
 *
 * ## Example:
 *
 * {@example common/forms/ts/validators/validators.ts region='max'}
 */
export declare const MAX_LENGTH_VALIDATOR: any;
/**
 * A directive which installs the {@link MaxLengthValidator} for any `ngControl, `ngFormControl`,
 * or control with `ngModel` that also has a `maxlength` attribute.
 *
 * @experimental
 */
export declare class MaxLengthValidator implements Validator {
    private _validator;
    constructor(maxLength: string);
    validate(c: AbstractControl): {
        [key: string]: any;
    };
}
export declare const PATTERN_VALIDATOR: any;
/**
 * A Directive that adds the `pattern` validator to any controls marked with the
 * `pattern` attribute, via the {@link NG_VALIDATORS} binding. Uses attribute value
 * as the regex to validate Control value against.  Follows pattern attribute
 * semantics; i.e. regex must match entire Control value.
 *
 * ### Example
 *
 * ```
 * <input [ngControl]="fullName" pattern="[a-zA-Z ]*">
 * ```
 * @experimental
 */
export declare class PatternValidator implements Validator {
    private _validator;
    constructor(pattern: string);
    validate(c: AbstractControl): {
        [key: string]: any;
    };
}
