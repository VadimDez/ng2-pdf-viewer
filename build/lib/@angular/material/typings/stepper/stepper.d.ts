import { CdkStep, CdkStepper } from '@angular/cdk/stepper';
import { Directionality } from '@angular/cdk/bidi';
import { AfterContentInit, ElementRef, QueryList, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatStepLabel } from './step-label';
export declare class MatStep extends CdkStep implements ErrorStateMatcher {
    private _errorStateMatcher;
    /** Content for step label given by <ng-template matStepLabel>. */
    stepLabel: MatStepLabel;
    constructor(stepper: MatStepper, _errorStateMatcher: ErrorStateMatcher);
    /** Custom error state matcher that additionally checks for validity of interacted form. */
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean;
}
export declare class MatStepper extends CdkStepper implements AfterContentInit {
    /** The list of step headers of the steps in the stepper. */
    _stepHeader: QueryList<ElementRef>;
    /** Steps that the stepper holds. */
    _steps: QueryList<MatStep>;
    ngAfterContentInit(): void;
}
export declare class MatHorizontalStepper extends MatStepper {
}
export declare class MatVerticalStepper extends MatStepper {
    constructor(dir: Directionality, changeDetectorRef: ChangeDetectorRef);
}
