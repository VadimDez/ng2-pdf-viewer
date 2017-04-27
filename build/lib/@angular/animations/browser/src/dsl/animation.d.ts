/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationMetadata, ɵStyleData } from '@angular/animations';
import { AnimationTimelineInstruction } from './animation_timeline_instruction';
export declare class Animation {
    private _animationAst;
    constructor(input: AnimationMetadata | AnimationMetadata[]);
    buildTimelines(startingStyles: ɵStyleData | ɵStyleData[], destinationStyles: ɵStyleData | ɵStyleData[]): AnimationTimelineInstruction[];
    private create(injector, element, startingStyles?, destinationStyles?);
}
