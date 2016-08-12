/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ListWrapper, StringMapWrapper } from '../facade/collection';
import { BaseException } from '../facade/exceptions';
import { hasConstructor, isBlank, isPresent, looseIdentical } from '../facade/lang';
import { Validators } from '../validators';
import { CheckboxControlValueAccessor } from './checkbox_value_accessor';
import { DefaultValueAccessor } from './default_value_accessor';
import { normalizeAsyncValidator, normalizeValidator } from './normalize_validator';
import { NumberValueAccessor } from './number_value_accessor';
import { RadioControlValueAccessor } from './radio_control_value_accessor';
import { SelectControlValueAccessor } from './select_control_value_accessor';
import { SelectMultipleControlValueAccessor } from './select_multiple_control_value_accessor';
export function controlPath(name, parent) {
    var p = ListWrapper.clone(parent.path);
    p.push(name);
    return p;
}
export function setUpControl(control, dir) {
    if (isBlank(control))
        _throwError(dir, 'Cannot find control with');
    if (isBlank(dir.valueAccessor))
        _throwError(dir, 'No value accessor for form control with');
    control.validator = Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
    dir.valueAccessor.writeValue(control.value);
    // view -> model
    dir.valueAccessor.registerOnChange((newValue) => {
        dir.viewToModelUpdate(newValue);
        control.markAsDirty();
        control.setValue(newValue, { emitModelToViewChange: false });
    });
    control.registerOnChange((newValue, emitModelEvent) => {
        // control -> view
        dir.valueAccessor.writeValue(newValue);
        // control -> ngModel
        if (emitModelEvent)
            dir.viewToModelUpdate(newValue);
    });
    // touched
    dir.valueAccessor.registerOnTouched(() => control.markAsTouched());
}
export function setUpFormContainer(control, dir) {
    if (isBlank(control))
        _throwError(dir, 'Cannot find control with');
    control.validator = Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
}
function _throwError(dir, message) {
    let messageEnd;
    if (dir.path.length > 1) {
        messageEnd = `path: '${dir.path.join(' -> ')}'`;
    }
    else if (dir.path[0]) {
        messageEnd = `name: '${dir.path}'`;
    }
    else {
        messageEnd = 'unspecified name attribute';
    }
    throw new BaseException(`${message} ${messageEnd}`);
}
export function composeValidators(validators) {
    return isPresent(validators) ? Validators.compose(validators.map(normalizeValidator)) : null;
}
export function composeAsyncValidators(validators) {
    return isPresent(validators) ? Validators.composeAsync(validators.map(normalizeAsyncValidator)) :
        null;
}
export function isPropertyUpdated(changes, viewModel) {
    if (!StringMapWrapper.contains(changes, 'model'))
        return false;
    var change = changes['model'];
    if (change.isFirstChange())
        return true;
    return !looseIdentical(viewModel, change.currentValue);
}
// TODO: vsavkin remove it once https://github.com/angular/angular/issues/3011 is implemented
export function selectValueAccessor(dir, valueAccessors) {
    if (isBlank(valueAccessors))
        return null;
    var defaultAccessor;
    var builtinAccessor;
    var customAccessor;
    valueAccessors.forEach((v) => {
        if (hasConstructor(v, DefaultValueAccessor)) {
            defaultAccessor = v;
        }
        else if (hasConstructor(v, CheckboxControlValueAccessor) || hasConstructor(v, NumberValueAccessor) ||
            hasConstructor(v, SelectControlValueAccessor) ||
            hasConstructor(v, SelectMultipleControlValueAccessor) ||
            hasConstructor(v, RadioControlValueAccessor)) {
            if (isPresent(builtinAccessor))
                _throwError(dir, 'More than one built-in value accessor matches form control with');
            builtinAccessor = v;
        }
        else {
            if (isPresent(customAccessor))
                _throwError(dir, 'More than one custom value accessor matches form control with');
            customAccessor = v;
        }
    });
    if (isPresent(customAccessor))
        return customAccessor;
    if (isPresent(builtinAccessor))
        return builtinAccessor;
    if (isPresent(defaultAccessor))
        return defaultAccessor;
    _throwError(dir, 'No valid value accessor for form control with');
    return null;
}
//# sourceMappingURL=shared.js.map