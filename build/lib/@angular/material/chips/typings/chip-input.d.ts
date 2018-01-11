import { ElementRef, EventEmitter } from '@angular/core';
import { MatChipList } from './chip-list';
/** Represents an input event on a `matChipInput`. */
export interface MatChipInputEvent {
    /** The native `<input>` element that the event is being fired for. */
    input: HTMLInputElement;
    /** The value of the input. */
    value: string;
}
/**
 * Directive that adds chip-specific behaviors to an input element inside <mat-form-field>.
 * May be placed inside or outside of an <mat-chip-list>.
 */
export declare class MatChipInput {
    protected _elementRef: ElementRef;
    focused: boolean;
    _chipList: MatChipList;
    /** Register input for chip list */
    chipList: MatChipList;
    /**
     * Whether or not the chipEnd event will be emitted when the input is blurred.
     */
    addOnBlur: boolean;
    _addOnBlur: boolean;
    /**
     * The list of key codes that will trigger a chipEnd event.
     *
     * Defaults to `[ENTER]`.
     */
    separatorKeyCodes: number[];
    /** Emitted when a chip is to be added. */
    chipEnd: EventEmitter<MatChipInputEvent>;
    /** The input's placeholder text. */
    placeholder: string;
    /** Whether the input is empty. */
    readonly empty: boolean;
    /** The native input element to which this directive is attached. */
    protected _inputElement: HTMLInputElement;
    constructor(_elementRef: ElementRef);
    /** Utility method to make host definition/tests more clear. */
    _keydown(event?: KeyboardEvent): void;
    /** Checks to see if the blur should emit the (chipEnd) event. */
    _blur(): void;
    _focus(): void;
    /** Checks to see if the (chipEnd) event needs to be emitted. */
    _emitChipEnd(event?: KeyboardEvent): void;
    _onInput(): void;
    focus(): void;
}
