/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Type } from '@angular/core';
export { CheckboxControlValueAccessor } from './directives/checkbox_value_accessor';
export { ControlValueAccessor } from './directives/control_value_accessor';
export { DefaultValueAccessor } from './directives/default_value_accessor';
export { NgControl } from './directives/ng_control';
export { NgControlGroup } from './directives/ng_control_group';
export { NgControlName } from './directives/ng_control_name';
export { NgControlStatus } from './directives/ng_control_status';
export { NgForm } from './directives/ng_form';
export { NgFormControl } from './directives/ng_form_control';
export { NgFormModel } from './directives/ng_form_model';
export { NgModel } from './directives/ng_model';
export { NumberValueAccessor } from './directives/number_value_accessor';
export { RadioButtonState, RadioControlValueAccessor } from './directives/radio_control_value_accessor';
export { NgSelectOption, SelectControlValueAccessor } from './directives/select_control_value_accessor';
export { NgSelectMultipleOption, SelectMultipleControlValueAccessor } from './directives/select_multiple_control_value_accessor';
export { MaxLengthValidator, MinLengthValidator, PatternValidator, RequiredValidator } from './directives/validators';
/**
 *
 * A list of all the form directives used as part of a `@Component` annotation.
 *
 *  This is a shorthand for importing them each individually.
 *
 * ### Example
 *
 * ```typescript
 * @Component({
 *   selector: 'my-app',
 *   directives: [FORM_DIRECTIVES]
 * })
 * class MyApp {}
 * ```
 * @experimental
 */
export declare const FORM_DIRECTIVES: Type[];
