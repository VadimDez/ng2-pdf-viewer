/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertInterpolationSymbols } from '../assertions';
export class InterpolationConfig {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    static fromArray(markers) {
        if (!markers) {
            return DEFAULT_INTERPOLATION_CONFIG;
        }
        assertInterpolationSymbols('interpolation', markers);
        return new InterpolationConfig(markers[0], markers[1]);
    }
    ;
}
export const DEFAULT_INTERPOLATION_CONFIG = new InterpolationConfig('{{', '}}');
//# sourceMappingURL=interpolation_config.js.map