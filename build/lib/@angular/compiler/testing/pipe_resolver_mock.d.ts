/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injector, PipeMetadata, Type } from '@angular/core';
import { PipeResolver } from '../index';
export declare class MockPipeResolver extends PipeResolver {
    private _injector;
    private _pipes;
    constructor(_injector: Injector);
    private _compiler;
    private _clearCacheFor(pipe);
    /**
     * Overrides the {@link PipeMetadata} for a pipe.
     */
    setPipe(type: Type, metadata: PipeMetadata): void;
    /**
     * Returns the {@link PipeMetadata} for a pipe:
     * - Set the {@link PipeMetadata} to the overridden view when it exists or fallback to the
     * default
     * `PipeResolver`, see `setPipe`.
     */
    resolve(type: Type, throwIfNotFound?: boolean): PipeMetadata;
}
