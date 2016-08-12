/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Compiler } from '../index';
import { unimplemented } from '../src/facade/exceptions';
/**
 * Special interface to the compiler only used by testing
 *
 * @experimental
 */
export class TestingCompiler extends Compiler {
    get injector() { throw unimplemented(); }
    overrideModule(module, overrides) {
        throw unimplemented();
    }
    overrideDirective(directive, overrides) {
        throw unimplemented();
    }
    overrideComponent(component, overrides) {
        throw unimplemented();
    }
    overridePipe(directive, overrides) {
        throw unimplemented();
    }
}
/**
 * A factory for creating a Compiler
 *
 * @experimental
 */
export class TestingCompilerFactory {
}
//# sourceMappingURL=test_compiler.js.map