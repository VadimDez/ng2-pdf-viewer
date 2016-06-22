import { Injectable } from '../index';
export class Log {
    constructor() {
        this.logItems = [];
    }
    add(value /** TODO #9100 */) { this.logItems.push(value); }
    fn(value /** TODO #9100 */) {
        return (a1 = null, a2 = null, a3 = null, a4 = null, a5 = null) => {
            this.logItems.push(value);
        };
    }
    clear() { this.logItems = []; }
    result() { return this.logItems.join('; '); }
}
/** @nocollapse */
Log.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Log.ctorParameters = [];
//# sourceMappingURL=logger.js.map