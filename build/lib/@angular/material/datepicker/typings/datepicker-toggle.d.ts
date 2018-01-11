import { AfterContentInit, ChangeDetectorRef, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { MatDatepicker } from './datepicker';
import { MatDatepickerIntl } from './datepicker-intl';
export declare class MatDatepickerToggle<D> implements AfterContentInit, OnChanges, OnDestroy {
    _intl: MatDatepickerIntl;
    private _changeDetectorRef;
    private _stateChanges;
    /** Datepicker instance that the button will toggle. */
    datepicker: MatDatepicker<D>;
    /** Whether the toggle button is disabled. */
    disabled: boolean;
    private _disabled;
    constructor(_intl: MatDatepickerIntl, _changeDetectorRef: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngAfterContentInit(): void;
    _open(event: Event): void;
    private _watchStateChanges();
}
