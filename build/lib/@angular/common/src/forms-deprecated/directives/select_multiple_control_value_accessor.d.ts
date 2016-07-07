import { ElementRef, OnDestroy, Renderer } from '@angular/core';
import { ControlValueAccessor } from './control_value_accessor';
/**
 * The accessor for writing a value and listening to changes on a select element.
 */
export declare class SelectMultipleControlValueAccessor implements ControlValueAccessor {
    value: any;
    onChange: (_: any) => void;
    onTouched: () => void;
    constructor();
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
}
/**
 * Marks `<option>` as dynamic, so Angular can be notified when options change.
 *
 * ### Example
 *
 * ```
 * <select multiple ngControl="city">
 *   <option *ngFor="let c of cities" [value]="c"></option>
 * </select>
 * ```
 */
export declare class NgSelectMultipleOption implements OnDestroy {
    private _element;
    private _renderer;
    private _select;
    id: string;
    constructor(_element: ElementRef, _renderer: Renderer, _select: SelectMultipleControlValueAccessor);
    ngValue: any;
    value: any;
    ngOnDestroy(): void;
}
export declare const SELECT_DIRECTIVES: (typeof SelectMultipleControlValueAccessor | typeof NgSelectMultipleOption)[];
