/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ChangeDetectorRef, Directive, Input, IterableDiffers, TemplateRef, ViewContainerRef } from '@angular/core';
import { BaseException } from '../facade/exceptions';
import { getTypeNameForDebugging, isBlank, isPresent } from '../facade/lang';
export class NgForRow {
    constructor($implicit, index, count) {
        this.$implicit = $implicit;
        this.index = index;
        this.count = count;
    }
    get first() { return this.index === 0; }
    get last() { return this.index === this.count - 1; }
    get even() { return this.index % 2 === 0; }
    get odd() { return !this.even; }
}
export class NgFor {
    constructor(_viewContainer, _templateRef, _iterableDiffers, _cdr) {
        this._viewContainer = _viewContainer;
        this._templateRef = _templateRef;
        this._iterableDiffers = _iterableDiffers;
        this._cdr = _cdr;
    }
    set ngForTemplate(value) {
        if (isPresent(value)) {
            this._templateRef = value;
        }
    }
    ngOnChanges(changes) {
        if ('ngForOf' in changes) {
            // React on ngForOf changes only once all inputs have been initialized
            const value = changes['ngForOf'].currentValue;
            if (isBlank(this._differ) && isPresent(value)) {
                try {
                    this._differ = this._iterableDiffers.find(value).create(this._cdr, this.ngForTrackBy);
                }
                catch (e) {
                    throw new BaseException(`Cannot find a differ supporting object '${value}' of type '${getTypeNameForDebugging(value)}'. NgFor only supports binding to Iterables such as Arrays.`);
                }
            }
        }
    }
    ngDoCheck() {
        if (isPresent(this._differ)) {
            const changes = this._differ.diff(this.ngForOf);
            if (isPresent(changes))
                this._applyChanges(changes);
        }
    }
    _applyChanges(changes) {
        const insertTuples = [];
        changes.forEachOperation((item, adjustedPreviousIndex, currentIndex) => {
            if (item.previousIndex == null) {
                let view = this._viewContainer.createEmbeddedView(this._templateRef, new NgForRow(null, null, null), currentIndex);
                let tuple = new RecordViewTuple(item, view);
                insertTuples.push(tuple);
            }
            else if (currentIndex == null) {
                this._viewContainer.remove(adjustedPreviousIndex);
            }
            else {
                let view = this._viewContainer.get(adjustedPreviousIndex);
                this._viewContainer.move(view, currentIndex);
                let tuple = new RecordViewTuple(item, view);
                insertTuples.push(tuple);
            }
        });
        for (let i = 0; i < insertTuples.length; i++) {
            this._perViewChange(insertTuples[i].view, insertTuples[i].record);
        }
        for (let i = 0, ilen = this._viewContainer.length; i < ilen; i++) {
            var viewRef = this._viewContainer.get(i);
            viewRef.context.index = i;
            viewRef.context.count = ilen;
        }
        changes.forEachIdentityChange((record) => {
            var viewRef = this._viewContainer.get(record.currentIndex);
            viewRef.context.$implicit = record.item;
        });
    }
    _perViewChange(view, record) {
        view.context.$implicit = record.item;
    }
}
/** @nocollapse */
NgFor.decorators = [
    { type: Directive, args: [{ selector: '[ngFor][ngForOf]' },] },
];
/** @nocollapse */
NgFor.ctorParameters = [
    { type: ViewContainerRef, },
    { type: TemplateRef, },
    { type: IterableDiffers, },
    { type: ChangeDetectorRef, },
];
/** @nocollapse */
NgFor.propDecorators = {
    'ngForOf': [{ type: Input },],
    'ngForTrackBy': [{ type: Input },],
    'ngForTemplate': [{ type: Input },],
};
class RecordViewTuple {
    constructor(record, view) {
        this.record = record;
        this.view = view;
    }
}
//# sourceMappingURL=ng_for.js.map