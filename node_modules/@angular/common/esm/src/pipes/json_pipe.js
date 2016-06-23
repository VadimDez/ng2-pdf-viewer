import { Pipe } from '@angular/core';
import { Json } from '../facade/lang';
export class JsonPipe {
    transform(value) { return Json.stringify(value); }
}
/** @nocollapse */
JsonPipe.decorators = [
    { type: Pipe, args: [{ name: 'json', pure: false },] },
];
//# sourceMappingURL=json_pipe.js.map